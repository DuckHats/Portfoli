import { describe, expect, it } from 'vitest'
import { LANGUAGES } from '../src/lib/languages'
import { ROUTES } from '../src/lib/routes'
import { projects } from '../src/content/projects'
import { buildPages, renderShell } from '../scripts/lib/shells'
import { renderRobots, renderSecurityTxt, renderSitemap } from '../scripts/lib/sitemap'

const BASE = 'https://example.test'

const template = `<!doctype html>
<html lang="ca">
  <head>
    <title>Default</title>
    <meta name="description" content="Default description" data-rh="true" />
    <meta property="og:title" content="Default" data-rh="true" />
    <meta name="twitter:site" content="@x" />
    <script type="application/ld+json">{"@type":"Organization"}</script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`

const pages = buildPages()

describe('buildPages', () => {
  it('covers every route and project in every language', () => {
    expect(pages).toHaveLength(LANGUAGES.length * (ROUTES.length + projects.length))
  })

  it('has unique paths and output files', () => {
    expect(new Set(pages.map((p) => p.pathname)).size).toBe(pages.length)
    expect(new Set(pages.map((p) => p.file)).size).toBe(pages.length)
  })

  it('keeps titles and descriptions within search-result limits', () => {
    for (const page of pages) {
      expect(page.title.length, page.pathname).toBeLessThanOrEqual(50)
      expect(page.description.length, page.pathname).toBeGreaterThanOrEqual(50)
      expect(page.description.length, page.pathname).toBeLessThanOrEqual(200)
    }
  })

  it('does not reuse a description inside one language', () => {
    for (const language of LANGUAGES) {
      const list = pages.filter((p) => p.language === language).map((p) => p.description)
      expect(new Set(list).size, language).toBe(list.length)
    }
  })
})

describe('renderShell', () => {
  const page = pages.find((p) => p.pathname === '/en/services')!
  const html = renderShell(template, page, BASE)

  it('sets the language and a single, correct title', () => {
    expect(html).toContain('<html lang="en">')
    expect(html.match(/<title/g)).toHaveLength(1)
    expect(html).toContain('<title data-rh="true">Services | DuckHats</title>')
  })

  it('drops the template defaults so nothing is duplicated', () => {
    expect(html).not.toContain('Default')
    expect(html.match(/property="og:title"/g)).toHaveLength(1)
    expect(html.match(/name="description"/g)).toHaveLength(1)
  })

  it('keeps tags helmet does not manage, such as the organisation JSON-LD', () => {
    expect(html).toContain('"@type":"Organization"')
    expect(html).toContain('name="twitter:site"')
  })

  it('writes canonical, every hreflang and absolute og:image', () => {
    expect(html).toContain(`<link rel="canonical" href="${BASE}/en/services" data-rh="true" />`)
    for (const code of [...LANGUAGES, 'x-default']) expect(html).toContain(`hreflang="${code}"`)
    expect(html).toContain(`href="${BASE}/ca/services"`)
    expect(html).toContain(`content="${BASE}/og-cover.png"`)
  })

  it('marks every injected tag as helmet-managed', () => {
    const head = html.slice(html.indexOf('</title>'), html.indexOf('</head>'))
    const tags = head.match(/<(meta|link|script)\b[^>]*>/g) ?? []
    const unmanaged = tags.filter((t) => !t.includes('data-rh="true"'))
    expect(
      unmanaged.every((t) => t.includes('twitter:site') || t.includes('application/ld+json')),
    ).toBe(true)
  })

  it('escapes quotes and angle brackets in text', () => {
    const tricky = { ...page, title: 'A "quoted" <title>', description: 'x "y" <z> & w' }
    const out = renderShell(template, tricky, BASE)
    expect(out).toContain('A &quot;quoted&quot; &lt;title&gt; | DuckHats')
    expect(out).toContain('content="x &quot;y&quot; &lt;z&gt; &amp; w"')
  })

  it('emits parseable JSON-LD with the real base URL', () => {
    const home = pages.find((p) => p.pathname === '/ca')!
    const out = renderShell(template, home, BASE)
    const blocks = [
      ...out.matchAll(/<script type="application\/ld\+json" data-rh="true">(.*?)<\/script>/g),
    ]
    expect(blocks).toHaveLength(1)
    const json = JSON.parse(blocks[0]![1]!)
    expect(json['@type']).toBe('WebSite')
    expect(json.url).toBe(`${BASE}/ca`)
    expect(out).not.toContain('%BASE%')
  })

  it('adds a project breadcrumb to project pages', () => {
    const project = pages.find((p) => p.pathname === '/es/projects/menu-ginebro')!
    const out = renderShell(template, project, BASE)
    expect(out).toContain('"BreadcrumbList"')
    expect(out).toContain(`${BASE}/es/projects/menu-ginebro`)
  })

  it('includes a noscript fallback', () => {
    expect(html).toMatch(/<noscript><h1>Services \| DuckHats<\/h1><p>.+<\/p><\/noscript>/)
  })
})

describe('sitemap', () => {
  const { xml, count } = renderSitemap(BASE, '2026-01-01')
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]!)

  it('lists exactly the prerendered pages, once each', () => {
    expect(count).toBe(pages.length)
    expect(locs.sort()).toEqual(pages.map((p) => `${BASE}${p.pathname}`).sort())
  })

  it('is well-formed XML', () => {
    const doc = new DOMParser().parseFromString(xml, 'application/xml')
    expect(doc.querySelector('parsererror')).toBeNull()
    expect(doc.documentElement.tagName).toBe('urlset')
  })

  it('gives every url reciprocal hreflang alternates plus x-default', () => {
    const doc = new DOMParser().parseFromString(xml, 'application/xml')
    for (const url of Array.from(doc.getElementsByTagName('url'))) {
      const alternates = Array.from(url.getElementsByTagName('xhtml:link')).map((l) =>
        l.getAttribute('hreflang'),
      )
      expect(alternates.sort()).toEqual(['ca', 'en', 'es', 'x-default'])
    }
  })

  it('uses absolute https urls and a valid lastmod', () => {
    expect(locs.every((l) => l.startsWith(BASE))).toBe(true)
    expect(xml.match(/<lastmod>2026-01-01<\/lastmod>/g)).toHaveLength(count)
  })

  it('has priorities between 0 and 1', () => {
    const values = [...xml.matchAll(/<priority>(.*?)<\/priority>/g)].map((m) => Number(m[1]))
    expect(values.every((v) => v >= 0 && v <= 1)).toBe(true)
  })
})

describe('robots and security.txt', () => {
  it('blocks the API and points at the sitemap', () => {
    const robots = renderRobots(BASE)
    expect(robots).toContain('Disallow: /api/')
    expect(robots).toContain(`Sitemap: ${BASE}/sitemap.xml`)
    expect(robots).not.toMatch(/Disallow:\s*\/\s*$/m)
  })

  it('expires one year after the build date', () => {
    const txt = renderSecurityTxt(BASE, 'sec@example.test', new Date('2026-10-28T08:00:00Z'))
    expect(txt).toContain('Contact: mailto:sec@example.test')
    expect(txt).toContain('Expires: 2027-10-28T08:00:00Z')
    expect(txt).toContain(`Canonical: ${BASE}/.well-known/security.txt`)
  })
})
