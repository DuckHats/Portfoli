import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { projects } from '../src/content/projects'
import { LANGUAGES } from '../src/lib/languages'
import { ROUTES, buildPath, projectPath } from '../src/lib/routes'
import { brokenText } from './lib/brokenText'

/** WCAG 2.2 AA accessibility checks on every page; the light-theme axe pass lives in smoke.spec. */
const pages = LANGUAGES.flatMap((language) => [
  ...ROUTES.map((route) => buildPath(language, route.key)),
  ...projects.map((project) => projectPath(language, project.id)),
])

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

async function axe(page: Page, include?: string) {
  const builder = new AxeBuilder({ page }).withTags(TAGS)
  const results = await (include ? builder.include(include) : builder).analyze()
  return results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`)
}

test('every page passes axe in the dark theme', async ({ browser, isMobile }) => {
  test.setTimeout(360_000)
  const context = await browser.newContext({
    colorScheme: 'dark',
    reducedMotion: 'reduce',
    ...(isMobile ? { viewport: { width: 393, height: 851 }, isMobile: true, hasTouch: true } : {}),
  })
  const page = await context.newPage()
  const violations: string[] = []
  for (const path of pages) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    violations.push(...(await axe(page)).map((v) => `${path} ${v}`))
  }
  expect(violations).toEqual([])
  await context.close()
})

test('every page has one h1, no skipped heading levels and alt text on content images', async ({
  page,
}) => {
  test.setTimeout(300_000)
  const issues: string[] = []
  for (const path of pages) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const found = await page.evaluate(() => {
      const problems: string[] = []
      const headings = [...document.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6')].filter(
        (h) => !h.closest('[aria-hidden="true"]'),
      )
      if (headings.filter((h) => h.tagName === 'H1').length !== 1)
        problems.push('not exactly one h1')
      let previous = 0
      for (const heading of headings) {
        const level = Number(heading.tagName[1])
        if (previous && level > previous + 1) {
          problems.push(`h${previous} → h${level} "${heading.textContent?.trim().slice(0, 30)}"`)
        }
        previous = level
      }
      for (const img of document.querySelectorAll('img')) {
        const decorative = img.closest('[aria-hidden="true"]') || img.getAttribute('alt') === ''
        if (!decorative && !img.getAttribute('alt')?.trim())
          problems.push(`img without alt ${img.src}`)
      }
      return problems
    })
    issues.push(...found.map((issue) => `${path}: ${issue}`))
  }
  expect(issues).toEqual([])
})

test('interactive targets are at least 24×24 px (WCAG 2.5.8)', async ({ page }) => {
  test.setTimeout(300_000)
  const issues: string[] = []
  for (const path of pages) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const small = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('a[href], button, input, select, textarea')]
        .filter((el) => {
          const box = el.getBoundingClientRect()
          if (box.width === 0 || box.height === 0) return false // hidden
          if (el.closest('.sr-only, [aria-hidden="true"]')) return false
          // Exempt: links inside a sentence, and controls whose visible box is a wrapping label.
          if (el.tagName === 'A' && el.closest('p, dd')) return false
          if (el.matches('input.sr-only, input[type="radio"], input[type="checkbox"]')) return false
          return box.width < 24 || box.height < 24
        })
        .map((el) => {
          const box = el.getBoundingClientRect()
          const name = el.getAttribute('aria-label') ?? el.textContent?.trim().slice(0, 30)
          return `${el.tagName.toLowerCase()} "${name}" ${Math.round(box.width)}×${Math.round(box.height)}`
        }),
    )
    issues.push(...small.map((issue) => `${path}: ${issue}`))
  }
  expect(issues).toEqual([])
})

test('pages reflow at 320 px without sideways scrolling or broken headline words', async ({
  browser,
}) => {
  test.setTimeout(300_000)
  const context = await browser.newContext({
    viewport: { width: 320, height: 640 },
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  const issues: string[] = []
  for (const path of pages) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    await page.evaluate(() => document.fonts.ready)
    issues.push(...(await brokenText(page)).map((issue) => `${path}: ${issue}`))
  }
  expect(issues).toEqual([])
  await context.close()
})

test('without JavaScript every page still shows its heading, content and navigation', async ({
  browser,
}) => {
  test.setTimeout(300_000)
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  for (const path of pages) {
    await page.goto(path)
    await expect(page.locator('main h1'), path).toBeVisible()
    await expect(page.locator('main'), path).not.toBeEmpty()
    expect(await page.locator('footer a[href]').count(), path).toBeGreaterThan(4)
  }
  await context.close()
})

test('the skip link is the first stop and moves focus to the main content', async ({ page }) => {
  await page.goto('/ca')
  await page.waitForLoadState('networkidle')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Salta al contingut' })
  await expect(skip).toBeFocused()
  await expect(skip).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})

test('the header can be used with the keyboard alone', async ({ page, isMobile }) => {
  test.skip(isMobile, 'the desktop header; the mobile menu has its own test')
  await page.goto('/ca')
  await page.waitForLoadState('networkidle')
  const reached = new Set<string>()
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab')
    const name = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? '')
    reached.add(name)
  }
  for (const name of ['Serveis', 'Projectes', 'Nosaltres', 'Parlem']) {
    expect([...reached], name).toContain(name)
  }
})

test('the mobile menu takes focus, passes axe and gives focus back on Escape', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'the menu only exists on small screens')
  await page.goto('/ca')
  await page.waitForLoadState('networkidle')
  const toggle = page.getByRole('button', { name: 'Obre el menú' })
  await toggle.click()
  await expect(page.locator('#mobile-menu a').first()).toBeFocused()
  expect(await axe(page, '#mobile-menu')).toEqual([])
  await page.keyboard.press('Escape')
  await expect(page.locator('#mobile-menu')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Obre el menú' })).toBeFocused()
})

test('forms stay accessible while showing errors', async ({ page }) => {
  await page.goto('/ca/contacte')
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: 'Següent' }).click()
  await expect(page.getByRole('alert').first()).toBeVisible()
  expect(await axe(page, 'form')).toEqual([])

  await page.goto('/ca/treballa-amb-nosaltres')
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: /Envia/ }).click()
  await expect(page.getByRole('alert').first()).toBeVisible()
  expect(await axe(page, 'form')).toEqual([])
  // Required fields say so to assistive technology, not only with the asterisk.
  await expect(page.getByRole('textbox', { name: /Nom/ })).toHaveAttribute('required', '')
})

test('moving content can be paused (WCAG 2.2.2)', async ({ browser, isMobile }) => {
  test.skip(isMobile, 'same controls on every screen size')
  const context = await browser.newContext({ reducedMotion: 'no-preference' })
  await context.addInitScript(() => sessionStorage.setItem('dh-intro', '1'))
  const page = await context.newPage()
  await page.goto('/en')
  await page.waitForLoadState('networkidle')

  const stop = page.getByRole('button', { name: 'Pause the animation' })
  await stop.click()
  await expect(stop).toHaveAttribute('aria-pressed', 'true')
  const band = page.locator('section[aria-label="What we do"] > div').first()
  // Its position stops (the lean from the scroll that brought it into view may still settle).
  const position = () => band.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).e)
  const before = await position()
  await page.waitForTimeout(600)
  expect(await position()).toBe(before)

  const carousel = page.getByRole('group', { name: 'Project screenshots' }).first()
  await carousel.getByRole('button', { name: 'Pause the slideshow' }).click()
  await expect(carousel.getByRole('button', { name: 'Resume the slideshow' })).toBeVisible()
  await context.close()
})
