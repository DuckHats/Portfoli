import { expect, test } from '@playwright/test'
import { SITE } from '../src/config/site'
import { LANGUAGES } from '../src/lib/languages'
import { alternateLinks, canonicalUrl, formatTitle } from '../src/lib/seo'
import { buildPages } from '../scripts/lib/shells'

// Head checks do not depend on the viewport; run them once.
test.beforeEach(({ isMobile }) => test.skip(isMobile, 'desktop only'))

const pages = buildPages()
const BASE = SITE.url

for (const page of pages) {
  test(`${page.pathname}: prerendered HTML has the right head without JavaScript`, async ({
    request,
  }) => {
    const response = await request.get(page.pathname)
    expect(response.status()).toBe(200)
    const html = await response.text()

    expect(html).toContain(`<html lang="${page.language}"`)
    expect(html).toContain(`>${formatTitle(page.title, page.home).replace(/&/g, '&amp;')}</title>`)
    expect(html).toContain(`rel="canonical" href="${canonicalUrl(page.pathname, BASE)}"`)
    for (const { hrefLang } of alternateLinks(page.pathname, BASE))
      expect(html).toContain(`hreflang="${hrefLang}"`)
    expect(html.match(/<title/g)).toHaveLength(1)
    expect(html.match(/property="og:title"/g)).toHaveLength(1)
    // The page's own content is in the HTML, not only an empty app shell.
    expect(html).toMatch(/<div id="root">[\s\S]*<main[\s\S]*<h1[\s\S]*<\/main>/)
  })
}

for (const page of pages.filter((p) =>
  ['/ca', '/en/services', '/es/proyectos/menu-ginebro'].includes(p.pathname),
)) {
  test(`${page.pathname}: hydrated head has no duplicate or stale tags`, async ({
    page: browser,
  }) => {
    await browser.goto(page.pathname)
    await browser.waitForLoadState('networkidle')
    const count = (selector: string) => browser.locator(selector).count()

    expect(await browser.title()).toBe(formatTitle(page.title, page.home))
    expect(await count('head title')).toBe(1)
    expect(await count('head link[rel="canonical"]')).toBe(1)
    expect(await count('head meta[name="description"]')).toBe(1)
    expect(await count('head meta[property="og:title"]')).toBe(1)
    expect(await count('head meta[property="og:image"]')).toBe(1)
    expect(await count('head link[rel="alternate"][hreflang]')).toBe(LANGUAGES.length + 1)
    expect(await count('h1')).toBe(1)
    expect(await count('head meta[name="robots"]')).toBe(1)
    expect(await count('head script[type="application/ld+json"]')).toBe(page.jsonLd.length)
    await expect(browser.locator('head link[rel="canonical"]')).toHaveAttribute(
      'href',
      canonicalUrl(page.pathname, BASE),
    )
    await expect(browser.locator('head meta[name="description"]')).toHaveAttribute(
      'content',
      page.description,
    )
  })
}

test('switching language updates the head and URL without leaving stale tags', async ({ page }) => {
  await page.goto('/ca/serveis')
  await page.getByRole('link', { name: 'English' }).first().click()
  await expect(page).toHaveURL(/\/en\/services$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect.poll(() => page.title()).toBe('Services | DuckHats')
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
    'href',
    `${BASE}/en/services`,
  )
  await expect(page.locator('head meta[property="og:locale"]')).toHaveAttribute('content', 'en_GB')
  expect(await page.locator('head meta[property="og:title"]').count()).toBe(1)
})

test('unknown URLs render the 404 page with noindex and no canonical', async ({ page }) => {
  await page.goto('/en/definitely-not-a-page')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page does not exist')
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  expect(await page.locator('head link[rel="canonical"]').count()).toBe(0)
  await page.goto('/en/projects/missing-project')
  await expect(page.locator('head meta[name="robots"]')).toHaveAttribute('content', 'noindex')
})

test.describe('sitemap, robots and static assets', () => {
  test('sitemap lists every page and each URL resolves', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]!)
    expect(locs.sort()).toEqual(pages.map((p) => `${BASE}${p.pathname}`).sort())
    for (const loc of locs) {
      const response = await request.get(new URL(loc).pathname)
      expect(response.status(), loc).toBe(200)
      expect(response.headers()['content-type'], loc).toContain('text/html')
    }
  })

  test('robots.txt references the sitemap and blocks the API only', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text()
    expect(robots).toContain(`Sitemap: ${BASE}/sitemap.xml`)
    expect(robots).toContain('Disallow: /api/')
  })

  test('security.txt is valid and not expired', async ({ request }) => {
    const response = await request.get('/.well-known/security.txt')
    // An HTML body here means the file was not deployed and the SPA fallback answered instead.
    expect(response.headers()['content-type']).toContain('text/plain')
    const txt = await response.text()
    expect(txt).toContain(`Contact: mailto:${SITE.email}`)
    const expires = /Expires: (\S+)/.exec(txt)![1]!
    expect(new Date(expires).getTime()).toBeGreaterThan(Date.now())
  })

  test('manifest, icons and social image exist', async ({ request }) => {
    const manifest = (await (await request.get('/site.webmanifest')).json()) as {
      icons: { src: string }[]
    }
    const urls = [
      ...manifest.icons.map((i) => i.src),
      '/favicon-32.png',
      '/apple-touch-icon.png',
      SITE.ogImage,
      SITE.logo,
    ]
    for (const url of urls) {
      const response = await request.get(url)
      expect(response.status(), url).toBe(200)
      expect(response.headers()['content-type'], url).toContain('image/')
    }
  })

  test('every image used by projects and team exists', async ({ request }) => {
    const { projects } = await import('../src/content/projects')
    const { teamMembers } = await import('../src/content/team')
    const urls = [
      ...projects.flatMap((p) => [p.image, ...p.gallery]),
      ...teamMembers.map((m) => m.photo),
    ]
    for (const url of new Set(urls)) expect((await request.get(url)).status(), url).toBe(200)
  })
})
