---
id: proxmox-host-baseline
title: Proxmox Host Baseline
sidebar_label: Host Baseline
sidebar_position: 1
description: The starting point of the homelab on Proxmox VE — the hardware, what the installer defaults give you, the package repositories to fix on a no-subscription host, and the storage map every later step builds on.
---

# Proxmox Host Baseline

The homelab runs on **Proxmox VE**: the host is a hypervisor, and every service lives in its own
container (LXC) or VM, with its own snapshot, backup and resource limits. This series documents
the host itself, layer by layer, in the order it was built. (Why Proxmox, after rejecting it the
year before, is told on the [blog](/blog/why-i-rejected-proxmox-in-2025).)

Rule for the whole series: **one layer at a time**. Configure, verify, and document a layer before
starting the next one.

## Hardware

| Item | Value |
|------|-------|
| Machine | Lenovo ThinkCentre M900 Tiny — Intel i5-6500T (4 cores / 4 threads), 8GB DDR4 |
| Fast disk | NVMe 240GB — the hypervisor and the guests' root disks |
| Bulk disk | HDD 1TB (2.5") — backups and large data |
| Proxmox VE | 9.x on Debian 13 (trixie) |

## What the installer gives you

With the installer defaults on the NVMe:

- `pve-root`: an ext4 logical volume mounted at `/`, registered as the storage **`local`**
  (`/var/lib/vz`), meant for ISOs, container templates and backups;
- `pve-swap`: a swap logical volume, sized close to the RAM;
- `pve-data`: an **LVM-thin pool**, registered as **`local-lvm`**, where guest disks live. Thin
  provisioning allocates space on write, and it supports snapshots of containers and VMs.

Any other disk is ignored until you configure it.

## Package repositories (no subscription)

Out of the box, Proxmox points at the **enterprise** repositories, which return errors without a
paid subscription. For a homelab:

- **disable** `pve-enterprise` and the Ceph enterprise repository (on Proxmox 9 they are deb822
  files in `/etc/apt/sources.list.d/*.sources`; renaming them to `*.bak` is enough, because apt
  only reads `.sources` and `.list`);
- **enable** `pve-no-subscription`.

Check what apt actually reads:

```bash
ls /etc/apt/sources.list.d/
cat /etc/apt/sources.list.d/*.sources /etc/apt/sources.list.d/*.list 2>/dev/null
```

Then update, and reboot when a new kernel package (`proxmox-kernel-*`) was installed:

```bash
apt update && apt full-upgrade
pveversion        # confirms the running version and kernel
```

## Survey before you change anything

Before configuring the rest, these read-only commands answer "what do I actually have?" and decide
the next steps (for example, whether a disk still holds data from a previous life):

```bash
pveversion
lsblk -o NAME,SIZE,TYPE,FSTYPE,LABEL,MOUNTPOINT,MODEL
pvesm status                 # storages Proxmox knows about
cat /etc/pve/storage.cfg
free -h && df -h
ip -br a
```

## The storage map this series builds

| Storage | Backing | Holds |
|---------|---------|-------|
| `local` | NVMe, directory | ISOs, container templates (no backups) |
| `local-lvm` | NVMe, LVM-thin | guest root disks |
| `hdd-backup` | HDD, Btrfs subvolume | nightly backups |
| `hdd-data` | HDD, Btrfs subvolume | large guest disks |
| *(bind mount)* | HDD, Btrfs subvolume | media, mounted straight into a container |

The split is deliberate: guests boot and run from the fast disk, while anything large or cold goes
to the HDD. The next entries build the HDD side ([Btrfs storage](./btrfs-storage.md)), memory pressure
handling ([ZRAM](./zram-swap.md)), [backups with a tested restore](./backups-and-restore-test.md) and
[key-only SSH](./ssh-key-only.md).

Remote access to the host goes through **Tailscale**, so nothing about the hypervisor is exposed to
the internet.
