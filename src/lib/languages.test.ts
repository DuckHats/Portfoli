import { afterEach, describe, expect, it, vi } from 'vitest'
import { detectLanguage, isLanguage, storeLanguage } from './languages'

const setNavigatorLanguages = (languages: string[]) =>
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(languages)

describe('languages', () => {
  afterEach(() => vi.restoreAllMocks())

  it('validates language codes', () => {
    expect(isLanguage('ca')).toBe(true)
    expect(isLanguage('fr')).toBe(false)
    expect(isLanguage(undefined)).toBe(false)
  })

  it('prefers the stored language', () => {
    setNavigatorLanguages(['en-US'])
    storeLanguage('es')
    expect(detectLanguage()).toBe('es')
  })

  it('falls back to the browser language', () => {
    setNavigatorLanguages(['fr-FR', 'es-ES'])
    expect(detectLanguage()).toBe('es')
  })

  it('defaults to Catalan', () => {
    setNavigatorLanguages(['de-DE'])
    expect(detectLanguage()).toBe('ca')
  })
})
