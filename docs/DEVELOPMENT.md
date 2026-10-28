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
- **Images**: add originals under `public/projects` or `public/team`, run `pnpm images`
  (WebP, originals deleted), and reference the `.webp` path.
- **Analytics** loads only after consent (`lib/consent.ts`); the CSP only allows Google Tag Manager.
- React 18 / Router 6 / Tailwind 3 are intentional; upgrades need their own change.
- Local hooks (husky): pre-commit lint-staged, commit-msg commitlint (Conventional Commits),
  pre-push unit tests.
