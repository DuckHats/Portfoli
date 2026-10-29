import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { messages } from '@/content/messages'
import { LanguageProvider } from '@/lib/i18n'
import { ProjectGallery } from './ProjectGallery'

const slides = [1, 2, 3].map((n) => ({ src: `/shot-${n}.webp`, alt: `Shot ${n}` }))
const en = messages.en.projects

const renderGallery = () =>
  render(
    <LanguageProvider language="en">
      <ProjectGallery slides={slides} />
    </LanguageProvider>,
  )

describe('ProjectGallery', () => {
  it('opens a screenshot, moves with the arrows and returns focus on Escape', async () => {
    const user = userEvent.setup()
    renderGallery()
    const second = screen.getByRole('button', { name: 'Enlarge screenshot 2' })
    await user.click(second)

    const dialog = screen.getByRole('dialog', { name: 'Screenshot 2 of 3' })
    expect(screen.getByRole('button', { name: en.close })).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('dialog', { name: 'Screenshot 3 of 3' })).toBeInTheDocument()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('dialog', { name: 'Screenshot 1 of 3' })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitFor(() => expect(dialog).not.toBeInTheDocument())
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Enlarge screenshot 1' })).toHaveFocus(),
    )
  })
})
