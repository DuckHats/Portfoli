/**
 * Build-time HTML shells: one .html file per route and language, with the same <head> the
 * <SEO> component renders on the client. Crawlers and link previews that do not run JavaScript
 * therefore see the right title, description, canonical, hreflang and Open Graph data.
 * Every tag written here carries data-rh="true" so react-helmet-async replaces it on hydration
 * instead of duplicating it.
 */
import { SITE } from '../../src/config/site'
import { messages } from '../../src/content/messages'
import { featuredProject, projects } from '../../src/content/projects'
import { teamMembers } from '../../src/content/team'
import { LANGUAGES } from '../../src/lib/languages'
import type { Language } from '../../src/lib/languages'
import { ROUTES, buildPath, projectPath } from '../../src/lib/routes'
import { pageJsonLd, projectJsonLd } from '../../src/lib/jsonLd'
import {
  absoluteUrl,
  alternateLinks,
  canonicalUrl,
  formatTitle,
  metaDescription,
  organizationJsonLd,
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
  /** Images worth listing in the image sitemap (project screenshots, team portraits). */
  images?: string[]
  /** Not to be indexed: no canonical or hreflang (the 404 page). */
  noindex?: boolean
}

// `cleanUrls: true` in vercel.json serves `ca/serveis.html` at `/ca/serveis`.
const fileFor = (pathname: string) => `${pathname.replace(/^\//, '')}.html`

export function buildPages(): PageMeta[] {
  const pages: PageMeta[] = []
  for (const language of LANGUAGES) {
    const { seo } = messages[language]

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
        images: route.key === 'about' ? teamMembers.map((member) => member.photo) : undefined,
        jsonLd: [
          organizationJsonLd(language, '%BASE%'),
          ...pageJsonLd(route.key, language, '%BASE%'),
        ],
      })
    }

    for (const project of projects) {
      const pathname = projectPath(language, project.id)
      pages.push({
        language,
        pathname,
        file: fileFor(pathname),
        title: project.title,
        description: metaDescription(project.summary[language]),
        image: project.image,
        home: false,
        images: [project.image, ...project.gallery],
        jsonLd: [
          organizationJsonLd(language, '%BASE%'),
          ...projectJsonLd(project, language, '%BASE%'),
        ],
      })
    }
  }
  return pages
}

/** The page Vercel serves, with a 404 status, for any URL that matches nothing. */
export const notFoundPage = (): PageMeta => ({
  language: 'ca',
  pathname: '/ca/404',
  file: '404.html',
  title: messages.ca.seo.notFound.title,
  description: messages.ca.seo.notFound.description,
  image: SITE.ogImage,
  home: false,
  jsonLd: [],
  noindex: true,
})

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
    ...(page.noindex
      ? [meta('name', 'robots', 'noindex')]
      : [
          meta('name', 'robots', 'index, follow, max-image-preview:large'),
          `<link rel="canonical" href="${escapeHtml(canonical)}" data-rh="true" />`,
          ...alternateLinks(page.pathname, base).map(
            (a) =>
              `<link rel="alternate" hreflang="${a.hrefLang}" href="${escapeHtml(a.href)}" data-rh="true" />`,
          ),
        ]),
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
    meta('property', 'og:image:alt', t),
    ...(page.image === SITE.ogImage
      ? [
          meta('property', 'og:image:width', String(SITE.ogImageSize.width)),
          meta('property', 'og:image:height', String(SITE.ogImageSize.height)),
        ]
      : []),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', t),
    meta('name', 'twitter:description', d),
    meta('name', 'twitter:image', escapeHtml(image)),
    meta('name', 'twitter:image:alt', t),
    ...page.jsonLd.map(
      (entry) =>
        `<script type="application/ld+json" data-rh="true">${jsonForScript(entry, base)}</script>`,
    ),
  ]
    .map((line) => `    ${line}`)
    .join('\n')
}

/** The page's HTML: its own <head> tags and, when given, its prerendered body (`body`). */
export function renderShell(template: string, page: PageMeta, base: string, body = ''): string {
  const stripped = template
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/[ \t]*<(?:meta|link)\b[^>]*\bdata-rh="true"[^>]*>[ \t]*\r?\n?/g, '')
    .replace(/<html lang="[^"]*"/, `<html lang="${page.language}"`)

  // The home hero screenshot is the LCP element; start fetching it before the script runs.
  const heroPreload =
    page.home && featuredProject
      ? `\n    <link rel="preload" as="image" href="${featuredProject.image}" fetchpriority="high" />`
      : ''
  return stripped
    .replace('</head>', `${headTags(page, base)}${heroPreload}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}
