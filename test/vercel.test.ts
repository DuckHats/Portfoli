import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

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
