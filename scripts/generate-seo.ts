/**
 * Post-build SEO step (runs after `vite build`):
 *  - dist/<lang>/<page>.html  prerendered shells with per-page <head>
 *  - dist/sitemap.xml, dist/robots.txt and dist/.well-known/security.txt
 * `lastmod` is the date of the last git commit touching src/content, or today without git.
 */
import { execFileSync } from 'node:child_process'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { SITE } from '../src/config/site'
import { buildPages, renderShell } from './lib/shells'
import { renderRobots, renderSecurityTxt, renderSitemap } from './lib/sitemap'

const DIST = path.resolve('dist')
const base = (process.env.SITE_URL ?? SITE.url).replace(/\/$/, '')

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

/**
 * The body font is discovered late (HTML -> CSS -> font file). Preloading the Latin subset of
 * Inter, which covers ca/es/en, brings it into the first round trip and improves LCP.
 */
async function withFontPreload(html: string): Promise<string> {
  const font = (await readdir(path.join(DIST, 'assets'))).find((f) =>
    /^inter-latin-wght-normal-.*\.woff2$/.test(f),
  )
  if (!font) return html
  const tag = `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />`
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

const preloaded = await withFontPreload(await readFile(path.join(DIST, 'index.html'), 'utf8'))
await writeFile(path.join(DIST, 'index.html'), preloaded)
const template = preloaded

const pages = buildPages()
for (const page of pages) {
  const target = path.join(DIST, page.file)
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, renderShell(template, page, base))
}

const { xml, count } = renderSitemap(base, lastModified())
await writeFile(path.join(DIST, 'sitemap.xml'), xml)
await writeFile(path.join(DIST, 'robots.txt'), renderRobots(base))
await mkdir(path.join(DIST, '.well-known'), { recursive: true })
await writeFile(path.join(DIST, '.well-known/security.txt'), renderSecurityTxt(base, SITE.email))
console.log(
  `${pages.length} shells, sitemap.xml (${count} urls) and robots.txt written to dist/ for ${base}`,
)
