import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Dimension } from './Dimension'

describe('Dimension', () => {
  it('is decorative and shows its label', () => {
    const { container } = render(<Dimension label="01 / 06" />)
    const root = container.firstElementChild
    expect(root?.getAttribute('aria-hidden')).toBe('true')
    expect(root?.textContent).toBe('01 / 06')
  })
})
