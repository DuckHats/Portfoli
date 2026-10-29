# DuckHats web

Corporate site of DuckHats, a software and digital services studio. Static SPA (React + Vite)
with three languages (ca, es, en) and two serverless form endpoints on Vercel.

## Stack

React 18 · TypeScript (strict) · Vite 7 · Tailwind 3 · React Router 7 · react-helmet-async ·
Zod · Vitest + Testing Library · Playwright + axe · pnpm.

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
scripts/          Build tooling: images, SEO shells/sitemap (lib/), bundle budget, serve-dist
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

- Languages live in the URL and slugs are localised: `/ca/serveis`, `/es/servicios`,
  `/en/services`. `/`, the old English slugs and legacy URLs redirect on the server (`vercel.json`).
- Add or edit copy in `src/content/locales/ca.ts` first; `es.ts` and `en.ts` are typed as
  `Messages`, so the compiler and `translations.test.ts` fail if a key is missing.
- Use `useMessages()` for objects and `useT()('home.hero.title')` for typed key lookups.
- Projects, team and services are typed data with `{ca, es, en}` fields.
- Add a page: add it to `ROUTES` in `src/lib/routes.ts` with a slug per language, create the page,
  add it to `PAGES` in `src/app/App.tsx`, add `seo.<key>` and `nav.<key>` messages and run
  `pnpm redirects` (a test fails if `vercel.json` is out of date).

## SEO

- **Prerendered pages.** `pnpm build` renders every page (and the 404 page) to HTML with
  `src/entry-server.tsx` and writes one file per route and language (`dist/ca/serveis.html`, ...):
  the real content, plus the right title, description, canonical, hreflang, Open Graph and
  JSON-LD. Crawlers, AI assistants and link previews get the whole page without JavaScript; the
  browser hydrates it (`src/main.tsx`). Every prerendered head tag carries `data-rh` so
  react-helmet-async replaces it instead of duplicating it.
- **Structured data.** Every page has the studio as an `Organization`; the home page adds
  `WebSite`, inner pages a `BreadcrumbList`, and Services, Projects, each project, About and
  Contact their own types (`src/lib/jsonLd.ts`, shared by the client and the build).
- **URLs.** Localised slugs, permanent server redirects from every old URL, a real 404 status for
  unknown ones (see Content and languages, and Deployment).
- `sitemap.xml` comes from the same page list (reciprocal hreflang and the project and team images),
  plus `robots.txt` and `/.well-known/security.txt` (its `Expires` is renewed on every build).
- Titles stay within 60 characters and descriptions between 70 and 160, in all three languages
  (`test/seo.test.ts`); longer project summaries are shortened at a word (`metaDescription`).

## Accessibility

WCAG 2.2 AA. `e2e/a11y.spec.ts` and `e2e/smoke.spec.ts` run axe on every page in the light and dark
themes on desktop and mobile, and check headings, alt text, 24 px targets, reflow at 320 px, the
site without JavaScript, the skip link, keyboard use, the mobile menu, forms with errors and the
pause controls of everything that moves.

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

Vercel. `vercel.json` enables `cleanUrls` (so `ca/serveis.html` is served at `/ca/serveis`), holds
the permanent redirects generated from `ROUTES` (`pnpm redirects`), serves `404.html` with a real 404
for anything else, and sets the security headers (CSP, HSTS, ...), all covered by
`test/vercel.test.ts`. `scripts/serve-dist.ts` reproduces that URL resolution locally
and is what the e2e tests and Lighthouse run against.

## Pending before launch

Search the repo for `TODO(client)`: domain, corporate phone and address (they would let the
Organization become a LocalBusiness), legal details, budget ranges, real team photos, measured
project results and missing team profiles. Once the domain is live, register it in Google Search
Console and Bing Webmaster Tools and submit `/sitemap.xml`.
