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
  off for reduced motion, hover, focus and off-screen; parallax is `useScrollProgress` writing `--p`.
  Keep the 16:10 box fixed so it never shifts layout.
- **Images**: add originals under `public/projects` or `public/team`, run `pnpm images`
  (WebP, originals deleted), and reference the `.webp` path.
- **Dates**: `SITE.legalUpdated` is the privacy/legal review date; bump it when the text changes.
- **Analytics** loads only after consent (`lib/consent.ts`); the CSP only allows Google Tag Manager.
- **SEO shells**: `scripts/lib/shells.ts` writes `dist/<lang>/<page>.html` after the build. Tags it
  emits (and the managed ones in `index.html`) carry `data-rh="true"` so react-helmet-async replaces
  them. Keep `src/lib/seo.ts` as the only place that formats titles, canonicals and hreflang.
- **`cleanUrls: true` + `trailingSlash: false`** in `vercel.json` are what make `/ca/services` resolve
  to the prerendered file. `vite preview` does not do this: use `scripts/serve-dist.ts` (e2e does).
- **Dependency overrides** in `package.json` (`pnpm.overrides`) pin patched transitive versions so
  `pnpm audit` stays clean; remove an entry once its parent ships the fix.
- **Motion**: `Reveal` is CSS + IntersectionObserver; there is no animation library. Keep it that way.
- React 18 and Tailwind 3 are intentional; upgrading either needs its own change.
- Local hooks (husky): pre-commit lint-staged, commit-msg commitlint (Conventional Commits),
  pre-push unit tests.
