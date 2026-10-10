---
id: zram-swap
title: ZRAM in Front of the Disk Swap
sidebar_label: ZRAM Swap
sidebar_position: 3
description: Why a hypervisor with 8GB of RAM gets compressed swap in memory instead of a bigger swap partition — and the systemd unit that formats ZRAM but doesn't turn it on.
---

# ZRAM in Front of the Disk Swap

The goal: when memory runs short, the host should **slow down, not freeze**. The classic answer
("swap = 2× RAM") doesn't deliver that on a hypervisor. ZRAM does most of the work.

## Why not just a bigger swap partition

- The 2× rule comes from the era of **hibernation**, which needs room for the whole RAM. A
  hypervisor never hibernates.
- If a host with 8GB of RAM actively needs more than 8GB of disk swap, it is already
  **thrashing**: moving pages in and out of disk constantly. From the outside, that looks exactly
  like a freeze. The web UI and SSH stop responding.
- On a default Proxmox install, growing the swap volume takes space from the thin pool where the
  guests live.

What actually keeps the host alive:

1. **Per-guest memory limits.** Proxmox enforces them, so a runaway container is stopped by the
   OOM killer inside its own limit instead of taking the host down.
2. **ZRAM**: a swap device that lives in RAM, compressed. With `zstd` it typically fits 2–3× the
   data, and it is far faster than any disk.

## The layout

| Device | Size | Priority | Role |
|--------|------|----------|------|
| `/dev/zram0` | half the RAM (~3.8G), `zstd` | 100 | used first |
| LVM swap (installer default) | ~7.6G | -1 | last resort |

The kernel always fills the higher-priority swap first, so the disk is only touched after ZRAM is
full.

## Setup with zram-generator

```bash
apt install systemd-zram-generator
cat > /etc/systemd/zram-generator.conf <<'EOF'
[zram0]
zram-size = ram / 2
compression-algorithm = zstd
swap-priority = 100
EOF
systemctl daemon-reload
systemctl start systemd-zram-setup@zram0.service
systemctl start dev-zram0.swap
```

The `cat > file <<'EOF' ... EOF` block is a single command (a *heredoc*): paste it whole, from
`cat` through the closing `EOF`.

## Gotcha: formatted, but not active

The generator creates **two** units, and they do different things:

- `systemd-zram-setup@zram0.service` creates `/dev/zram0` and **formats** it as swap;
- `dev-zram0.swap` **activates** it.

At boot, `swap.target` pulls in both. When setting it up by hand, starting only the setup service
leaves a formatted device that is not in use. Its status says `active (exited)` and the journal
says *successfully formatted as swap*, yet `swapon --show` doesn't list it. Starting
`dev-zram0.swap` fixes it, and from the next boot on it all happens automatically.

## Verify

```bash
swapon --show
# NAME       TYPE      SIZE USED PRIO
# /dev/dm-0  partition 7.6G   0B   -1
# /dev/zram0 partition 3.8G   0B  100

cat /sys/block/zram0/comp_algorithm     # the active one is in brackets: [zstd]
zramctl                                 # compressed vs. original size once it is in use
```
