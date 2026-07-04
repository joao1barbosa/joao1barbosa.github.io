---
slug: why-i-rejected-proxmox-in-2025
title: "Why I Rejected Proxmox in 2025 — and Adopt It in 2026"
authors: [joao1barbosa]
tags: [homelab, proxmox, virtualization, infrastructure]
---

Reversing a technical decision is usually read as inconsistency. I'd argue the
opposite: when the premise changes, *not* reversing is the mistake.

This is the story of one decision I made twice — and got right both times, because
the context wasn't the same.

<!-- truncate -->

## 2025: the wrong tool for a dying laptop

My first homelab ran on genuinely scrapped hardware: an old laptop with a 3rd-gen
Intel Core i5 (U-series), 4 GB of DDR3, and a 750 GB mechanical drive. The screen no
longer held itself up and the case wouldn't fully close.

My first instinct was Proxmox VE — I wanted real virtualization, snapshots, the
"proper" way to run a lab. The hardware disagreed. Between the weak CPU and 4 GB of
RAM, the hypervisor layer left almost nothing for the workloads. It wasn't a tuning
problem; it was a physics problem.

So I reversed immediately. I reinstalled with Ubuntu Server and ran the services
directly on the OS with Docker — no hypervisor, no isolation luxury, just enough
headroom to actually run something.

That single constraint defined the entire first era of the lab: ZRAM and swap
engineering to survive on 4 GB, a custom systemd service to keep Wake-on-LAN alive
across reboots, a reverse proxy and secure tunnels stacked on top. Survival
engineering — stories for the next posts in this series.

## 2026: the premise changed

The scrapped laptop is now retired. The lab moves to a dedicated Lenovo ThinkCentre
M900 Tiny: an i5-6500T, 8 GB of DDR4 (soon 12), a 240 GB NVMe for the system and a
1 TB HDD for data.

For the first time there's actual headroom for a hypervisor. The constraint that
killed Proxmox in 2025 is simply gone. So the rebuild I'm starting now runs on
Proxmox VE — the same tool I rejected a year ago.

## Why Proxmox, now

- **Real isolation** — each workload is contained; a broken experiment no longer
  takes the whole host down with it.
- **Snapshot and rollback per item** — experiments become reversible, which is what
  makes a lab a lab instead of a production system you're afraid of.
- **On-demand resource reallocation** — I can move RAM and CPU to where the work
  actually is.
- **Platform-vs-workload separation** — the host becomes a platform and the services
  become tenants. That's the Platform Engineer mindset, enforced by design instead of
  willpower.

The one rule I'm keeping from the scarcity years: **LXC by default, a full VM only
when strong isolation justifies it.** RAM is more abundant now, but it still isn't
free — and reaching for a VM by reflex is exactly how you run out of it.

## The actual lesson

Rejecting Proxmox in 2025 and adopting it in 2026 isn't a contradiction. It's the
same principle — fit the tool to the real constraint — applied to two different
realities. The value was never in choosing Proxmox or not; it was in being willing to
reverse the call the moment the premise moved.

We tend to over-reward consistency and under-reward re-evaluation. A decision defended
past its context isn't discipline — it's inertia with better branding.

Have you ever had to reverse an architecture decision because the premise changed —
and was it read as maturity, or as flip-flopping?
