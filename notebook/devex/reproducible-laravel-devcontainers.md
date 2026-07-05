---
id: reproducible-laravel-devcontainers
title: Reproducible Laravel Dev Environments with Sail + DevContainers
sidebar_label: Laravel Sail + DevContainers
description: A one-command, fully reproducible local backend — API, Postgres (with an isolated test database), and a mocked S3 — using DevContainers on top of Laravel Sail.
---

# Reproducible Laravel Dev Environments with Sail + DevContainers

The goal of this how-to is a backend that a new developer can run with **one action**:
open the folder in the editor, "Reopen in Container", and get an identical API + database +
object storage on any machine — Linux, macOS, or Windows.

## The problem it solves

Onboarding to a real backend often stalls on environment drift: a specific PHP/Laravel
version, one maintainer on macOS and everyone else on Windows, Postgres extensions that
must exist before the schema loads, and a database dump that won't restore cleanly. Each of
these is small; together they cost days or weeks. A **DevContainer** turns that tribal setup
knowledge into a versioned, reproducible path.

## Architecture

Three services on an internal network, orchestrated by the DevContainer:

- **`laravel.dev`** — the API, on a Laravel Sail image (PHP 8.1).
- **`pgsql`** — PostgreSQL 15. A bootstrap script creates both the main database **and an
  isolated `_test` database**, so automated tests never touch development data.
- **`minio`** — a local S3-compatible object store. It mocks AWS S3 so features that upload
  images run locally with **no real cloud account** — a higher-fidelity environment.

## The DevContainer

`.devcontainer/devcontainer.json` points at the Compose file, selects the app service, and
runs everything needed on first build:

```jsonc
{
  "name": "app-dev",
  "dockerComposeFile": ["../compose.yaml"],
  "service": "laravel.dev",
  "workspaceFolder": "/var/www/html",
  "remoteUser": "sail",
  "postCreateCommand": "composer install && php artisan key:generate && php artisan jwt:secret --force && php artisan migrate"
}
```

The `postCreateCommand` is the whole trick: on first open the container installs
dependencies, generates the app and JWT keys, and runs migrations. Nothing manual.

## Isolated test database, by default

The Postgres bootstrap script creates `<db>` and `<db>_test`. `phpunit.xml` runs the suite
against the test database:

```xml
<env name="APP_ENV" value="testing"/>
<env name="DB_DATABASE" value="app_test"/>
```

Tests are isolated from development data out of the box — and the same setup is ready to run
in a CI pipeline later.

## Mocking S3 locally with MinIO

Point Laravel's storage at the MinIO endpoint and a bootstrap script creates the bucket and
its policy, so upload code paths work offline:

```dotenv
AWS_ENDPOINT=http://minio:9000
```

The MinIO console (`http://localhost:9001`) lets you inspect uploaded files during
development.

## Running it

1. `cp .env.example .env` — the example values are already wired to the containers.
2. Open the folder in VS Code and choose **Dev Containers: Reopen in Container**.
3. First build runs the `postCreateCommand` automatically; when it finishes, the API is up.

The only host prerequisites are Docker, VS Code, and the Dev Containers extension — no local
PHP version to match.

## Loading a database dump

From the host, restore a provided dump into the running Postgres container:

```bash
cat dump.sql | docker exec -i <db_container> pg_restore -U postgres -d app
```

If the file is a plain `.sql` rather than a native Postgres archive, use `psql` instead of
`pg_restore`.

## Useful commands (inside the container terminal)

- Run the tests: `php artisan test`
- Clear cache: `php artisan cache:clear`

## The payoff

Install any PHP version (or none), open the folder, and the full backend — API, database
with an isolated test schema, and mocked object storage — comes up the same way for
everyone. Onboarding stops being a meeting and becomes a command.
