import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { projects } from '../src/content/projects'
import { LANGUAGES } from '../src/lib/languages'
import { ROUTES, buildPath, projectPath } from '../src/lib/routes'
import { brokenText } from './lib/brokenText'

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
  // A bare context does not inherit the config's reduced motion, which also keeps the intro away.
  const context = await browser.newContext({ colorScheme: 'dark', reducedMotion: 'reduce' })
  const page = await context.newPage()
  for (const path of ['/ca', '/en/services', '/es/contacto']) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
    expect(results.violations.map((v) => `${path} ${v.id}`)).toEqual([])
  }
  await context.close()
})

test('root, legacy and old English URLs redirect, and unknown ones get a real 404', async ({
  page,
  request,
}) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/(ca|es|en)$/)
  await page.goto('/join-us')
  await expect(page).toHaveURL(/\/ca\/treballa-amb-nosaltres$/)
  await page.goto('/es/services')
  await expect(page).toHaveURL(/\/es\/servicios$/)
  await page.goto('/ca/team')
  await expect(page).toHaveURL(/\/ca\/nosaltres$/)

  const missing = await request.get('/ca/no-existeix')
  expect(missing.status()).toBe(404)
  expect(await missing.text()).toContain('noindex')
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
  // The prerendered page is visible before the script that handles the keys has run.
  await page.waitForLoadState('networkidle')
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

test('switching language keeps the page visible (no curtain left behind)', async ({
  page,
  isMobile,
}) => {
  for (const [path, spanish] of [
    ['/ca', '/es'],
    ['/ca/serveis', '/es/servicios'],
  ] as const) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    // On phones the language links live in the menu.
    if (isMobile) await page.getByRole('button', { name: 'Obre el menú' }).click()
    await page.locator('a[hreflang="es"]:visible').first().click()
    await expect(page).toHaveURL(new RegExp(`^.*${spanish}$`))
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
    await page.waitForTimeout(1200)
    const covered = await page.evaluate(() =>
      [...document.querySelectorAll('[data-curtain]')].some((node) => {
        const style = getComputedStyle(node)
        return style.display !== 'none' && new DOMMatrix(style.transform).d > 0.01
      }),
    )
    expect(covered).toBe(false)
  }
})

test('the loader plays once per session, on whichever page the visit starts, without blocking it', async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: 'no-preference' })
  const page = await context.newPage()
  await page.goto('/en/services')
  await expect(page.locator('html')).toHaveAttribute('data-intro', '')
  const intro = page.locator('#intro')
  await expect(intro).toBeVisible()
  // Styled inline in the shell, so it never shows as plain text while the app loads.
  await expect(intro).toHaveCSS('position', 'fixed')
  // Clicks go through it while it plays.
  await page.getByRole('banner').getByRole('link', { name: 'DuckHats' }).click({ timeout: 2000 })
  await expect(page).toHaveURL(/\/en$/)
  await expect(intro).toBeHidden({ timeout: 4000 })

  for (const path of ['/en', '/en/about']) {
    await page.goto(path)
    await expect(page.locator('html')).not.toHaveAttribute('data-intro', '')
  }
  await context.close()
})

test('the project brief walks through its steps, passes axe on each and sends', async ({
  page,
}) => {
  await page.route('/api/submit-contact', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' }),
  )
  await page.goto('/en/contact')
  const axe = async (step: string) => {
    const results = await new AxeBuilder({ page })
      .include('form')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()
    expect(results.violations.map((v) => `${step} ${v.id}`)).toEqual([])
  }
  const next = page.getByRole('button', { name: 'Next' })
  const step = (name: string) => expect(page.getByRole('heading', { level: 2, name })).toBeVisible()

  await step('What do you need?')
  await axe('type')
  await page.getByText('Online shop').click()

  await step('Where are we starting from?')
  await axe('stage')
  await page.getByText('It already exists').click()
  await page.getByLabel('Current address (optional)').fill('https://shop.example.com')
  await next.click()

  await step('What should it do?')
  await page.getByText('Online payments').click()
  await axe('features')
  await page.getByLabel('The goal, in one sentence').fill('Sell our wine online')
  await next.click()

  await step('Timeline and budget')
  await page.getByLabel('When would you like it?').selectOption({ label: 'In 1 to 3 months' })
  await page.getByLabel('Approximate budget').selectOption({ label: 'I do not know yet' })
  await axe('plan')
  await next.click()

  await step('Who are you?')
  await page.getByLabel('Name', { exact: true }).fill('Ada')
  await page.getByLabel('Email').fill('ada@example.com')
  await axe('contact')
  await next.click()

  await step('Review and send')
  await axe('summary')
  await page.getByRole('button', { name: 'Send the request' }).click()
  await expect(page.getByRole('heading', { level: 2, name: 'Request sent' })).toBeFocused()
})

test('no headline word is split, sticks out of its heading or makes the page scroll sideways', async ({
  page,
}) => {
  test.setTimeout(120_000)
  const issues: string[] = []
  for (const path of pages) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
    await page.evaluate(() => document.fonts.ready)
    issues.push(...(await brokenText(page)).map((issue) => `${path}: ${issue}`))
  }
  expect(issues).toEqual([])
})

test('the footer legal links can be clicked (nothing covers them)', async ({ page, isMobile }) => {
  // The giant wordmark's letters reach higher on wide screens.
  if (!isMobile) await page.setViewportSize({ width: 1920, height: 1080 })
  // Answer the cookie notice once; the choice is remembered.
  await page.goto('/ca')
  await page.getByRole('button', { name: 'Rebutja' }).click()
  for (const [name, url] of [
    ['Política de privacitat', /\/ca\/privacitat$/],
    ['Avís legal', /\/ca\/avis-legal$/],
  ] as const) {
    await page.goto('/ca')
    // A real click (no force): it fails if anything sits on top of the link.
    await page.locator('footer').getByRole('link', { name }).click({ timeout: 5000 })
    await expect(page).toHaveURL(url)
  }
})
