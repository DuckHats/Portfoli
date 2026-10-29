import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const first = (page: Page) => page.getByRole('group', { name: 'Project screenshots' }).first()

test.describe('project showcase carousel', () => {
  test.beforeEach(({ isMobile }) => test.skip(isMobile, 'desktop only'))

  test('can be driven with the keyboard', async ({ page }) => {
    await page.goto('/en')
    const carousel = first(page)
    await carousel.scrollIntoViewIfNeeded()
    await carousel.getByRole('button', { name: 'Next screenshot' }).focus()
    await page.keyboard.press('Enter')
    await expect(carousel.getByRole('button', { name: 'Show screenshot 2' })).toHaveAttribute(
      'aria-current',
      'true',
    )
    await carousel.getByRole('button', { name: 'Previous screenshot' }).focus()
    await page.keyboard.press('Enter')
    await expect(carousel.getByRole('button', { name: 'Show screenshot 1' })).toHaveAttribute(
      'aria-current',
      'true',
    )
  })

  test('stays still for visitors who prefer reduced motion', async ({ page }) => {
    await page.goto('/en')
    const carousel = first(page)
    await carousel.scrollIntoViewIfNeeded()
    await page.waitForTimeout(5000)
    await expect(carousel.getByRole('button', { name: 'Show screenshot 1' })).toHaveAttribute(
      'aria-current',
      'true',
    )
  })

  test('advances on its own and pauses while hovered', async ({ browser }) => {
    const context = await browser.newContext({
      reducedMotion: 'no-preference',
      viewport: { width: 1280, height: 900 },
    })
    const page = await context.newPage()
    await page.goto('/en')
    const carousel = first(page)
    await carousel.scrollIntoViewIfNeeded()
    await expect(carousel.getByRole('button', { name: 'Show screenshot 2' })).toHaveAttribute(
      'aria-current',
      'true',
      {
        timeout: 8000,
      },
    )

    await carousel.hover()
    const current = await carousel.locator('[aria-current="true"]').getAttribute('aria-label')
    await page.waitForTimeout(4500)
    expect(await carousel.locator('[aria-current="true"]').getAttribute('aria-label')).toBe(current)
    await context.close()
  })
})

test.describe('theme and layout', () => {
  test('manual theme switch drives the theme tokens', async ({ browser, isMobile }) => {
    test.skip(isMobile, 'the theme button lives in the mobile menu')
    const context = await browser.newContext({ colorScheme: 'light' })
    const page = await context.newPage()
    await page.goto('/en')
    const paper = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor)

    await expect.poll(paper).toBe('rgb(243, 239, 230)')
    await page.getByRole('button', { name: 'Switch theme' }).first().click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await expect.poll(paper).toBe('rgb(30, 29, 26)')
    await page.getByRole('button', { name: 'Switch theme' }).first().click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await expect.poll(paper).toBe('rgb(243, 239, 230)')
    await context.close()
  })

  for (const path of [
    '/ca',
    '/es/proyectos',
    '/en/projects/menu-ginebro',
    '/ca/serveis',
    '/ca/nosaltres',
  ]) {
    test(`${path} has no horizontal scroll`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      )
      expect(overflow).toBeLessThanOrEqual(0)
    })
  }
})
