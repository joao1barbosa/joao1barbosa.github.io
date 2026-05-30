# joao1barbosa.github.io

Personal portfolio, blog and digital notebook of **João Pedro Ribeiro Barbosa** — Fullstack Software Engineer. Built as a single [Docusaurus](https://docusaurus.io/) (v3, TypeScript) application and deployed to GitHub Pages.

🔗 **Live:** https://joao1barbosa.github.io

---

## Overview

One Docusaurus app serves three areas, all sharing the same design system:

| Route        | What it is                                                         |
| ------------ | ------------------------------------------------------------------ |
| `/`          | **Landing page** — portfolio built with React/TS components        |
| `/blog`      | **Blog** — posts (Docusaurus blog plugin)                          |
| `/notebook`  | **Notebook** — docs/study notes (Docusaurus docs plugin)           |

The default Docusaurus navbar is removed across the whole site; navigation is handled by a custom **floating dock**.

## Tech stack

- **Docusaurus 3.9** + **React 19**, strict **TypeScript**
- **yarn** (classic workspaces removed — single root app)
- **lucide-react** for icons
- Self-hosted fonts: **DM Sans** (variable) + **DM Mono**
- Design tokens in **OKLCH**, mapped to Infima CSS variables so blog/notebook inherit the same identity
- Node **>= 20**

## Features

- **Floating dock** navigation (replaces the navbar) with section anchors, blog/notebook links, socials, theme and language toggles.
- **Light / dark theme** via Docusaurus color mode (warm OKLCH palette, hue 55).
- **Client-side EN / PT toggle** on the landing page (instant, persisted in `localStorage`, no reload). Off the landing the button is locked to `EN`, since blog/notebook content is English.
- **Mobile-aware dock**: section buttons hidden, a hamburger exposes the native notebook/blog sidebar (stripped down to page links only).
- Sections: Hero, About, Work Experience (expandable, mirrored layout with right-aligned dates), Projects, Skills, Highlights, Education, Contact.

## Project structure

```
.
├── docusaurus.config.ts      # site config (baseUrl '/', blog at /blog, docs at /notebook)
├── sidebars.ts
├── blog/                     # blog posts (+ authors.yml)
├── notebook/                 # docs / study notes
├── src/
│   ├── pages/index.tsx       # landing page (assembles the sections)
│   ├── data/portfolio.ts     # ← single source of content (bilingual, typed)
│   ├── components/landing/   # Hero, WorkItem, ProjectCard, EducationItem, FloatingDock, ...
│   ├── theme/                # swizzles: Navbar (removed), Layout (injects dock), MobileSidebar
│   └── css/custom.css        # design tokens + Infima overrides
├── static/                   # fonts, images (img/work logos, favicon)
├── .devcontainer/            # Node 20 dev container
└── .github/workflows/deploy.yml
```

## Editing content

Almost everything on the landing page lives in **`src/data/portfolio.ts`** — typed and bilingual (`{ en, pt }`):

- `config.availableForProjects` — toggles the "Available for projects" badge in the hero.
- `workExperience`, `projects`, `skills`, `highlights`, `education` — section data.
- `profile`, `pills`, `ui` — identity, hero pills and interface labels.

Blog posts go in `blog/`, notebook pages in `notebook/` (standard Docusaurus Markdown/MDX).

## Development

Requires Node >= 20 and yarn.

```bash
yarn install        # install dependencies
yarn start          # dev server at http://localhost:3000
yarn build          # production build → ./build
yarn serve          # serve the production build locally
yarn typecheck      # tsc, no emit
```

### Dev container

`.devcontainer/` provides a Node 20 environment. Opening the repo in a dev container runs `yarn install` and starts the dev server automatically (port 3000 forwarded).

## Deployment

Automated via GitHub Actions (`.github/workflows/deploy.yml`) using the official GitHub Pages flow:

1. On every push to **`main`** (or manual `workflow_dispatch`).
2. `yarn install` → `yarn build`.
3. Upload `build/` artifact → deploy to GitHub Pages.

> Requires **Settings → Pages → Source = "GitHub Actions"**. No `gh-pages` branch is used.

## License

ISC © João Pedro Ribeiro Barbosa.

Style based on [Bhide Svelte](https://portfolio-sve.vercel.app/).