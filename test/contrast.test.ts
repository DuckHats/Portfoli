import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/index.css', 'utf8')

type Rgb = [number, number, number]
type Tokens = Record<string, Rgb>

/** Reads `--color-*: r g b;` declarations from the first CSS block that follows `selector`. */
function tokens(selector: string): Tokens {
  const start = css.indexOf(selector)
  expect(start, `${selector} not found`).toBeGreaterThanOrEqual(0)
  const block = css.slice(start, css.indexOf('}', start))
  const out: Tokens = {}
  for (const [, name, r, g, b] of block.matchAll(/--color-([\w-]+):\s*(\d+) (\d+) (\d+);/g)) {
    out[name!] = [Number(r), Number(g), Number(b)]
  }
  return out
}

const channel = (v: number) => {
  const s = v / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}
const luminance = ([r, g, b]: Rgb) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
const ratio = (a: Rgb, b: Rgb) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

const themes = {
  light: tokens(':root {'),
  dark: tokens(":root[data-theme='dark'] {"),
}

describe.each(Object.entries(themes))('%s theme contrast (WCAG AA)', (_, t) => {
  const backgrounds = ['canvas', 'surface', 'tint'] as const

  it.each(backgrounds)('ink, muted and accent text are readable on %s', (bg) => {
    for (const fg of ['ink', 'muted', 'accent'] as const) {
      expect(ratio(t[fg]!, t[bg]!), `${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('text on the accent colour is readable', () => {
    expect(ratio(t['on-accent']!, t.accent!)).toBeGreaterThanOrEqual(4.5)
  })

  it('ink is readable on the soft accent block', () => {
    expect(ratio(t.ink!, t['accent-soft']!)).toBeGreaterThanOrEqual(4.5)
  })
})

describe('theme definitions', () => {
  it('declare the same tokens in light and dark', () => {
    expect(Object.keys(themes.dark).sort()).toEqual(Object.keys(themes.light).sort())
  })

  it('keep the system-preference dark theme identical to the manual one', () => {
    const media = tokens(":root:not([data-theme='light']) {")
    expect(media).toEqual(themes.dark)
  })
})
