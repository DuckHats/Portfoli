/**
 * Server-side redirects for vercel.json, derived from ROUTES so they can never drift from the
 * router: every old or foreign slug under a language prefix and every language-less legacy URL
 * goes permanently (301/308) to its current localised URL; the bare root goes temporarily to the
 * visitor's language. `pnpm redirects` writes them; test/vercel.test.ts checks they are current.
 */
import { LANGUAGES } from '../../src/lib/languages'
import { LEGACY_SLUGS, ROUTES, buildPath, routePath } from '../../src/lib/routes'
import type { RouteKey } from '../../src/lib/routes'

export interface Redirect {
  source: string
  destination: string
  permanent: boolean
  has?: { type: 'header'; key: string; value: string }[]
}

/** Every slug a page has ever had, in any language. */
function slugsFor(key: RouteKey): string[] {
  const route = ROUTES.find((r) => r.key === key)!
  const legacy = Object.entries(LEGACY_SLUGS)
    .filter(([, target]) => target === key)
    .map(([slug]) => slug)
  return [...new Set([...Object.values(route.path), ...legacy])].filter(Boolean)
}

/** One URL segment that is not a file name (no dot), as a Vercel path pattern. */
const PAGE_SEGMENT = ':rest([^./]+)'

export function buildRedirects(): Redirect[] {
  const redirects: Redirect[] = []
  const keys = ROUTES.map((r) => r.key).filter((key) => key !== 'home')

  for (const language of LANGUAGES) {
    for (const key of keys) {
      const target = buildPath(language, key)
      for (const slug of slugsFor(key).filter((s) => s !== routePath(language, key))) {
        redirects.push(
          { source: `/${language}/${slug}`, destination: target, permanent: true },
          {
            source: `/${language}/${slug}/:rest*`,
            destination: `${target}/:rest*`,
            permanent: true,
          },
        )
      }
    }
  }

  // Language-less URLs from the first site go to the default (Catalan) page. Their sub-paths match
  // one segment without a dot only: /projects/<id>/<file> and /team/<photo>.webp are real files.
  for (const key of keys) {
    const target = buildPath('ca', key)
    for (const slug of slugsFor(key)) {
      redirects.push(
        { source: `/${slug}`, destination: target, permanent: true },
        { source: `/${slug}/${PAGE_SEGMENT}`, destination: `${target}/:rest`, permanent: true },
      )
    }
  }

  // The bare root follows the browser's language; Catalan (x-default) otherwise.
  for (const language of LANGUAGES.filter((l) => l !== 'ca')) {
    redirects.push({
      source: '/',
      has: [{ type: 'header', key: 'accept-language', value: `${language}.*` }],
      destination: `/${language}`,
      permanent: false,
    })
  }
  redirects.push({ source: '/', destination: '/ca', permanent: false })
  return redirects
}

/** A Vercel source pattern as a RegExp: `:rest*` is any tail, `:rest(re)` one matching segment. */
const toRegExp = (source: string) =>
  new RegExp(
    `^${source
      .replace(/[.]/g, '\\.')
      .replace('/:rest*', '(?:/(?<rest>.*))')
      .replace(':rest([^\\./]+)', '(?<rest>[^./]+)')}$`,
  )

/** The destination for a path, as Vercel would resolve it (used by the local dist server). */
export function resolveRedirect(
  pathname: string,
  acceptLanguage = '',
): { location: string; status: number } | null {
  for (const rule of buildRedirects()) {
    if (rule.has && !rule.has.every((h) => new RegExp(`^${h.value}`).test(acceptLanguage))) continue
    const match = toRegExp(rule.source).exec(pathname)
    if (!match) continue
    const rest = match.groups?.rest ?? ''
    const location = rule.destination.replace(/:rest\*?/, rest).replace(/\/$/, '')
    return { location, status: rule.permanent ? 308 : 307 }
  }
  return null
}
