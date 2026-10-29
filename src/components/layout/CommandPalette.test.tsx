import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '@/app/App'
import { messages } from '@/content/messages'
import { findProject } from '@/content/projects'

const en = messages.en

const renderApp = () =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/en']}>
        <AppRoutes />
      </MemoryRouter>
    </HelmetProvider>,
  )

describe('quick search', () => {
  it('opens with Ctrl+K, filters, and goes to the chosen project with Enter', async () => {
    const user = userEvent.setup()
    renderApp()
    await screen.findByRole('heading', { level: 1, name: en.home.hero.title })

    await user.keyboard('{Control>}k{/Control}')
    // The palette and the project page are lazy chunks, slower when the whole suite runs in parallel.
    const dialog = await screen.findByRole('dialog', { name: en.palette.title }, { timeout: 8000 })
    const input = screen.getByRole('combobox')
    expect(input).toHaveFocus()

    await user.type(input, 'sushi')
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(1)
    expect(options[0]).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{Enter}')
    await waitFor(() => expect(dialog).not.toBeInTheDocument())
    expect(
      await screen.findByRole(
        'heading',
        { level: 1, name: findProject('sushi-sudoku')!.title },
        { timeout: 8000 },
      ),
    ).toBeInTheDocument()
  })

  it('opens from the header button, ignores accents and closes with Escape', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(await screen.findByRole('button', { name: new RegExp(en.palette.open) }))
    const input = await screen.findByRole('combobox', {}, { timeout: 8000 })

    await user.type(input, 'SERVICES')
    expect(screen.getByRole('option', { name: en.nav.services })).toBeInTheDocument()
    await user.clear(input)
    await user.type(input, 'zzzz')
    expect(screen.queryAllByRole('option')).toHaveLength(0)
    expect(screen.getByText(en.palette.empty)).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
})
