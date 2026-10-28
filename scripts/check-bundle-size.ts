/** Fails when the entry chunk grows past its gzip budget. Run after `vite build`. */
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

const BUDGET_KB = 60
const dir = path.resolve('dist/assets')
const files = (await readdir(dir)).filter((f) => /^index-.*\.js$/.test(f))
if (files.length === 0)
  throw new Error('No entry chunk found in dist/assets: run `pnpm build` first')

let failed = false
for (const file of files) {
  const kb = gzipSync(await readFile(path.join(dir, file))).length / 1024
  const ok = kb <= BUDGET_KB
  failed ||= !ok
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${file}: ${kb.toFixed(1)} KB gzip (budget ${BUDGET_KB} KB)`)
}
process.exit(failed ? 1 : 0)
