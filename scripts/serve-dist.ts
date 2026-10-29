/**
 * Tiny static server that resolves URLs the way Vercel does with vercel.json: the redirects
 * (scripts/lib/redirects.ts), then with `cleanUrls: true` the exact file, `<path>.html` or
 * `<path>/index.html`, and otherwise 404.html with a real 404 status. Used by the e2e tests and
 * Lighthouse so they exercise the prerendered pages instead of Vite's own preview routing. The
 * Web Analytics script that Vercel injects is answered with an empty stand-in.
 */
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'
import { resolveRedirect } from './lib/redirects'

const DIST = path.resolve('dist')
const PORT = Number(process.env.PORT ?? 4173)

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

const isFile = async (file: string) => (await stat(file).catch(() => null))?.isFile() ?? false

async function resolve(urlPath: string): Promise<string | null> {
  const clean = path.posix.normalize(decodeURIComponent(urlPath)).replace(/\/+$/, '') || '/'
  if (clean.includes('..')) return null
  const base = path.join(DIST, clean)
  for (const candidate of [base, `${base}.html`, path.join(base, 'index.html')]) {
    if (candidate.startsWith(DIST) && (await isFile(candidate))) return candidate
  }
  return null
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://x')
  // Vercel serves the Web Analytics script itself; locally a silent stand-in keeps pages error-free.
  if (url.pathname.startsWith('/_vercel/insights/')) {
    res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' }).end('')
    return
  }
  const redirect = resolveRedirect(url.pathname, req.headers['accept-language'] ?? '')
  if (redirect) {
    res.writeHead(redirect.status, { Location: `${redirect.location}${url.search}` }).end()
    return
  }
  const found = await resolve(url.pathname)
  const file = found ?? path.join(DIST, '404.html')
  if (!found && !(await isFile(file))) {
    res.writeHead(404).end('Not found')
    return
  }
  res.writeHead(found ? 200 : 404, {
    'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream',
    'Cache-Control': 'no-cache',
  })
  createReadStream(file).pipe(res)
}).listen(PORT, () => console.log(`Serving dist/ on http://localhost:${PORT}`))
