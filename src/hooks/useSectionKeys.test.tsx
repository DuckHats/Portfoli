import { fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useSectionKeys } from './useSectionKeys'

function Page() {
  useSectionKeys()
  return (
    <main>
      <section data-act="paper" data-id="a">
        <input aria-label="field" />
      </section>
      <section data-act="paper" data-id="b" />
      <section data-act="paper" data-id="c" />
    </main>
  )
}

const scrolled: string[] = []

beforeEach(() => {
  scrolled.length = 0
  window.matchMedia = vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })
  Element.prototype.scrollIntoView = vi.fn(function (this: Element) {
    scrolled.push(this.getAttribute('data-id') ?? '')
  })
  // Section "a" sits at the top of the viewport, the others below it.
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    return { top: this.getAttribute('data-id') === 'a' ? 0 : 900 } as DOMRect
  })
})

afterEach(() => vi.restoreAllMocks())

describe('useSectionKeys', () => {
  it('moves to the next section with ArrowRight and J', () => {
    render(<Page />)
    fireEvent.keyDown(document.body, { key: 'ArrowRight' })
    fireEvent.keyDown(document.body, { key: 'j' })
    expect(scrolled).toEqual(['b', 'b'])
  })

  it('stays on the first section when going back from it', () => {
    render(<Page />)
    fireEvent.keyDown(document.body, { key: 'ArrowLeft' })
    expect(scrolled).toEqual(['a'])
  })

  it('ignores form fields, modified keys and unrelated keys', () => {
    const { getByLabelText } = render(<Page />)
    fireEvent.keyDown(getByLabelText('field'), { key: 'ArrowRight' })
    fireEvent.keyDown(document.body, { key: 'ArrowRight', ctrlKey: true })
    fireEvent.keyDown(document.body, { key: ' ' })
    fireEvent.keyDown(document.body, { key: 'Tab' })
    expect(scrolled).toEqual([])
  })

  it('stops listening when unmounted', () => {
    const { unmount } = render(<Page />)
    unmount()
    fireEvent.keyDown(document.body, { key: 'ArrowRight' })
    expect(scrolled).toEqual([])
  })
})
