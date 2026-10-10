---
id: ssh-key-only
title: Key-Only SSH (and the Detours on the Way)
sidebar_label: Key-Only SSH
sidebar_position: 5
description: Turn off password logins on the Proxmox host without locking yourself out — a dedicated key per client pinned with IdentitiesOnly, a drop-in sshd config, and the three detours that showed up — a changed host key, the wrong key installed, and the wrong user.
---

# Key-Only SSH (and the Detours on the Way)

The goal: the host accepts SSH **only with a key**, never a password, so brute-forcing a password
stops being possible. The risk is locking yourself out, so the order matters: **every client gets a
working key first, password login goes off last.** The Proxmox web UI shell is the fallback the
whole time.

## 1. One key per client, pinned to the host

Each machine gets its **own** key for the homelab. If a laptop is lost, you revoke that one key and
nothing else.

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519_homelab -C "<user>@<machine>-homelab"
```

Then a `Host` block in `~/.ssh/config`:

```sshconfig
Host pve
    HostName <host-ip>
    User root
    IdentityFile ~/.ssh/id_ed25519_homelab
    IdentitiesOnly yes
```

**`IdentitiesOnly yes`** is the key line. Without it, the SSH agent offers **every** key it holds to
every host: your homelab sees your work keys, and the reverse. With it, `pve` gets only the homelab
key.

Install the key and check it:

```bash
ssh -G pve | grep -E "^(user|identityfile|identitiesonly) "   # the config that actually applies
ssh-copy-id -i ~/.ssh/id_ed25519_homelab.pub pve
ssh pve hostname                                              # must not ask for a password
```

Repeat on every client before going further.

## 2. Turn off password login on the host

A drop-in file instead of editing the main `sshd_config`. Drop-ins are read first, and for each
option sshd keeps the first value it finds, so they win.

```bash
cat > /etc/ssh/sshd_config.d/10-hardening.conf <<'EOF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin prohibit-password
EOF
sshd -t && systemctl reload ssh
sshd -T | grep -E "^(passwordauthentication|kbdinteractiveauthentication|permitrootlogin) "
```

- `sshd -t` validates the config, and the reload only happens if it is valid.
- `sshd -T` prints the **effective** values: `no`, `no` and `without-password` (the internal name
  for `prohibit-password`: root may log in, but only with a key).

**Keep this session open** and test from a **new** one:

```bash
ssh pve hostname                                  # works
ssh -o PubkeyAuthentication=no root@<host-ip>     # Permission denied (publickey), no password prompt
```

Rollback, from the session you kept open (or the web UI shell):

```bash
rm /etc/ssh/sshd_config.d/10-hardening.conf && systemctl reload ssh
```

## Detours

These three showed up on the way. Each one is a common trap.

### "REMOTE HOST IDENTIFICATION HAS CHANGED!"

After reinstalling a server on the same IP, clients that knew the old one refuse to connect: the
new install generated new host keys. That is the warning doing its job, since a swapped server looks
exactly the same. **Don't delete the old entry blindly.** Check the new fingerprint from a channel
you trust (the web UI shell), and compare it with the one in the warning:

```bash
# on the host, via the web UI shell
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

Only if it matches, on the client:

```bash
ssh-keygen -R <host-ip>
ssh root@<host-ip>      # accept the new key after checking the fingerprint again
```

(Run the `ssh-keygen -lf` on the **host**. On the client, the file usually doesn't exist and the
command fails.)

### The wrong key got installed

On one client, `ssh-copy-id root@<host-ip>` (without `-i`) installed a key from a **different
context** (a work key), because without `-i` it installs whatever keys the SSH agent holds. A second
run then reported *All keys were skipped because they already exist*: `ssh-copy-id` detects
installed keys by logging in with them.

Listing the authorized keys without printing them in full shows each type and comment:

```bash
awk '{print $1, $NF}' /root/.ssh/authorized_keys
```

The fix is to remove the stray line and install the dedicated key with `-i`. On Proxmox there's a
catch: `/root/.ssh/authorized_keys` is a **symlink** to `/etc/pve/priv/authorized_keys` (the cluster
filesystem). A plain `sed -i` replaces the symlink with a detached regular file, so follow it:

```bash
ls -l /root/.ssh/authorized_keys        # -> /etc/pve/priv/authorized_keys
sed -i --follow-symlinks '/<comment-of-the-stray-key>/d' /root/.ssh/authorized_keys
ls -l /root/.ssh/authorized_keys        # still the same symlink
```

Leave the `ssh-rsa root@<hostname>` entry alone: it is Proxmox's own key.

### Logged in as the wrong user

With the new `Host` block in place, `ssh-copy-id` still asked for the password of `<user>@<host-ip>`
instead of `root`. The cause: an **old block with the same alias** higher up in `~/.ssh/config`, left
over from the previous server, set `User`. `ssh_config` keeps the **first** value it finds for each
option, so the old block won. `HostName` came from the new block only because the old one didn't set
it.

`ssh -G` settles it by printing the values that actually apply:

```bash
ssh -G pve | grep -E "^(user|hostname|identityfile|identitiesonly) "
grep -n -E "^\s*(Host|Match|User|Include)" ~/.ssh/config
```

Delete the stale block. The general rule for the file: **specific `Host` blocks at the top,
`Host *` at the bottom.**
