import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SubmitButton } from './SubmitButton'

describe('SubmitButton', () => {
  it('shows the label and submits when idle', () => {
    render(<SubmitButton status="idle" label="Send" sendingLabel="Sending" />)
    const button = screen.getByRole('button', { name: 'Send' })
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toBeEnabled()
  })

  it('is disabled and says so while sending', () => {
    render(<SubmitButton status="submitting" label="Send" sendingLabel="Sending" />)
    expect(screen.getByRole('button', { name: 'Sending' })).toBeDisabled()
  })

  it('keeps the label after a result', () => {
    render(<SubmitButton status="success" label="Send" sendingLabel="Sending" />)
    expect(screen.getByRole('button', { name: 'Send' })).toBeEnabled()
  })
})
