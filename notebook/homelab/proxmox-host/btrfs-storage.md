---
id: btrfs-storage
title: Btrfs Storage for Backups, Guest Disks and Media
sidebar_label: Btrfs Storage
sidebar_position: 2
description: One Btrfs filesystem on the bulk HDD, split into subvolumes for backups, guest disks and media — mounted so a dead disk can't hang the boot, registered so Proxmox never writes to the wrong place, and migrated in place with reflinks.
---

# Btrfs Storage for Backups, Guest Disks and Media

The 1TB HDD has three jobs: **backup target**, home for **large guest disks**, and **media
library** (for Jellyfin). The goal is to serve all three from one disk without a fixed split, so
space goes wherever it is needed.

## Partitions vs. one filesystem

Two partitions (backups | data) isolate the roles, but the split is fixed: if the media grows,
taking space from the backup partition means redoing the disk. One filesystem with a directory per
role shares the space instead. That is the layout used here:

```text
/mnt/hdd                (Btrfs top level, subvolid=5)
├── backup/   subvolume → Proxmox storage "hdd-backup"
├── data/     subvolume, nodatacow → Proxmox storage "hdd-data"
└── media/    subvolume → bind mount into the media container
```

## Why Btrfs (and what it does not give you)

The disk already carried Btrfs from the previous server, with 190GB of media worth keeping, so it
was reused instead of reformatted to ext4. What Btrfs actually brings:

- **checksums on everything**: `btrfs scrub` detects silent corruption (bit rot);
- **duplicated metadata** (`DUP` profile) that can be repaired even on a single disk;
- **subvolumes**: independent trees with their own snapshots;
- **`send`/`receive`** for a future offsite copy.

What it does **not** give you: **a snapshot is not a backup**. It lives on the same disk, so it
protects against deleting or overwriting something by mistake, not against the disk dying.

Caveat on Proxmox: its native Btrfs storage type is still a technology preview, so here Btrfs is
used only as a plain **directory** storage.

## 1. Check the disk before trusting it

A backup target on a failing disk is worse than none. Read-only checks first:

```bash
smartctl -H -A /dev/sdX | grep -Ei "overall|Reallocated|Pending|Offline_Uncorrectable|Power_On_Hours|CRC"
mkdir -p /mnt/inspect
mount -o ro,subvolid=5 /dev/sdX /mnt/inspect     # ro: nothing is written
btrfs subvolume list /mnt/inspect
btrfs device stats /mnt/inspect                  # all counters should be 0
btrfs filesystem df /mnt/inspect                 # Metadata should be DUP
umount /mnt/inspect
```

`subvolid=5` mounts the **top level** of the filesystem, so every subvolume is visible.

## 2. Mount it so a dead disk can't hang the boot

Use the filesystem UUID (device names like `sda` can change between boots) and two safety options:

```bash
blkid -s UUID -o value /dev/sdX
cp /etc/fstab /etc/fstab.bak
echo "UUID=<uuid> /mnt/hdd btrfs defaults,noatime,subvolid=5,nofail,x-systemd.device-timeout=10s 0 0" >> /etc/fstab
systemctl daemon-reload
mkdir -p /mnt/hdd && mount /mnt/hdd && findmnt /mnt/hdd
```

- `nofail`: if the HDD is missing or dead, the host still boots.
- `x-systemd.device-timeout=10s`: and it doesn't wait the default 90 seconds for it.
- `noatime`: no metadata write on every read.

## 3. Subvolumes

```bash
cd /mnt/hdd
btrfs subvolume create backup
btrfs subvolume create data
btrfs subvolume create media
chattr +C data       # nodatacow: set it while the subvolume is still empty
lsattr -d data       # shows the C flag
```

**Why `nodatacow` on `data`:** Btrfs is copy-on-write. A disk image receives constant small
writes in the middle of a large file, and copy-on-write fragments it badly, especially on a
spinning disk. `chattr +C` on a directory makes the files created inside it skip CoW. It only
applies to files created *after* the flag is set, which is why it goes on the empty subvolume.

## 4. Move existing data without copying it (reflinks)

The old media sat in a plain directory. Moving it into the new subvolume with a normal copy would
read and write 190GB. A **reflink** copy creates new files that point at the *same* data blocks:
it finishes in seconds and uses no extra space. It works across subvolumes of the same filesystem.

```bash
mv data legacy-data                          # free the name for the new subvolume first
cp -a --reflink=always legacy-data/media/. media/
```

`--reflink=always` fails loudly instead of silently falling back to a full copy. `-a` keeps
owners, permissions and ACLs.

Verify before deleting anything:

```bash
find legacy-data/media -type f | wc -l       # file counts must match
find media -type f | wc -l
btrfs filesystem df /mnt/hdd | grep Data     # "used" must NOT have doubled
```

If `Data used` stayed the same, no block was duplicated. Only then:

```bash
rm -rf legacy-data
```

## 5. Register the storages in Proxmox

```bash
pvesm add dir hdd-backup --path /mnt/hdd/backup --content backup --is_mountpoint /mnt/hdd
pvesm add dir hdd-data --path /mnt/hdd/data --content rootdir,images --is_mountpoint /mnt/hdd
pvesm set local --content iso,vztmpl,import   # backups never land on the system disk
pvesm status
```

**`is_mountpoint` is the important part.** Without it, if the HDD isn't mounted, `/mnt/hdd/backup`
is just an empty directory on the root filesystem, and Proxmox would happily write backups there
until the system disk fills up. With it, the storage shows as *inactive* instead.

## Media: a bind mount, not a virtual disk

`media/` is not a Proxmox storage. It will be **bind-mounted** straight into the media container,
which has two consequences:

- the files stay ordinary files on the host, readable without starting any guest;
- `vzdump` **does not include bind mounts**, so a container backup doesn't drag hundreds of
  gigabytes of media along.

The trade-off is explicit: **media is not backed up**. That is acceptable because it can be
downloaded again. Two more things to keep in mind:

- in an unprivileged container, host files appear with shifted owners (UID/GID mapping), so the
  permissions need a dedicated step when the media container is created;
- backups and bulk data share one physical disk, so an offsite copy of the (small) guest backups is
  the missing piece of a 3-2-1 setup.
