# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**IM Karton** corporate website built on the **Storeplate** boilerplate. Uses Astro 5 with a hybrid server/static output mode deployed to Netlify.

## Commands

```bash
yarn dev          # Start dev server (also runs theme generator in watch mode)
yarn build        # Generate theme + build for production
yarn preview      # Preview production build locally
yarn format       # Format code with Prettier
yarn check        # TypeScript check via astro check
```

Package manager is **yarn** (not npm). Node v22.20+ required.

## Architecture

### Technology Stack

- **Astro 5** – page routing, content collections, layouts
- **React 18** – interactive islands (`client:load` hydration)
- **Tailwind CSS 4** – styling via `@tailwindcss/vite`
- **TypeScript** – strict mode enabled

### Path Aliases (tsconfig.json)

```
@/components/*       → src/layouts/components/*
@/functional-components/* → src/layouts/functional-components/*
@/shortcodes/*       → src/layouts/shortcodes/*
@/helpers/*          → src/layouts/helpers/*
@/partials/*         → src/layouts/partials/*
@/*                  → src/*
```

### Content System

Content lives in `src/content/` as Markdown/MDX files with Zod-validated schemas defined in `src/content.config.ts`. Collections: `pages`, `caseStudies`, `team`, `news`, `about`, `contact`, `ctaSection`, `paymentSection`.

Access content with `getCollection()` or `getEntry()` from `astro:content`.

### Configuration

Site-wide settings are JSON files in `src/config/`:
- `config.json` – site metadata, hero slider slides, features
- `theme.json` – color palette (light/dark) and fonts
- `menu.json` – navigation structure
- `social.json` – social media links

`scripts/themeGenerator.js` reads `theme.json` and generates CSS variables. This runs automatically during `yarn dev` and `yarn build`.

### Component Types

| Directory | Type | Purpose |
|---|---|---|
| `src/layouts/partials/` | Astro | Header, Footer, PageHeader, CallToAction |
| `src/layouts/components/` | Astro | Logo, Breadcrumbs, ImageMod, ThemeSwitcher |
| `src/layouts/functional-components/` | React | HeroSlider, Testimonials, Accordion (client-side interactivity) |
| `src/layouts/shortcodes/` | MDX | Button, Notice, Tabs, Video (auto-imported in MDX) |
| `src/layouts/helpers/` | React | DynamicIcon, Announcement |

`Base.astro` is the root layout wrapping all pages with HTML, SEO metadata, GTM, header, and footer.

### Routing

- `src/pages/` – file-based routes
- `src/pages/[slug].astro` patterns – dynamic routes for news/works
- `src/pages/[regular].astro` – catch-all fallback

### Deployment

- **Netlify**: `netlify.toml` configures build command (`yarn build`), publish dir (`dist`), Node 22.21.1, edge middleware
- **Docker**: Multi-stage build (deps → builder → Nginx) for self-hosted deployment
