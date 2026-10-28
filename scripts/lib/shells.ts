/**
 * Build-time HTML shells: one .html file per route and language, with the same <head> the
 * <SEO> component renders on the client. Crawlers and link previews that do not run JavaScript
 * therefore see the right title, description, canonical, hreflang and Open Graph data.
 * Every tag written here carries data-rh="true" so react-helmet-async replaces it on hydration
 * instead of duplicating it.
 */
import { SITE } from '../../src/config/site'
import { messages } from '../../src/content/messages'
import { projects } from '../../src/content/projects'
import { LANGUAGES } from '../../src/lib/languages'
import type { Language } from '../../src/lib/languages'
import { ROUTES, buildPath, projectPath } from '../../src/lib/routes'
import {
  absoluteUrl,
  alternateLinks,
  breadcrumbJsonLd,
  canonicalUrl,
  formatTitle,
  websiteJsonLd,
} from '../../src/lib/seo'

export interface PageMeta {
  language: Language
  pathname: string
  /** Output path relative to dist/, e.g. `ca/services.html`. */
  file: string
  title: string
  description: string
  image: string
  home: boolean
  jsonLd: Record<string, unknown>[]
}

// `cleanUrls: true` in vercel.json serves `ca/services.html` at `/ca/services`.
const fileFor = (pathname: string) => `${pathname.replace(/^\//, '')}.html`

export function buildPages(): PageMeta[] {
  const pages: PageMeta[] = []
  for (const language of LANGUAGES) {
    const { seo, nav } = messages[language]

    for (const route of ROUTES) {
      const pathname = buildPath(language, route.key)
      pages.push({
        language,
        pathname,
        file: fileFor(pathname),
        title: seo[route.key].title,
        description: seo[route.key].description,
        image: SITE.ogImage,
        home: route.key === 'home',
        jsonLd: route.key === 'home' ? [websiteJsonLd(language, '%BASE%')] : [],
      })
    }

    for (const project of projects) {
      const pathname = projectPath(language, project.id)
      pages.push({
        language,
        pathname,
        file: fileFor(pathname),
        title: project.title,
        description: project.summary[language],
        image: project.image,
        home: false,
        jsonLd: [
          breadcrumbJsonLd(
            [
              { name: nav.home, path: buildPath(language, 'home') },
              { name: nav.projects, path: buildPath(language, 'projects') },
              { name: project.title, path: pathname },
            ],
            '%BASE%',
          ),
        ],
      })
    }
  }
  return pages
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const jsonForScript = (value: unknown, base: string) =>
  JSON.stringify(value).replaceAll('%BASE%', base).replace(/</g, '\\u003c')

function headTags(page: PageMeta, base: string): string {
  const title = formatTitle(page.title, page.home)
  const canonical = canonicalUrl(page.pathname, base)
  const image = absoluteUrl(page.image, base)
  const t = escapeHtml(title)
  const d = escapeHtml(page.description)
  const meta = (attr: string, key: string, content: string) =>
    `<meta ${attr}="${key}" content="${content}" data-rh="true" />`

  return [
    `<title data-rh="true">${t}</title>`,
    meta('name', 'description', d),
    `<link rel="canonical" href="${escapeHtml(canonical)}" data-rh="true" />`,
    ...alternateLinks(page.pathname, base).map(
      (a) =>
        `<link rel="alternate" hreflang="${a.hrefLang}" href="${escapeHtml(a.href)}" data-rh="true" />`,
    ),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', escapeHtml(SITE.name)),
    meta('property', 'og:locale', messages[page.language].meta.ogLocale),
    ...LANGUAGES.filter((l) => l !== page.language).map((l) =>
      meta('property', 'og:locale:alternate', messages[l].meta.ogLocale),
    ),
    meta('property', 'og:title', t),
    meta('property', 'og:description', d),
    meta('property', 'og:url', escapeHtml(canonical)),
    meta('property', 'og:image', escapeHtml(image)),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', t),
    meta('name', 'twitter:description', d),
    meta('name', 'twitter:image', escapeHtml(image)),
    ...page.jsonLd.map(
      (entry) =>
        `<script type="application/ld+json" data-rh="true">${jsonForScript(entry, base)}</script>`,
    ),
  ]
    .map((line) => `    ${line}`)
    .join('\n')
}

export function renderShell(template: string, page: PageMeta, base: string): string {
  const title = escapeHtml(formatTitle(page.title, page.home))
  const stripped = template
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/[ \t]*<(?:meta|link)\b[^>]*\bdata-rh="true"[^>]*>[ \t]*\r?\n?/g, '')
    .replace(/<html lang="[^"]*"/, `<html lang="${page.language}"`)

  return stripped
    .replace('</head>', `${headTags(page, base)}\n  </head>`)
    .replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n    <noscript><h1>${title}</h1><p>${escapeHtml(page.description)}</p></noscript>`,
    )
}
