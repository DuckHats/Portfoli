import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { findProject } from '@/content/projects'
import { messages } from '@/content/messages'
import { LanguageProvider } from '@/lib/i18n'
import { ProjectShowcase } from './ProjectShowcase'

const project = findProject('menu-ginebro')!
const en = messages.en.projects

const renderShowcase = () =>
  render(
    <MemoryRouter>
      <LanguageProvider language="en">
        <ProjectShowcase project={project} />
      </LanguageProvider>
    </MemoryRouter>,
  )

describe('ProjectShowcase', () => {
  it('presents the project with its story, results and link', () => {
    renderShowcase()
    expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    expect(screen.getByText(project.summary.en)).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
    expect(screen.getByRole('link', { name: new RegExp(en.view) })).toHaveAttribute(
      'href',
      '/en/projects/menu-ginebro',
    )
  })

  it('shows the real address inside the browser frame', () => {
    renderShowcase()
    expect(screen.getByText('github.com/DuckHats/menu-ginebro-front')).toBeInTheDocument()
  })

  it('is a labelled carousel with a described image per slide', () => {
    renderShowcase()
    const carousel = screen.getByRole('group', { name: en.carouselLabel })
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel')
    const images = within(carousel).getAllByRole('img', { hidden: true })
    expect(images).toHaveLength(5)
    expect(images.every((img) => (img.getAttribute('alt') ?? '').includes(project.title))).toBe(
      true,
    )
    // only the active slide is exposed to assistive technology
    expect(images.filter((img) => img.getAttribute('aria-hidden') === 'false')).toHaveLength(1)
  })

  it('can be driven with the previous/next buttons and dots', async () => {
    renderShowcase()
    const user = userEvent.setup()
    const dots = screen.getAllByRole('button', { name: /Show screenshot/ })
    expect(dots).toHaveLength(5)
    expect(dots[0]).toHaveAttribute('aria-current', 'true')

    await user.click(screen.getByRole('button', { name: en.next }))
    expect(dots[1]).toHaveAttribute('aria-current', 'true')

    await user.click(dots[3]!)
    expect(dots[3]).toHaveAttribute('aria-current', 'true')

    await user.click(screen.getByRole('button', { name: en.previous }))
    expect(dots[2]).toHaveAttribute('aria-current', 'true')
    expect(screen.getByText('Screenshot 3 of 5')).toBeInTheDocument()
  })
})
