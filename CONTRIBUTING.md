# Contributing

1. Branch from `main`; use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:` ...).
2. Before pushing: `pnpm lint && pnpm typecheck && pnpm test:run && pnpm build`.
3. UI changes: check light and dark, mobile and desktop, keyboard focus, and run `pnpm test:e2e`.
4. Copy changes: update ca, es and en together.
5. No new colours, fonts or one-off spacing: extend the tokens in `src/index.css` instead.
