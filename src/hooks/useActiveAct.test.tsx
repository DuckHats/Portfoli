import { act, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useActiveAct } from './useActiveAct'

function Probe() {
  return <p>{useActiveAct()}</p>
}

const renderAt = () =>
  render(
    <MemoryRouter>
      <main>
        <section data-act="ink" data-testid="ink" />
      </main>
      <Probe />
    </MemoryRouter>,
  )

describe('useActiveAct', () => {
  const original = document.elementFromPoint
  afterEach(() => {
    document.elementFromPoint = original
  })

  it('reports the act of the block under the header', async () => {
    renderAt()
    document.elementFromPoint = vi.fn(() => screen.getByTestId('ink'))
    window.dispatchEvent(new Event('scroll'))
    await act(() => new Promise(requestAnimationFrame))
    expect(screen.getByText('ink')).toBeInTheDocument()
  })

  it('falls back to paper when nothing declares an act', async () => {
    document.elementFromPoint = vi.fn(() => null)
    renderAt()
    await act(() => new Promise(requestAnimationFrame))
    expect(screen.getByText('paper')).toBeInTheDocument()
  })
})
