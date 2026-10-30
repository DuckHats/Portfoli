import type { Page } from '@playwright/test'

/**
 * Resolves once nothing inside `selector` is still fading or sliding in. axe reads colours as
 * painted, so a half-transparent element reads as a contrast failure on a slow machine.
 */
export async function settled(page: Page, selector: string) {
  await page.waitForFunction(
    async (root) => {
      const snapshot = () =>
        [...document.querySelectorAll(`${root}, ${root} *`)]
          .map((el) => {
            const style = getComputedStyle(el)
            return `${style.opacity}|${style.transform}`
          })
          .join(',')
      const before = snapshot()
      await new Promise((resolve) => setTimeout(resolve, 150))
      return before === snapshot()
    },
    selector,
    { timeout: 10_000 },
  )
}
