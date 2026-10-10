---
id: backups-and-restore-test
title: Backups and a Tested Restore
sidebar_label: Backups & Restore Test
sidebar_position: 4
description: A nightly vzdump job with retention, and the canary test that proves it works — back up a throwaway container, destroy it, restore it, and check the data came back.
---

# Backups and a Tested Restore

A backup only counts once a **restore** has been tested. Until then it is a file you hope works.
This entry sets up the nightly job and then proves it with a throwaway container, before any real
service exists. The previous homelab lost a service's data for lack of exactly this step, so it now
comes first.

## The nightly job

Configured in the web UI (*Datacenter → Backup → Add*):

| Field | Value | Why |
|-------|-------|-----|
| Storage | `hdd-backup` | the HDD, not the system disk ([Btrfs storage](./btrfs-storage.md)) |
| Schedule | daily 03:00 | idle hours |
| Selection | all guests | new containers are covered automatically |
| Mode | snapshot | consistent copy without stopping the guest |
| Compression | zstd | fast, good ratio |
| Retention | keep-daily 7, keep-weekly 4, keep-monthly 1 | about a month of history, bounded size |

In **snapshot** mode, Proxmox briefly freezes the container's filesystem, takes an LVM-thin
snapshot, thaws it, and archives from the snapshot, so the service keeps running during the backup.

## The restore test

The idea: write a **canary** (a line with a timestamp) inside a container, back it up, destroy the
container completely, restore it from the archive, and read the canary back.

Get a template. `pveam available` also lists `arm64` builds, so filter on the host's architecture:

```bash
pveam update
T=$(pveam available --section system | awk '/debian-13-standard_.*_amd64/ {print $2}' | sort -V | tail -1)
echo "$T"                   # must end in _amd64.tar.zst
pveam download local "$T"
```

Create the throwaway container and write the canary:

```bash
pct create 900 "local:vztmpl/$T" --hostname restore-test --memory 256 \
  --rootfs local-lvm:2 --unprivileged 1 --features nesting=1
pct start 900
pct exec 900 -- sh -c 'echo "canary $(date -Is)" > /root/canary.txt && cat /root/canary.txt'
```

Back up, destroy, restore, check:

```bash
vzdump 900 --storage hdd-backup --mode snapshot --compress zstd
pct stop 900
pct destroy 900
pct restore 900 /mnt/hdd/backup/dump/vzdump-lxc-900-*.tar.zst --storage local-lvm
pct start 900
pct exec 900 -- cat /root/canary.txt     # must print the exact same line
```

Same line, same timestamp: the whole chain (snapshot, archive on the HDD, restore to the thin pool)
works. Clean up:

```bash
pct stop 900
pct destroy 900
rm /mnt/hdd/backup/dump/vzdump-lxc-900-*
```

The container runs in **snapshot** mode during the test on purpose: it is the same mode the nightly
job uses with real services.

## Gotchas

- **Wrong architecture.** A template picked from `pveam available` without filtering can be
  `arm64`. The container is created, but fails to start with `Failed to spawn container`, and the
  creation log says `Detected container architecture: arm64`.
- **Nesting.** Debian 13 ships systemd 257, which needs `--features nesting=1` in an unprivileged
  container (`WARN: Systemd 257 detected. You may need to enable nesting.`). The web UI enables it by
  default; `pct create` doesn't.
- **`&&` after `pct stop`.** Stopping a container that isn't running is an error, so
  `pct stop 900 && pct destroy 900` silently skips the destroy, and the restore then fails with
  `CT 900 already exists`. Run them as separate commands.
- **Timezone.** Templates default to UTC (the canary above prints `+00:00`). Service containers
  should be created with `--timezone host`.

## Known gaps

- **Notifications.** By default, job results go to `mail-to-root`, which delivers nowhere on a
  fresh install, so a failed nightly backup would go unnoticed. The fix is a notification target
  that reaches a channel you actually read (Proxmox supports webhooks).
- **3-2-1.** The backups sit on the same physical disk as the bulk data, and media is deliberately
  not backed up. The guest backups are small, so an offsite copy of them is the next step.
