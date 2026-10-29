import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '@/app/App'
import { SEO } from '@/components/SEO'
import { LanguageProvider } from '@/lib/i18n'
import { messages } from '@/content/messages'
import { CookieBanner } from './CookieBanner'
import { ThemeToggle } from './ThemeToggle'

const renderApp = (path: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>,
  )

const inEnglish = (ui: React.ReactNode) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/en/services']}>
        <LanguageProvider language="en">{ui}</LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>,
  )

describe('mobile menu', () => {
  const en = messages.en.a11y

  it('opens, closes with Escape and closes on navigation', async () => {
    renderApp('/en')
    const open = await screen.findByRole('button', { name: en.openMenu })
    expect(open).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(open)
    expect(screen.getByRole('button', { name: en.closeMenu })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(document.getElementById('mobile-menu')).toBeInTheDocument()

    await userEvent.keyboard('{Escape}')
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: en.openMenu }))
    const link = document.querySelector('#mobile-menu a[href="/en/about"]') as HTMLElement
    await userEvent.click(link)
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument()
    // Let the page transition finish so nothing from this render outlives the test.
    expect(
      await screen.findByRole('heading', { level: 1, name: messages.en.about.title }),
    ).toBeInTheDocument()
  })
})

describe('ThemeToggle', () => {
  beforeEach(() => document.documentElement.removeAttribute('data-theme'))

  it('switches the theme attribute and remembers it', async () => {
    inEnglish(<ThemeToggle />)
    const button = screen.getByRole('button', { name: messages.en.a11y.switchTheme })
    await userEvent.click(button)
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('dh-theme')).toBe('dark')
    await userEvent.click(button)
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
  })
})

describe('CookieBanner', () => {
  it('is shown until a choice is made, then stays hidden', async () => {
    const { unmount } = inEnglish(<CookieBanner />)
    await userEvent.click(screen.getByRole('button', { name: messages.en.cookies.reject }))
    expect(localStorage.getItem('dh-consent')).toBe('denied')
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    unmount()
    inEnglish(<CookieBanner />)
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
  })

  it('remembers acceptance', async () => {
    inEnglish(<CookieBanner />)
    await userEvent.click(screen.getByRole('button', { name: messages.en.cookies.accept }))
    expect(localStorage.getItem('dh-consent')).toBe('granted')
  })
})

describe('<SEO>', () => {
  const head = (selector: string) => document.head.querySelectorAll(selector)

  it('renders title, canonical, hreflang and social tags for the current page', async () => {
    inEnglish(<SEO title="Services" description="What we do" jsonLd={{ '@type': 'Thing' }} />)
    // Helmet applies title and link tags in separate frames: wait for the last one we assert on.
    await waitFor(() => expect(document.title).toBe('Services | DuckHats'))
    await waitFor(() => expect(head('link[rel="alternate"][hreflang]')).toHaveLength(4))

    expect(document.documentElement.lang).toBe('en')
    expect(head('meta[name="description"]')[0]).toHaveAttribute('content', 'What we do')
    expect(head('link[rel="canonical"]')[0]).toHaveAttribute(
      'href',
      'https://duckhats.cat/en/services',
    )
    expect(head('link[rel="alternate"][hreflang]')).toHaveLength(4)
    expect(head('meta[property="og:locale"]')[0]).toHaveAttribute('content', 'en_GB')
    expect(head('meta[property="og:locale:alternate"]')).toHaveLength(2)
    expect(head('meta[property="og:image"]')[0]).toHaveAttribute(
      'content',
      'https://duckhats.cat/og-cover.png',
    )
    // The Organization on every page, then the page's own data.
    const types = [...head('script[type="application/ld+json"]')].map(
      (script) => (JSON.parse(script.textContent!) as { '@type': string })['@type'],
    )
    expect(types).toEqual(['Organization', 'Thing'])
  })

  it('uses noindex and omits canonical and hreflang when asked', async () => {
    inEnglish(<SEO noindex title="Missing" description="Nope" />)
    await waitFor(() => expect(document.title).toBe('Missing | DuckHats'))
    await waitFor(() => expect(head('link[rel="canonical"]')).toHaveLength(0))
    expect(head('meta[name="robots"]')[0]).toHaveAttribute('content', 'noindex')
    expect(head('link[rel="alternate"][hreflang]')).toHaveLength(0)
  })

  it('escapes < in JSON-LD so it cannot close the script tag', async () => {
    inEnglish(<SEO title="X" description="Y" jsonLd={{ name: '</script><b>' }} />)
    await waitFor(() => expect(head('script[type="application/ld+json"]')).toHaveLength(2))
    expect(head('script[type="application/ld+json"]')[1]!.textContent).not.toContain('</script>')
  })
})

describe('careers form', () => {
  const copy = messages.en.careers.form
  const user = () => userEvent.setup({ applyAccept: false })

  it('validates required fields and the custom role', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
    renderApp('/en/careers')
    await user().click(await screen.findByRole('button', { name: copy.submit }))
    expect((await screen.findAllByRole('alert')).length).toBeGreaterThanOrEqual(3)
    expect(fetchMock).not.toHaveBeenCalled()

    await user().selectOptions(screen.getByLabelText(copy.role, { exact: false }), 'other')
    expect(screen.getByLabelText(copy.otherRole, { exact: false })).toBeInTheDocument()
  })

  it('adds and removes link fields up to the limit', async () => {
    renderApp('/en/careers')
    const u = user()
    await screen.findByRole('button', { name: copy.submit })
    expect(screen.getAllByPlaceholderText(copy.linkPlaceholder)).toHaveLength(1)
    await u.click(screen.getByRole('button', { name: copy.addLink }))
    expect(screen.getAllByPlaceholderText(copy.linkPlaceholder)).toHaveLength(2)
    await u.click(screen.getAllByRole('button', { name: copy.removeLink })[0]!)
    expect(screen.getAllByPlaceholderText(copy.linkPlaceholder)).toHaveLength(1)
  })

  it('rejects a non-PDF CV', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
    renderApp('/en/careers')
    const u = user()
    await u.type(await screen.findByLabelText(copy.name, { exact: false }), 'Ada')
    await u.type(screen.getByLabelText(copy.email, { exact: false }), 'ada@example.com')
    await u.selectOptions(screen.getByLabelText(copy.role, { exact: false }), 'backend')
    await u.type(screen.getByLabelText(copy.message, { exact: false }), 'Hello')
    await u.upload(
      screen.getByLabelText(new RegExp(copy.cv.split('(')[0]!.trim())),
      new File(['x'], 'cv.txt', { type: 'text/plain' }),
    )
    await u.click(screen.getByRole('button', { name: copy.submit }))
    expect(await screen.findByText(messages.en.validation.fileType)).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('submits fields, links as JSON and the PDF', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 200 }))
    renderApp('/en/careers')
    const u = user()
    await u.type(await screen.findByLabelText(copy.name, { exact: false }), 'Ada')
    await u.type(screen.getByLabelText(copy.email, { exact: false }), 'ada@example.com')
    await u.selectOptions(screen.getByLabelText(copy.role, { exact: false }), 'frontend')
    await u.type(screen.getAllByPlaceholderText(copy.linkPlaceholder)[0]!, 'https://github.com/ada')
    await u.type(screen.getByLabelText(copy.message, { exact: false }), 'Hello')
    const pdf = new File(['%PDF-1.4'], 'cv.pdf', { type: 'application/pdf' })
    await u.upload(screen.getByLabelText(new RegExp(copy.cv.split('(')[0]!.trim())), pdf)
    await u.click(screen.getByRole('button', { name: copy.submit }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalled())
    const [url, init] = fetchMock.mock.calls[0]!
    expect(url).toBe('/api/submit-join-us')
    const body = (init as RequestInit).body as FormData
    expect(body.get('role')).toBe('frontend')
    expect(JSON.parse(body.get('links') as string)).toEqual(['https://github.com/ada'])
    expect((body.get('cv') as File).name).toBe('cv.pdf')
    expect(await screen.findByText(copy.success)).toBeInTheDocument()
  })
})
