/** Fails when the entry chunk or the lazy motion features chunk grows past its gzip budget. Run after `vite build`. */
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

const BUDGETS_KB: [RegExp, number][] = [
  [/^index-.*\.js$/, 60],
  [/^features-.*\.js$/, 35],
]
const dir = path.resolve('dist/assets')
const assets = await readdir(dir)
if (!assets.some((f) => BUDGETS_KB[0]![0].test(f)))
  throw new Error('No entry chunk found in dist/assets: run `pnpm build` first')

let failed = false
for (const [pattern, budget] of BUDGETS_KB) {
  for (const file of assets.filter((f) => pattern.test(f))) {
    const kb = gzipSync(await readFile(path.join(dir, file))).length / 1024
    const ok = kb <= budget
    failed ||= !ok
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${file}: ${kb.toFixed(1)} KB gzip (budget ${budget} KB)`)
  }
}
process.exit(failed ? 1 : 0)
