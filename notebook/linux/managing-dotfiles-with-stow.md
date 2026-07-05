---
id: managing-dotfiles-with-stow
title: Managing Dotfiles with GNU Stow
sidebar_label: Dotfiles with GNU Stow
description: Keep every config file in one versioned Git repository and symlink it into place with GNU Stow — modular, script-free, and reproducible across machines.
---

# Managing Dotfiles with GNU Stow

The goal: keep every configuration file in a single, Git-versioned repository, and put each
one where the system expects it with **symlinks** instead of copies. **GNU Stow** does the
symlinking. Thanks to [Paulo (PauloHFS)](https://github.com/PauloHFS), who pointed me to
Stow — I researched and implemented the setup below.

My environment for the examples: Arch Linux (Omarchy) with Hyprland, but the technique is
OS-agnostic.

## What Stow does

Stow is a symlink farm manager. Instead of copying config files into places like
`~/.config`, you keep them organized in one folder (e.g. `~/dotfiles`) and Stow creates the
symlinks in the right locations, pointing back at the repository.

Why this is worth it:

- **Centralization** — every important file lives in one Git-versioned folder.
- **Modularity** — enable or disable one program's config at a time (`stow nvim`) without
  touching the rest.
- **Simplicity** — no scripts to move files around; Stow is the whole mechanism.

## Install

On Arch Linux:

```bash
sudo pacman -S stow
```

## Repository structure

Each top-level folder is a **package**, and its contents mirror the structure starting from
`$HOME`:

```text
~/dotfiles/
├── hyprland/            <-- package name
│   └── .config/
│       └── hypr/
│           └── hyprland.conf
├── waybar/
│   └── .config/
│       └── waybar/
│           └── config.jsonc
└── bash/
    └── .bashrc          <-- lands directly in $HOME
```

## Usage

Apply a package (create its symlinks):

```bash
cd ~/dotfiles
stow hyprland
```

That creates `~/.config/hypr/hyprland.conf` as a link pointing into the repository. Remove
the links again with:

```bash
stow -D hyprland
```

## Resolving conflicts on a fresh machine

A freshly installed system already ships default config files, and Stow refuses to
overwrite real files (to avoid data loss), so `stow` errors out when a target exists. Two
ways to resolve it:

**1. The "git trick" (best for migrations).** Let the repository win, then restore its
original contents:

```bash
stow --adopt *   # WARNING: this overwrites the repo's files with the machine's current ones
git restore .    # bring the repo's versions back; $HOME now reflects the repository
```

Because Stow turned the `$HOME` files into links, restoring the repo makes `$HOME`
immediately reflect what's in Git.

**2. Manual cleanup (more cautious).** Delete the originals first, then stow:

```bash
rm ~/.bashrc
rm -rf ~/.config/hypr
cd ~/dotfiles && stow *
```

## Per-machine variants with Git branches

Different machines need slightly different configs — a desktop has monitor layouts a laptop
doesn't, and so on. I keep that variation in **branches** rather than in conditionals:

- `main` — desktop (monitor setup and related tweaks).
- a separate branch (e.g. `notebook`) — the laptop variant.

On each machine you check out the branch that matches it, then stow. Shared config stays
common; only the machine-specific parts diverge, and Git makes the difference explicit and
reviewable.

## Tips learned the hard way

- **Avoid absolute symlinks inside the repo** (links pointing at `/home/<user>/...`). They
  break on machines where the username differs. If you hit `absolute symlink` errors, delete
  the link in the repo and keep a real file or a relative link.
- **Watch for config version drift** when moving between machines — a program may rename a
  parameter between versions. Validate after stowing; for Hyprland, for example:

  ```bash
  hyprctl configerrors
  ```
