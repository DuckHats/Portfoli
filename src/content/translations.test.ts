import { describe, expect, it } from 'vitest'
import { projects } from './projects'
import { serviceCategories } from './services'
import { teamMembers } from './team'
import { messages } from './messages'
import { LANGUAGES } from '@/lib/languages'
import { CAREER_ROLES } from '@/lib/schemas'

type Json = string | Json[] | { [key: string]: Json }

/** Every leaf path, with array indices, e.g. `home.services.items.0.title`. */
function collectPaths(node: Json, prefix = ''): string[] {
  if (typeof node === 'string') return [prefix]
  const entries = Array.isArray(node)
    ? node.map((v, i) => [String(i), v] as const)
    : Object.entries(node)
  return entries.flatMap(([key, value]) => collectPaths(value, prefix ? `${prefix}.${key}` : key))
}

const leaves = (node: Json): string[] => {
  if (typeof node === 'string') return [node]
  return (Array.isArray(node) ? node : Object.values(node)).flatMap(leaves)
}

const placeholders = (text: string) => (text.match(/\{\w+\}/g) ?? []).sort().join(',')

describe('locales', () => {
  const [source, ...others] = LANGUAGES
  const reference = collectPaths(messages[source] as unknown as Json)

  it.each(others)('%s has exactly the same keys as %s', (language) => {
    expect(collectPaths(messages[language] as unknown as Json)).toEqual(reference)
  })

  it('has no empty strings', () => {
    for (const language of LANGUAGES) {
      expect(leaves(messages[language] as unknown as Json).filter((s) => s.trim() === '')).toEqual(
        [],
      )
    }
  })

  it('keeps {placeholders} identical across languages', () => {
    const flat = (language: (typeof LANGUAGES)[number]) =>
      leaves(messages[language] as unknown as Json)
    const base = flat('ca').map(placeholders)
    for (const language of others) expect(flat(language).map(placeholders)).toEqual(base)
  })

  it('keeps headlines free of emphasis markers', () => {
    for (const language of LANGUAGES) {
      expect(leaves(messages[language] as unknown as Json).filter((s) => s.includes('*'))).toEqual(
        [],
      )
    }
  })

  it('translates every career role used by the form schema', () => {
    for (const language of LANGUAGES) {
      expect(Object.keys(messages[language].careers.form.roles).sort()).toEqual(
        [...CAREER_ROLES].sort(),
      )
    }
  })

  it('does not bring back the retired playful brand voice', () => {
    const banned =
      /\b(estany|bandada|somiadors?|protoenginyers?|cfgs|ànecs?|pond|flock|dreamers?|soñadores?|estanque)\b/i
    const all = [
      ...LANGUAGES.flatMap((l) => leaves(messages[l] as unknown as Json)),
      ...leaves(JSON.parse(JSON.stringify(projects)) as Json),
      ...leaves(JSON.parse(JSON.stringify(serviceCategories)) as Json),
    ]
    expect(all.filter((s) => banned.test(s))).toEqual([])
  })
})

describe('seo copy', () => {
  it.each(LANGUAGES)('keeps %s titles and descriptions search-friendly and unique', (language) => {
    const entries = Object.entries(messages[language].seo)
    for (const [key, { title, description }] of entries) {
      expect(title.length, `${language}.${key} title`).toBeLessThanOrEqual(50)
      expect(description.length, `${language}.${key} description`).toBeGreaterThanOrEqual(30)
      expect(description.length, `${language}.${key} description`).toBeLessThanOrEqual(170)
    }
    expect(new Set(entries.map(([, v]) => v.title)).size).toBe(entries.length)
    expect(new Set(entries.map(([, v]) => v.description)).size).toBe(entries.length)
  })
})

describe('structured content', () => {
  const hasAllLanguages = (value: unknown) =>
    LANGUAGES.every((l) => {
      const v = (value as Record<string, unknown>)[l]
      return Array.isArray(v) ? v.length > 0 : typeof v === 'string' && v.trim() !== ''
    })

  it('localises every project field', () => {
    for (const p of projects) {
      for (const field of [
        'status',
        'category',
        'summary',
        'challenge',
        'solution',
        'results',
      ] as const) {
        expect(hasAllLanguages(p[field]), `${p.id}.${field}`).toBe(true)
      }
      expect(p.gallery.length).toBeGreaterThan(0)
    }
  })

  it('uses unique project ids', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length)
  })

  it('localises team roles and services', () => {
    for (const m of teamMembers) expect(hasAllLanguages(m.role), m.id).toBe(true)
    for (const c of serviceCategories) {
      expect(hasAllLanguages(c.title), c.id).toBe(true)
      for (const item of c.items) {
        expect(hasAllLanguages(item.name), item.id).toBe(true)
        if (item.description) expect(hasAllLanguages(item.description), item.id).toBe(true)
        for (const tier of item.tiers ?? []) expect(hasAllLanguages(tier.name), item.id).toBe(true)
      }
    }
  })
})
