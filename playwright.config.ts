import { defineConfig, devices } from '@playwright/test'

// Runs against the production build (dist/) served with Vercel-like URL resolution
// (scripts/serve-dist.ts): run `pnpm build` first.
// Set CHROMIUM_PATH to use a system Chromium instead of the Playwright download.
const executablePath = process.env.CHROMIUM_PATH || undefined

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    reducedMotion: 'reduce',
    launchOptions: { executablePath },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], launchOptions: { executablePath } } },
    { name: 'mobile', use: { ...devices['Pixel 5'], launchOptions: { executablePath } } },
  ],
  webServer: {
    command: 'npx tsx scripts/serve-dist.ts',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
})
