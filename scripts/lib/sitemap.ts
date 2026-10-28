import { alternateLinks, canonicalUrl } from '../../src/lib/seo'
import { ROUTES } from '../../src/lib/routes'
import type { RouteKey } from '../../src/lib/routes'
import { buildPages } from './shells'

const PRIORITY: Partial<Record<RouteKey, string>> = {
  home: '1.0',
  services: '0.9',
  projects: '0.8',
  contact: '0.8',
  privacy: '0.2',
  legal: '0.2',
}

const priorityFor = (pathname: string): string => {
  const [, ...segments] = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return PRIORITY.home!
  const route = ROUTES.find((r) => r.path === segments[0])
  if (segments.length > 1) return '0.7'
  return (route && PRIORITY[route.key]) ?? '0.5'
}

/** Same page set as the prerendered shells, so sitemap and HTML can never disagree. */
export function renderSitemap(base: string, lastmod: string): { xml: string; count: number } {
  const urls = buildPages().map((page) => {
    const alternates = alternateLinks(page.pathname, base)
      .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hrefLang}" href="${a.href}"/>`)
      .join('\n')
    return `  <url>
    <loc>${canonicalUrl(page.pathname, base)}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priorityFor(page.pathname)}</priority>
${alternates}
  </url>`
  })

  return {
    count: urls.length,
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`,
  }
}

export const renderRobots = (base: string) => `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${base}/sitemap.xml
`

/**
 * RFC 9116 security contact. `Expires` is regenerated on every build (one year ahead) so the
 * file never goes stale on a site that keeps being deployed.
 */
export function renderSecurityTxt(base: string, email: string, now = new Date()): string {
  const expires = new Date(now)
  expires.setUTCFullYear(expires.getUTCFullYear() + 1)
  return `Contact: mailto:${email}
Expires: ${expires.toISOString().replace(/\.\d{3}Z$/, 'Z')}
Preferred-Languages: ca, es, en
Canonical: ${base}/.well-known/security.txt
`
}
