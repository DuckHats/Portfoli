import type { Page } from '@playwright/test'

/**
 * Headline typesetting problems on the current page: a word of a heading (or display text) set over
 * two lines or sticking out of the heading's box, or the page scrolling sideways. Decorative copies
 * (aria-hidden) and screen-reader-only text are skipped.
 */
export function brokenText(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const issues: string[] = []
    const root = document.documentElement
    if (root.scrollWidth > window.innerWidth + 1) {
      issues.push(`page scrolls sideways (${root.scrollWidth}px)`)
    }

    for (const el of document.querySelectorAll<HTMLElement>('h1, h2, h3, .font-display')) {
      if (el.closest('[aria-hidden="true"], .sr-only') || el.getClientRects().length === 0) continue
      const box = el.getBoundingClientRect()
      const name = `${el.tagName.toLowerCase()} "${(el.textContent ?? '').trim().slice(0, 40)}"`
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (node.parentElement?.closest('.sr-only, [aria-hidden="true"]')) continue
        for (const match of (node.textContent ?? '').matchAll(/\S+/g)) {
          const range = document.createRange()
          range.setStart(node, match.index)
          range.setEnd(node, match.index + match[0].length)
          const rects = [...range.getClientRects()].filter((r) => r.width > 0)
          if (new Set(rects.map((r) => Math.round(r.top))).size > 1) {
            issues.push(`${name}: "${match[0]}" is split over lines`)
          } else if (rects.some((r) => r.right > box.right + 2 || r.left < box.left - 2)) {
            issues.push(`${name}: "${match[0]}" sticks out of the heading`)
          }
        }
      }
    }
    return issues
  })
}
