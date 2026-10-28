import type { Language } from './languages'
import { LANGUAGES } from './languages'

/** Every public page. Router, navigation, sitemap and tests all derive from this list. */
export const ROUTES = [
  { key: 'home', path: '' },
  { key: 'services', path: 'services' },
  { key: 'projects', path: 'projects' },
  { key: 'team', path: 'team' },
  { key: 'about', path: 'about' },
  { key: 'contact', path: 'contact' },
  { key: 'careers', path: 'careers' },
  { key: 'privacy', path: 'privacy' },
  { key: 'legal', path: 'legal' },
] as const

export type RouteKey = (typeof ROUTES)[number]['key']

const PATHS = Object.fromEntries(ROUTES.map((r) => [r.key, r.path])) as Record<RouteKey, string>

export function buildPath(language: Language, key: RouteKey, param?: string): string {
  const segments = [language, PATHS[key], param].filter(Boolean)
  return `/${segments.join('/')}`
}

export const projectPath = (language: Language, projectId: string) =>
  buildPath(language, 'projects', projectId)

/** Old, language-less URLs that may still be indexed or bookmarked. */
const LEGACY_SEGMENTS: Record<string, string> = { 'join-us': 'careers' }

export function legacyPath(language: Language, pathname: string): string {
  const [first = '', ...rest] = pathname.split('/').filter(Boolean)
  const mapped = LEGACY_SEGMENTS[first] ?? first
  return `/${[language, mapped, ...rest].filter(Boolean).join('/')}`
}

/** Swap the language segment of the current pathname, keeping the rest. */
export function switchLanguagePath(pathname: string, target: Language): string {
  const [first = '', ...rest] = pathname.split('/').filter(Boolean)
  const tail = (LANGUAGES as readonly string[]).includes(first) ? rest : [first, ...rest]
  return `/${[target, ...tail].filter(Boolean).join('/')}`
}
