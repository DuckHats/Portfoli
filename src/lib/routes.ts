import type { Language } from './languages'
import { LANGUAGES } from './languages'

/**
 * Every public page, with its URL slug in each language. Router, navigation, sitemap, redirects
 * and tests all derive from this list.
 */
export const ROUTES = [
  { key: 'home', path: { ca: '', es: '', en: '' } },
  { key: 'services', path: { ca: 'serveis', es: 'servicios', en: 'services' } },
  { key: 'projects', path: { ca: 'projectes', es: 'proyectos', en: 'projects' } },
  { key: 'about', path: { ca: 'nosaltres', es: 'nosotros', en: 'about' } },
  { key: 'contact', path: { ca: 'contacte', es: 'contacto', en: 'contact' } },
  {
    key: 'careers',
    path: { ca: 'treballa-amb-nosaltres', es: 'trabaja-con-nosotros', en: 'careers' },
  },
  { key: 'privacy', path: { ca: 'privacitat', es: 'privacidad', en: 'privacy' } },
  { key: 'legal', path: { ca: 'avis-legal', es: 'aviso-legal', en: 'legal' } },
] as const satisfies readonly { key: string; path: Record<Language, string> }[]

export type RouteKey = (typeof ROUTES)[number]['key']

const PATHS = Object.fromEntries(ROUTES.map((r) => [r.key, r.path])) as Record<
  RouteKey,
  Record<Language, string>
>

/** The slug of a page in one language (empty for the home page). */
export const routePath = (language: Language, key: RouteKey) => PATHS[key][language]

export function buildPath(language: Language, key: RouteKey, param?: string): string {
  const segments = [language, routePath(language, key), param].filter(Boolean)
  return `/${segments.join('/')}`
}

export const projectPath = (language: Language, projectId: string) =>
  buildPath(language, 'projects', projectId)

/**
 * Slugs that once pointed to a page and must keep working: the English slugs every language used
 * before URLs were localised, the old team page (now part of About) and the language-less
 * `join-us` of the first site.
 */
export const LEGACY_SLUGS: Record<string, RouteKey> = {
  ...Object.fromEntries(ROUTES.filter((r) => r.path.en).map((r) => [r.path.en, r.key])),
  team: 'about',
  'join-us': 'careers',
}

/** The page a first URL segment stands for, in any language or as a legacy slug. */
export function routeKeyFor(segment: string): RouteKey | undefined {
  const current = ROUTES.find(
    (r) => r.path.ca && (Object.values(r.path) as string[]).includes(segment),
  )
  return current?.key ?? LEGACY_SLUGS[segment]
}

/** Rebuild a path in `language`, translating the page slug and keeping anything after it. */
function translate(language: Language, segments: string[]): string {
  const [first = '', ...rest] = segments
  const key = first ? routeKeyFor(first) : 'home'
  if (!key) return `/${[language, ...segments].join('/')}`
  return `/${[language, routePath(language, key), ...rest].filter(Boolean).join('/')}`
}

/** Old, language-less URLs that may still be indexed or bookmarked. */
export const legacyPath = (language: Language, pathname: string) =>
  translate(language, pathname.split('/').filter(Boolean))

/** The same page in another language: swaps the language segment and translates the slug. */
export function switchLanguagePath(pathname: string, target: Language): string {
  const [first = '', ...rest] = pathname.split('/').filter(Boolean)
  const isPrefixed = (LANGUAGES as readonly string[]).includes(first)
  return translate(target, isPrefixed ? rest : [first, ...rest].filter(Boolean))
}
