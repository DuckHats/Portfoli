// Pure SEO helpers shared by the <SEO> component (browser) and the build-time shells/sitemap (Node).
import { SITE } from '@/config/site'
import type { Language } from './languages'
import { LANGUAGES } from './languages'
import { buildPath, switchLanguagePath } from './routes'

export const formatTitle = (title: string, home = false) =>
  home ? `${SITE.name} | ${title}` : `${title} | ${SITE.name}`

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

export const websiteJsonLd = (language: Language, base: string = SITE.url) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: absoluteUrl(buildPath(language, 'home'), base),
  inLanguage: language,
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
