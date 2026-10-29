import { describe, expect, it } from 'vitest'
import {
  absoluteUrl,
  alternateLinks,
  breadcrumbJsonLd,
  canonicalUrl,
  formatTitle,
  trimSlash,
} from './seo'

describe('seo helpers', () => {
  it('formats titles', () => {
    expect(formatTitle('Services')).toBe('Services | DuckHats')
    expect(formatTitle('Tagline', true)).toBe('DuckHats | Tagline')
  })

  it('normalises trailing slashes', () => {
    expect(trimSlash('/ca/')).toBe('/ca')
    expect(trimSlash('/ca/services///')).toBe('/ca/services')
    expect(trimSlash('/')).toBe('/')
  })

  it('builds absolute and canonical urls without double slashes', () => {
    expect(absoluteUrl('/og.png', 'https://a.test')).toBe('https://a.test/og.png')
    expect(absoluteUrl('https://cdn.test/x.png', 'https://a.test')).toBe('https://cdn.test/x.png')
    expect(canonicalUrl('/en/team/', 'https://a.test')).toBe('https://a.test/en/team')
  })

  it('returns one alternate per language plus x-default pointing to Catalan', () => {
    const links = alternateLinks('/es/proyectos/x', 'https://a.test')
    expect(links.map((l) => l.hrefLang)).toEqual(['ca', 'es', 'en', 'x-default'])
    expect(links.at(-1)!.href).toBe('https://a.test/ca/projectes/x')
    expect(links[2]!.href).toBe('https://a.test/en/projects/x')
  })

  it('builds a numbered breadcrumb list', () => {
    const json = breadcrumbJsonLd(
      [
        { name: 'A', path: '/a' },
        { name: 'B', path: '/a/b' },
      ],
      'https://a.test',
    )
    expect(json.itemListElement.map((i) => i.position)).toEqual([1, 2])
    expect(json.itemListElement[1]!.item).toBe('https://a.test/a/b')
  })
})
