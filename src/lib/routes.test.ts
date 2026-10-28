import { describe, expect, it } from 'vitest'
import { ROUTES, buildPath, legacyPath, projectPath, switchLanguagePath } from './routes'

describe('routes', () => {
  it('builds language-prefixed paths', () => {
    expect(buildPath('ca', 'home')).toBe('/ca')
    expect(buildPath('es', 'services')).toBe('/es/services')
    expect(projectPath('en', 'menu-ginebro')).toBe('/en/projects/menu-ginebro')
  })

  it('has unique keys and paths', () => {
    expect(new Set(ROUTES.map((r) => r.key)).size).toBe(ROUTES.length)
    expect(new Set(ROUTES.map((r) => r.path)).size).toBe(ROUTES.length)
  })

  it('maps legacy language-less URLs', () => {
    expect(legacyPath('ca', '/projects/menu-ginebro')).toBe('/ca/projects/menu-ginebro')
    expect(legacyPath('es', '/join-us')).toBe('/es/careers')
    expect(legacyPath('en', '/')).toBe('/en')
  })

  it('swaps the language segment and keeps the rest', () => {
    expect(switchLanguagePath('/ca/projects/x', 'en')).toBe('/en/projects/x')
    expect(switchLanguagePath('/es', 'ca')).toBe('/ca')
    expect(switchLanguagePath('/foo', 'en')).toBe('/en/foo')
  })
})
