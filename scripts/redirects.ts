/** Writes the redirects derived from ROUTES into vercel.json (see scripts/lib/redirects.ts). */
import { readFile, writeFile } from 'node:fs/promises'
import { buildRedirects } from './lib/redirects'

const config = JSON.parse(await readFile('vercel.json', 'utf8')) as Record<string, unknown>
const { headers, ...rest } = config
await writeFile(
  'vercel.json',
  `${JSON.stringify({ ...rest, redirects: buildRedirects(), headers }, null, 2)}\n`,
)
console.log(`vercel.json: ${buildRedirects().length} redirects`)
