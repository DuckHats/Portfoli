/**
 * Tiny static server that resolves URLs the way Vercel does with `cleanUrls: true` and the SPA
 * rewrite in vercel.json: exact file, then `<path>.html`, then `<path>/index.html`, then
 * index.html for anything outside /api. Used by the e2e tests and Lighthouse so they exercise
 * the prerendered shells instead of Vite's own preview routing.
 */
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'

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
  return clean.startsWith('/api/') ? null : path.join(DIST, 'index.html')
}

createServer(async (req, res) => {
  const file = await resolve(new URL(req.url ?? '/', 'http://x').pathname)
  if (!file) {
    res.writeHead(404).end('Not found')
    return
  }
  res.writeHead(200, {
    'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream',
    'Cache-Control': 'no-cache',
  })
  createReadStream(file).pipe(res)
}).listen(PORT, () => console.log(`Serving dist/ on http://localhost:${PORT}`))
