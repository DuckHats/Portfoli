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
