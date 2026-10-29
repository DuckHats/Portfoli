import { useEffect } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const SECTIONS = 'main [data-act]'
// Keys that already mean something to the focused control must stay untouched.
const OWN_KEYS =
  'input, textarea, select, [contenteditable="true"], [aria-roledescription="carousel"]'
const NEXT = new Set(['ArrowRight', 'j'])
const PREV = new Set(['ArrowLeft', 'k'])

/** ←/→ (or J/K) jump between the sections of the page. Never touches Tab, Space or modified keys. */
export function useSectionKeys() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return
      const forward = NEXT.has(event.key)
      if (!forward && !PREV.has(event.key)) return
      if (event.target instanceof Element && event.target.closest(OWN_KEYS)) return

      const sections = [...document.querySelectorAll<HTMLElement>(SECTIONS)]
      if (sections.length === 0) return
      // The current section is the last one whose top has reached the top of the viewport.
      const current = sections.reduce(
        (found, section, index) => (section.getBoundingClientRect().top <= 8 ? index : found),
        0,
      )
      const target =
        sections[Math.min(Math.max(current + (forward ? 1 : -1), 0), sections.length - 1)]
      event.preventDefault()
      target?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [reduced])
}
