import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Scribble } from './Scribble'

describe('Scribble', () => {
  it.each(['underline', 'arrow'] as const)('is decorative only (%s)', (variant) => {
    const { container } = render(<Scribble variant={variant} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg?.textContent).toBe('')
  })

  it('animates only the underline', () => {
    const { container } = render(
      <>
        <Scribble variant="underline" />
        <Scribble variant="arrow" />
      </>,
    )
    expect(container.querySelectorAll('.scribble-path')).toHaveLength(1)
  })
})
