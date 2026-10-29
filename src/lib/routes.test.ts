import { describe, expect, it } from 'vitest'
import { LANGUAGES } from './languages'
import {
  ROUTES,
  buildPath,
  legacyPath,
  projectPath,
  routeKeyFor,
  switchLanguagePath,
} from './routes'

describe('routes', () => {
  it('builds language-prefixed, localised paths', () => {
    expect(buildPath('ca', 'home')).toBe('/ca')
    expect(buildPath('ca', 'services')).toBe('/ca/serveis')
    expect(buildPath('es', 'services')).toBe('/es/servicios')
    expect(buildPath('en', 'services')).toBe('/en/services')
    expect(projectPath('es', 'menu-ginebro')).toBe('/es/proyectos/menu-ginebro')
  })

  it('has unique keys and unique slugs within each language', () => {
    expect(new Set(ROUTES.map((r) => r.key)).size).toBe(ROUTES.length)
    for (const language of LANGUAGES) {
      expect(new Set(ROUTES.map((r) => r.path[language])).size).toBe(ROUTES.length)
    }
  })

  it('recognises a slug in any language and the legacy ones', () => {
    expect(routeKeyFor('serveis')).toBe('services')
    expect(routeKeyFor('servicios')).toBe('services')
    expect(routeKeyFor('team')).toBe('about')
    expect(routeKeyFor('join-us')).toBe('careers')
    expect(routeKeyFor('nope')).toBeUndefined()
  })

  it('maps legacy language-less URLs', () => {
    expect(legacyPath('ca', '/projects/menu-ginebro')).toBe('/ca/projectes/menu-ginebro')
    expect(legacyPath('es', '/join-us')).toBe('/es/trabaja-con-nosotros')
    expect(legacyPath('en', '/')).toBe('/en')
  })

  it('switches language, translating the slug and keeping the rest', () => {
    expect(switchLanguagePath('/ca/projectes/x', 'en')).toBe('/en/projects/x')
    expect(switchLanguagePath('/es/aviso-legal', 'ca')).toBe('/ca/avis-legal')
    expect(switchLanguagePath('/es', 'ca')).toBe('/ca')
    expect(switchLanguagePath('/ca/services', 'ca')).toBe('/ca/serveis')
    expect(switchLanguagePath('/foo', 'en')).toBe('/en/foo')
  })
})
