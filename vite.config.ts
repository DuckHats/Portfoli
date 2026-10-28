import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'
import { SITE } from './src/config/site'

/** Inject site identity into index.html so the domain and email are defined in one place only. */
const siteUrl = (): Plugin => ({
  name: 'site-url',
  transformIndexHtml: (html) =>
    html.replaceAll('%SITE_URL%', SITE.url).replaceAll('%SITE_EMAIL%', SITE.email),
})

export default defineConfig({
  plugins: [react(), siteUrl()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'test/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/lib/**', 'src/content/**', 'api/_utils/**'],
      thresholds: { statements: 70, functions: 70, lines: 70, branches: 60 },
    },
  },
})
