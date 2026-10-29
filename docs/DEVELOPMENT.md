# DuckHats web: working notes

Read README.md first. Things that are not obvious from the code:

- **pnpm only.** `packageManager` is pinned; there is no `package-lock.json`.
- **Routes live in one list**: `ROUTES` in `src/lib/routes.ts`. Router, sitemap and tests use it. The
  header navigation (`components/layout/navigation.ts`) is a deliberate subset.
- **Languages are URL prefixes**, handled by `app/LangRoute.tsx`. An unknown first segment is treated
  as a legacy URL and redirected using `legacyPath`.
- **Catalan is the source locale.** `Messages = typeof ca`; es/en are annotated with it. Do not
  add keys to only one file. Placeholders (`{year}`, `{email}`) must match across languages.
- **`src/lib/schemas.ts` is shared with `api/`.** Keep it free of `@/` aliases. Inside `api/`, relative
  imports need the `.js` suffix (Node ESM). Validation messages are keys of `messages.validation`.
- **API files starting with `_` are not functions.** Put shared logic in `api/_utils/`, and tests in
  `test/api/`, never inside `api/`.
- **Tests under Node 26**: Node ships its own file-less `localStorage` that shadows jsdom's;
  `src/test/setup.ts` installs an in-memory one. Do not remove it.
- **Colours are tokens.** No hex values or `style={{ color }}` in components.
- **No emphasis markers**: headlines are plain strings; `translations.test.ts` fails on any `*`.
- **`dark:` follows the manual theme**: `tailwind.config.js` defines `darkMode` as a variant over
  `data-theme` plus the system preference, so `dark:invert` etc. react to the theme button.
- **Hero and showcase**: `Hero` reuses `BrowserFrame` + `ShowcaseCarousel` (`priority` loads the first
  screenshot eagerly). `ProjectShowcase` > `BrowserFrame` > `ShowcaseCarousel` (`useCarousel`). Autoplay is
  off for reduced motion, hover, focus and off-screen. The 3D tilt and scroll settle live in `Hero`;
  `ProjectStack` makes the sticky stack (desktop only, via `useMediaQuery`).
  Keep the 16:10 box fixed so it never shifts layout.
- **Images**: add originals under `public/projects` or `public/team`, run `pnpm images`
  (WebP, originals deleted), and reference the `.webp` path.
- **Dates**: `SITE.legalUpdated` is the privacy/legal review date; bump it when the text changes.
- **Analytics** loads only after consent (`lib/consent.ts`); the CSP only allows Google Tag Manager.
- **Prerendered pages**: `pnpm build` runs `vite build`, then `vite build --ssr src/entry-server.tsx
--outDir dist-ssr`, then `scripts/generate-seo.ts`, which renders each page and writes
  `dist/<lang>/<page>.html` and `dist/404.html` (`scripts/lib/shells.ts`). Head tags carry
  `data-rh="true"` so react-helmet-async replaces them. Keep `src/lib/seo.ts` as the only place that
  formats titles, canonicals and hreflang, and `src/lib/jsonLd.ts` for page structured data.
- **Hydration rules** (the browser takes over the prerendered HTML with `hydrateRoot`): the first
  client render must equal the HTML. Never read browser state while rendering: use
  `useSyncExternalStore` with a server snapshot, or `useHydrated()` for things like the stored
  cookie choice or the clock. Do not re-render a component that contains a lazy route or section
  right after mounting (React would throw away its HTML, error #421): read preferences such as
  reduced motion inside handlers or in CSS (`motion-reduce:`). The animation engine is loaded before
  hydrating (`main.tsx`) for the same reason. e2e fails on any console error, which catches this.
- **Routes and redirects**: slugs per language live in `ROUTES`; `pnpm redirects` writes the
  permanent redirects into `vercel.json` (`scripts/lib/redirects.ts`), and `test/vercel.test.ts`
  fails when they are out of date. There is no catch-all rewrite: unknown URLs get `404.html` with
  a 404 status. `scripts/serve-dist.ts` applies the same redirects and 404 locally.
- **`cleanUrls: true` + `trailingSlash: false`** in `vercel.json` are what make `/ca/serveis` resolve
  to the prerendered file. `vite preview` does not do this: use `scripts/serve-dist.ts` (e2e does).
- **Dependency overrides** in `package.json` (`pnpm.overrides`) pin patched transitive versions so
  `pnpm audit` stays clean; remove an entry once its parent ships the fix.
- **Motion**: `motion` (Framer Motion) through `MotionProvider` (`LazyMotion strict` + lazy `domMax`).
  Use `m.*`, never `motion.*` (strict mode throws). Motion hooks (`useScroll`, springs) are in the entry
  chunk; the features are a separate lazy chunk. `pnpm check:bundle` keeps the entry under 60 KB gzip
  and the features chunk under 35 KB. Headline entrances stay CSS so the LCP text needs no script.
- **Lazy interaction layer**: quick search and everything below the home fold are separate chunks.
  Keep new effects off the entry chunk and stop per-frame work when off screen (see `ServiceMarquee`). Content modules such as `services.ts` are large: do not import them from
  anything on the home's first screen.
- **Project brief**: the contact form's fields, choices and steps live in `src/lib/schemas.ts`
  (`PROJECT_*`, `FEATURES_BY_TYPE`, `CONTACT_STEPS`, `contactStepSchema`), shared with
  `api/submit-contact.ts`. `features` travels as one JSON field (`parseStringList`). The budget
  choices are placeholders until the real ranges exist (TODO(client) in the locales).
- **Loader**: `#intro` markup and its inline `<style>` in `index.html`, flagged once per session
  by `public/theme-init.js`. e2e runs with reduced motion, so it never shows there except in its
  own test.
- **Theme state** lives in `src/lib/theme.ts` (`toggleTheme`, `useTheme`), shared by the header
  button and quick search.
- **Acts**: every top-level block on a page declares `data-act` (`paper`, `ink`, `red`); the header
  reads it (`useActiveAct`) and the tokens are redefined per act in `src/index.css`.
- React 18 and Tailwind 3 are intentional; upgrading either needs its own change.
- Local hooks (husky): pre-commit lint-staged, commit-msg commitlint (Conventional Commits),
  pre-push unit tests.
