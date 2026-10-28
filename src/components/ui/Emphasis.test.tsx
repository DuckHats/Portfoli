import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { countEmphasis, stripEmphasis } from '@/lib/emphasis'
import { Emphasis } from './Emphasis'

describe('Emphasis', () => {
  it('wraps *marked* words in <em> and keeps the rest as text', () => {
    const { container } = render(<Emphasis text="We build *actually* useful *things*." />)
    const ems = container.querySelectorAll('em')
    expect([...ems].map((e) => e.textContent)).toEqual(['actually', 'things'])
    expect(container.textContent).toBe('We build actually useful things.')
  })

  it('passes plain text and stray asterisks through untouched', () => {
    const { container } = render(<Emphasis text="2 * 3 = 6 and ** stay" />)
    expect(container.querySelector('em')).toBeNull()
    expect(container.textContent).toBe('2 * 3 = 6 and ** stay')
  })

  it('never interprets markup inside the text', () => {
    const { container } = render(<Emphasis text="*<b>x</b>*" />)
    expect(container.querySelector('b')).toBeNull()
    expect(container.querySelector('em')!.textContent).toBe('<b>x</b>')
  })
})

describe('emphasis helpers', () => {
  it('strips and counts markers', () => {
    expect(stripEmphasis('a *b* c *d*')).toBe('a b c d')
    expect(countEmphasis('a *b* c *d*')).toBe(2)
    expect(countEmphasis('plain')).toBe(0)
  })
})
