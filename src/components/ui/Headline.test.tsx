import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Headline } from './Headline'

describe('Headline', () => {
  it('keeps the full sentence as the accessible heading text', () => {
    render(<Headline text="Software that has to work." id="t" />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Software that has to work.',
    )
  })

  it('staggers each word', () => {
    const { container } = render(<Headline as="h2" text="One two" delay={0.1} />)
    const words = container.querySelectorAll<HTMLElement>('.line-up')
    expect(words).toHaveLength(2)
    expect(words[1]!.style.animationDelay).toBe('0.16s')
  })
})
