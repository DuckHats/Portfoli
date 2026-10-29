// Pure SEO helpers shared by the <SEO> component (browser) and the build-time shells/sitemap (Node).
import { SITE } from '@/config/site'
import type { Language } from './languages'
import { messages } from '@/content/messages'
import { LANGUAGES } from './languages'
import { buildPath, switchLanguagePath } from './routes'

export const formatTitle = (title: string, home = false) =>
  home ? `${SITE.name} | ${title}` : `${title} | ${SITE.name}`

/**
 * A description for search results: whole words up to ~155 characters, so it is never cut
 * mid-word by the search engine. Longer copy (e.g. a project summary) ends with an ellipsis.
 */
export function metaDescription(text: string, max = 155): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '')}…`
}

export const trimSlash = (pathname: string) => pathname.replace(/\/+$/, '') || '/'

export const absoluteUrl = (path: string, base: string = SITE.url) =>
  /^https?:\/\//.test(path) ? path : `${base}${path}`

export const canonicalUrl = (pathname: string, base: string = SITE.url) =>
  absoluteUrl(trimSlash(pathname), base)

export interface AlternateLink {
  hrefLang: string
  href: string
}

/** hreflang alternates for the same page in every language, plus x-default (Catalan). */
export function alternateLinks(pathname: string, base: string = SITE.url): AlternateLink[] {
  return [
    ...LANGUAGES.map((code) => ({
      hrefLang: code,
      href: absoluteUrl(switchLanguagePath(trimSlash(pathname), code), base),
    })),
    {
      hrefLang: 'x-default',
      href: absoluteUrl(switchLanguagePath(trimSlash(pathname), 'ca'), base),
    },
  ]
}

/** Stable id of the organisation node, so every page's JSON-LD points at the same entity. */
export const organizationId = (base: string = SITE.url) => `${base}/#organization`

/**
 * The studio as an Organization, on every page. What it does comes from the kinds of project the
 * brief offers; no address or phone until there is a real one (see SITE).
 */
export const organizationJsonLd = (language: Language, base: string = SITE.url) => {
  const { seo, contact } = messages[language]
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId(base),
    name: SITE.name,
    url: absoluteUrl(buildPath(language, 'home'), base),
    logo: absoluteUrl(SITE.logo, base),
    image: absoluteUrl(SITE.ogImage, base),
    description: seo.home.description,
    email: SITE.email,
    foundingDate: String(SITE.foundedYear),
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Catalunya' },
      { '@type': 'Country', name: 'España' },
    ],
    knowsLanguage: [...LANGUAGES],
    knowsAbout: Object.entries(contact.form.projectTypes)
      .filter(([id]) => id !== 'other')
      .map(([, kind]) => kind.label),
    sameAs: Object.values(SITE.social),
  }
}

export const websiteJsonLd = (language: Language, base: string = SITE.url) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${base}/#website`,
  name: SITE.name,
  url: absoluteUrl(buildPath(language, 'home'), base),
  inLanguage: language,
  publisher: { '@id': organizationId(base) },
})

export const breadcrumbJsonLd = (
  items: { name: string; path: string }[],
  base: string = SITE.url,
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path, base),
  })),
})
