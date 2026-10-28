/**
 * Writes dist/sitemap.xml and dist/robots.txt from the single route list (src/lib/routes.ts)
 * and the project catalogue. Runs after `vite build`.
 * `lastmod` is the date of the last git commit touching src/content, or today if git is unavailable.
 */
import { execFileSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { SITE } from '../src/config/site'
import { projects } from '../src/content/projects'
import { LANGUAGES } from '../src/lib/languages'
import type { RouteKey } from '../src/lib/routes'
import { ROUTES, buildPath, projectPath } from '../src/lib/routes'

const DIST = path.resolve('dist')
const base = (process.env.SITE_URL ?? SITE.url).replace(/\/$/, '')

const PRIORITY: Partial<Record<RouteKey, string>> = {
  home: '1.0',
  services: '0.9',
  projects: '0.8',
  contact: '0.8',
}
const NOINDEX: RouteKey[] = []

function lastModified(): string {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', 'src/content'], {
      encoding: 'utf8',
    }).trim()
    if (out) return out
  } catch {
    // not a git checkout (e.g. a tarball build)
  }
  return new Date().toISOString().slice(0, 10)
}

interface Entry {
  paths: Record<(typeof LANGUAGES)[number], string>
  priority: string
}

const entries: Entry[] = [
  ...ROUTES.filter((r) => !NOINDEX.includes(r.key)).map((r) => ({
    paths: Object.fromEntries(LANGUAGES.map((l) => [l, buildPath(l, r.key)])) as Entry['paths'],
    priority: PRIORITY[r.key] ?? '0.5',
  })),
  ...projects.map((p) => ({
    paths: Object.fromEntries(LANGUAGES.map((l) => [l, projectPath(l, p.id)])) as Entry['paths'],
    priority: '0.7',
  })),
]

const lastmod = lastModified()
const urls = entries.flatMap((entry) =>
  LANGUAGES.map((language) => {
    const alternates = [
      ...LANGUAGES.map(
        (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${base}${entry.paths[l]}"/>`,
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${base}${entry.paths.ca}"/>`,
    ].join('\n')
    return `  <url>
    <loc>${base}${entry.paths[language]}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${entry.priority}</priority>
${alternates}
  </url>`
  }),
)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${base}/sitemap.xml
`

await mkdir(DIST, { recursive: true })
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap)
await writeFile(path.join(DIST, 'robots.txt'), robots)
console.log(`sitemap.xml (${urls.length} urls) and robots.txt written to dist/ for ${base}`)
