import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import type { Redirect } from '../scripts/lib/redirects'
import { buildRedirects, resolveRedirect } from '../scripts/lib/redirects'

interface HeaderRule {
  source: string
  headers: { key: string; value: string }[]
}
const config = JSON.parse(readFileSync('vercel.json', 'utf8')) as { headers: HeaderRule[] }
const global = Object.fromEntries(
  config.headers.find((r) => r.source === '/(.*)')!.headers.map((h) => [h.key, h.value]),
)

describe('vercel.json security headers', () => {
  const csp = global['Content-Security-Policy']!

  it('ships a strict CSP', () => {
    expect(csp).toContain("default-src 'self'")
    expect(csp).toContain("object-src 'none'")
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain("base-uri 'self'")
  })

  it('does not allow inline or eval scripts', () => {
    const scriptSrc = csp.split(';').find((d) => d.trim().startsWith('script-src'))!
    expect(scriptSrc).not.toContain('unsafe-inline')
    expect(scriptSrc).not.toContain('unsafe-eval')
  })

  it('sets the baseline hardening headers', () => {
    expect(global['Strict-Transport-Security']).toMatch(/max-age=\d{7,}/)
    expect(global['X-Content-Type-Options']).toBe('nosniff')
    expect(global['Referrer-Policy']).toBeDefined()
    expect(global['Permissions-Policy']).toBeDefined()
  })

  it('caches hashed assets immutably', () => {
    const rule = config.headers.find((r) => r.source === '/assets/(.*)')!
    expect(rule.headers[0]!.value).toContain('immutable')
  })
})

describe('vercel.json routing', () => {
  const routing = JSON.parse(readFileSync('vercel.json', 'utf8')) as {
    redirects: Redirect[]
    rewrites?: unknown[]
  }

  it('has the redirects derived from ROUTES (run `pnpm redirects` after changing routes)', () => {
    expect(routing.redirects).toEqual(buildRedirects())
  })

  it('never redirects to a URL that redirects again', () => {
    for (const { destination } of routing.redirects) {
      expect(resolveRedirect(destination.replace(/\/:rest\*?$/, '')), destination).toBeNull()
    }
  })

  it('serves unknown URLs a real 404 instead of rewriting them to the app', () => {
    expect(routing.rewrites ?? []).toEqual([])
  })

  it('sends old and foreign slugs to the localised page and leaves files alone', () => {
    expect(resolveRedirect('/ca/services')).toEqual({ location: '/ca/serveis', status: 308 })
    expect(resolveRedirect('/es/team')).toEqual({ location: '/es/nosotros', status: 308 })
    expect(resolveRedirect('/join-us')).toEqual({
      location: '/ca/treballa-amb-nosaltres',
      status: 308,
    })
    expect(resolveRedirect('/', 'en-GB,en;q=0.9')).toEqual({ location: '/en', status: 307 })
    expect(resolveRedirect('/team/Arnau.webp')).toBeNull()
    expect(resolveRedirect('/projects/sushisudoku/Home.webp')).toBeNull()
    expect(resolveRedirect('/ca/serveis')).toBeNull()
  })
})
