import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { messages } from '@/content/messages'
import { AppRoutes } from './App'

const renderAt = (path: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>,
  )

describe('routing and language', () => {
  afterEach(() => vi.restoreAllMocks())

  it.each(['ca', 'es', 'en'] as const)('renders the %s home page', async (lang) => {
    renderAt(`/${lang}`)
    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: messages[lang].home.hero.title,
      }),
    ).toBeInTheDocument()
    expect(document.documentElement.lang).toBe(lang)
  })

  it('redirects a language-less URL to the detected language', async () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['ca-ES'])
    renderAt('/projects')
    expect(
      await screen.findByRole('heading', { level: 1, name: messages.ca.projects.title }),
    ).toBeInTheDocument()
  })

  it('maps the old /join-us URL to careers', async () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['ca-ES'])
    renderAt('/join-us')
    expect(
      await screen.findByRole('heading', { level: 1, name: messages.ca.careers.title }),
    ).toBeInTheDocument()
  })

  it('shows a 404 for unknown pages and unknown projects', async () => {
    renderAt('/en/nope')
    expect(
      await screen.findByRole('heading', { name: messages.en.notFound.title }),
    ).toBeInTheDocument()
    renderAt('/en/projects/does-not-exist')
    expect(
      await screen.findAllByRole('heading', { name: messages.en.notFound.title }),
    ).not.toHaveLength(0)
  })

  it('exposes a skip link and a labelled main landmark', async () => {
    renderAt('/en')
    expect(
      await screen.findByRole('link', { name: messages.en.a11y.skipToContent }),
    ).toHaveAttribute('href', '#main-content')
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  })

  it('switches language while keeping the page', async () => {
    renderAt('/ca/serveis')
    await screen.findByRole('heading', { level: 1, name: messages.ca.services.title })
    const link = screen.getAllByRole('link', { name: /English/ })[0]!
    expect(link).toHaveAttribute('href', '/en/services')
  })
})

describe('contact form', () => {
  // The whole brief (steps, review, sending) is covered in forms/ContactForm.test.tsx.
  it('opens the project brief on its first question and will not move on unanswered', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
    const copy = messages.en.contact.form
    renderAt('/en/contact')
    expect(
      await screen.findByRole('heading', { level: 2, name: copy.steps.type.title }),
    ).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: copy.next }))
    expect(await screen.findByRole('alert')).toHaveTextContent(messages.en.validation.required)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
