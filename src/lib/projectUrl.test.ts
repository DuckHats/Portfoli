import { describe, expect, it } from 'vitest'
import { displayUrl, showcaseImages } from './projectUrl'

describe('displayUrl', () => {
  it('prefers the live site, without www or trailing slash', () => {
    expect(
      displayUrl({ id: 'x', link: 'https://www.example.com/', github: 'https://github.com/a/b' }),
    ).toBe('example.com')
  })

  it('falls back to the repository, then to the id', () => {
    expect(displayUrl({ id: 'x', github: 'https://github.com/a/b' })).toBe('github.com/a/b')
    expect(displayUrl({ id: 'x' })).toBe('x')
    expect(displayUrl({ id: 'x', link: 'not a url' })).toBe('x')
  })
})

describe('showcaseImages', () => {
  const project = { image: '/b.webp', gallery: ['/a.webp', '/b.webp', '/c.webp', '/d.webp'] }

  it('puts the cover first without repeating it', () => {
    expect(showcaseImages(project, 10)).toEqual(['/b.webp', '/a.webp', '/c.webp', '/d.webp'])
  })

  it('respects the maximum', () => {
    expect(showcaseImages(project, 2)).toEqual(['/b.webp', '/a.webp'])
  })
})
