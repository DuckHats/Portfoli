import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { projects } from '../src/content/projects'
import { LANGUAGES } from '../src/lib/languages'
import { ROUTES, buildPath, projectPath } from '../src/lib/routes'

const pages = LANGUAGES.flatMap((language) => [
  ...ROUTES.map((route) => buildPath(language, route.key)),
  ...projects.map((project) => projectPath(language, project.id)),
])

/** Third-party noise we do not control. */
const IGNORED = /googletagmanager|google-analytics|favicon/i

async function collectErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error' && !IGNORED.test(message.text())) errors.push(message.text())
  })
  page.on('requestfailed', (request) => {
    if (!IGNORED.test(request.url())) errors.push(`request failed: ${request.url()}`)
  })
  return errors
}

for (const path of pages) {
  test(`${path} renders cleanly and passes axe`, async ({ page }) => {
    const errors = await collectErrors(page)
    await page.goto(path)
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('lang', path.split('/')[1]!)
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(
      results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`),
    ).toEqual([])
    expect(errors).toEqual([])
  })
}

test('dark theme passes axe', async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: 'dark' })
  const page = await context.newPage()
  for (const path of ['/ca', '/en/services', '/es/contact']) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
    expect(results.violations.map((v) => `${path} ${v.id}`)).toEqual([])
  }
  await context.close()
})

test('root and legacy URLs redirect to a language', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/(ca|es|en)$/)
  await page.goto('/join-us')
  await expect(page).toHaveURL(/\/(ca|es|en)\/careers$/)
})

test('analytics stays off until consent is given', async ({ page }) => {
  const requests: string[] = []
  page.on('request', (r) => requests.push(r.url()))
  await page.goto('/en')
  await page.getByRole('button', { name: 'Reject' }).click()
  await page.reload()
  await page.waitForLoadState('networkidle')
  expect(requests.filter((u) => u.includes('googletagmanager'))).toEqual([])
  await expect(page.getByRole('button', { name: 'Accept' })).toHaveCount(0)
})

test('mobile menu opens and closes with Escape', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only')
  await page.goto('/en')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.locator('#mobile-menu')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('#mobile-menu')).toHaveCount(0)
})

test('arrow keys move between sections of the home page', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard navigation is a desktop affordance')
  await page.goto('/ca')
  await page.locator('body').click({ position: { x: 5, y: 400 } })
  await page.keyboard.press('ArrowRight')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200)
  await page.keyboard.press('ArrowLeft')
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50)
})

test('quick search opens from the keyboard and goes to a project', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard shortcut is a desktop affordance')
  await page.goto('/en')
  await page.waitForLoadState('networkidle')
  await page.keyboard.press('Control+k')
  const dialog = page.getByRole('dialog', { name: 'Quick search' })
  await expect(dialog).toBeVisible()

  const results = await new AxeBuilder({ page })
    .include('[role="dialog"]')
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  expect(results.violations.map((v) => v.id)).toEqual([])

  await page.keyboard.type('menu')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/en\/projects\/menu-ginebro$/)
  await expect(page.locator('h1')).toContainText('Menú Ginebró')
})

test('project screenshots open full screen and close with Escape', async ({ page }) => {
  await page.goto('/en/projects/menu-ginebro')
  const thumb = page.getByRole('button', { name: 'Enlarge screenshot 2' })
  await thumb.scrollIntoViewIfNeeded()
  await thumb.click()
  const dialog = page.getByRole('dialog', { name: /Screenshot 2 of/ })
  await expect(dialog).toBeVisible()

  const results = await new AxeBuilder({ page })
    .include('[role="dialog"]')
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  expect(results.violations.map((v) => v.id)).toEqual([])

  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('dialog', { name: /Screenshot 3 of/ })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Enlarge screenshot 3' })).toBeFocused()
})
