/**
 * Image pipeline. Run with `pnpm images`.
 *  - Converts every JPG/PNG under public/projects and public/team to WebP (originals removed).
 *  - Generates the brand assets (transparent logo mark, favicon, touch/manifest icons, OG cover)
 *    from brand-src/logo-source.png.
 * Idempotent: with no originals left, only the brand assets are regenerated.
 */
import { readdir, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const PUBLIC = path.resolve('public')
const LOGO_SOURCE = path.resolve('brand-src/logo-source.png')
const MAX_WIDTH: Record<string, number> = { projects: 1600, team: 640 }
const PAPER = '#FAFAF9'
const INK = '#0F1115'

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])),
  )
  return nested.flat()
}

async function convertPhotos() {
  for (const group of Object.keys(MAX_WIDTH)) {
    const files = (await walk(path.join(PUBLIC, group))).filter((f) => /\.(jpe?g|png)$/i.test(f))
    for (const file of files) {
      const out = file.replace(/\.(jpe?g|png)$/i, '.webp')
      const before = (await stat(file)).size
      await sharp(file)
        .resize({ width: MAX_WIDTH[group], withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(out)
      await rm(file)
      const after = (await stat(out)).size
      console.log(
        `${path.relative(PUBLIC, file)} -> webp  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
      )
    }
  }
}

/** Black logo on white -> black logo with alpha (luminance becomes opacity). */
async function logoMark(size: number, color: 'black' | 'white' = 'black') {
  const alpha = await sharp(LOGO_SOURCE)
    .resize(size, size)
    .greyscale()
    .normalise()
    .negate()
    // drop the near-white background noise of the source so only the mark keeps opacity
    .linear(1.15, -30)
    .raw()
    .toBuffer()
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: color === 'black' ? '#000' : '#fff',
    },
  })
    .joinChannel(alpha, { raw: { width: size, height: size, channels: 1 } })
    .png()
    .toBuffer()
}

async function brandAssets() {
  await sharp(await logoMark(256)).toFile(path.join(PUBLIC, 'brand/logo-mark.png'))
  await sharp(await logoMark(32)).toFile(path.join(PUBLIC, 'favicon-32.png'))

  /** Logo mark centred on the paper colour, with 14% padding on every side. */
  const paperIcon = async (size: number) => {
    const pad = Math.round(size * 0.14)
    return sharp(await logoMark(size - pad * 2))
      .extend({ top: pad, bottom: pad, left: pad, right: pad, background: PAPER })
      .flatten({ background: PAPER })
      .png()
      .toBuffer()
  }
  await sharp(await paperIcon(180)).toFile(path.join(PUBLIC, 'apple-touch-icon.png'))
  await sharp(await paperIcon(192)).toFile(path.join(PUBLIC, 'icon-192.png'))
  await sharp(await paperIcon(512)).toFile(path.join(PUBLIC, 'icon-512.png'))

  const text = Buffer.from(
    `<svg width="640" height="300" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="110" font-family="Inter, Helvetica, Arial, sans-serif" font-size="96" font-weight="700" fill="#FAFAF9">DuckHats</text>
      <text x="0" y="170" font-family="Inter, Helvetica, Arial, sans-serif" font-size="34" fill="#9AA0AA">Software and digital services</text>
      <text x="0" y="214" font-family="Inter, Helvetica, Arial, sans-serif" font-size="34" fill="#9AA0AA">for businesses</text>
    </svg>`,
  )
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: INK } })
    .composite([
      { input: await logoMark(300, 'white'), left: 130, top: 165 },
      { input: text, left: 500, top: 200 },
    ])
    .png()
    .toFile(path.join(PUBLIC, 'og-cover.png'))
  console.log('brand assets regenerated')
}

await convertPhotos()
await brandAssets()
