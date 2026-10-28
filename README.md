# DuckHats web

Corporate site of DuckHats, a software and digital services studio. Static SPA (React + Vite)
with three languages (ca, es, en) and two serverless form endpoints on Vercel.

## Stack

React 18 · TypeScript (strict) · Vite 5 · Tailwind 3 · React Router 6 · Framer Motion ·
react-helmet-async · Zod · Vitest + Testing Library · Playwright + axe · pnpm.

## Getting started

```bash
nvm use            # Node 24+ (see .nvmrc)
pnpm install
cp .env.example .env   # only needed to test the API locally (vercel dev)
pnpm dev
```

| Script                                         | What it does                                                      |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| `pnpm dev` / `pnpm preview`                    | Dev server / serve the production build                           |
| `pnpm build`                                   | Typecheck, build, then generate `sitemap.xml` and `robots.txt`    |
| `pnpm lint` / `pnpm format` / `pnpm typecheck` | ESLint (a11y rules included), Prettier, `tsc`                     |
| `pnpm test` / `test:run` / `test:coverage`     | Vitest                                                            |
| `pnpm test:e2e`                                | Playwright smoke + axe against the built site (run `build` first) |
| `pnpm check:bundle`                            | Fails if the entry chunk exceeds its gzip budget                  |
| `pnpm images`                                  | Converts photos to WebP and regenerates logo, favicon, OG cover   |

Set `CHROMIUM_PATH=/usr/bin/chromium` to run e2e with a system browser.

## Structure

```
api/              Vercel functions (submit-contact, submit-join-us) + _utils/
scripts/          Build tooling: images, sitemap/robots, bundle budget
src/
  app/            Router and language route
  components/     layout/, sections/, forms/, ui/ primitives
  content/        locales/{ca,es,en}.ts, projects.ts, team.ts, services.ts
  lib/            routes, languages, i18n, schemas (shared with api/), consent
  pages/          One component per route
  config/site.ts  Domain, email, social links, analytics id
e2e/  test/       Playwright specs; API and config tests
```

## Content and languages

- Languages live in the URL: `/ca`, `/es`, `/en`. `/` and legacy URLs redirect.
- Add or edit copy in `src/content/locales/ca.ts` first; `es.ts` and `en.ts` are typed as
  `Messages`, so the compiler and `translations.test.ts` fail if a key is missing.
- Use `useMessages()` for objects and `useT()('home.hero.title')` for typed key lookups.
- Projects, team and services are typed data with `{ca, es, en}` fields.
- Add a page: add it to `ROUTES` in `src/lib/routes.ts`, create the page, register it in
  `src/app/App.tsx`, and add `seo.<key>` and `nav.<key>` messages.

## Design tokens

Colours, fonts and radii are defined once as CSS variables in `src/index.css` (light and dark)
and exposed through `tailwind.config.js`. Use `bg-canvas`, `text-ink`, `text-muted`,
`border-line`, `bg-accent`: never hex values. See [docs/BRAND.md](docs/BRAND.md).

## Environment

| Variable              | Used by                   | Notes                                             |
| --------------------- | ------------------------- | ------------------------------------------------- |
| `DISCORD_WEBHOOK_URL` | `api/submit-*`            | Server only. The handlers fail closed without it. |
| `SITE_URL`            | `scripts/generate-seo.ts` | Optional override for sitemap/robots.             |

## Deployment

Vercel. `vercel.json` rewrites everything except `/api/*` to `index.html` and sets the
security headers (CSP, HSTS, ...), which are covered by `test/vercel.test.ts`.

## Pending before launch

Search the repo for `TODO(client)`: domain, corporate phone, legal details, measured project
results and missing team profiles.
