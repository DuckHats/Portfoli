import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface Options {
  count: number
  /** Milliseconds between slides. */
  interval?: number
}

/**
 * Carousel state with autoplay that stays out of the way: it only runs while the carousel is on
 * screen, not hovered or focused, never for users who prefer reduced motion, and the visitor can
 * stop it for good with `toggle` (WCAG 2.2.2).
 */
export function useCarousel({ count, interval = 3500 }: Options) {
  const [index, setIndex] = useState(0)
  const [interacting, setInteracting] = useState(false)
  const [stopped, setStopped] = useState(false)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')
  const reduceMotion = usePrefersReducedMotion()
  const element = useRef<HTMLElement | null>(null)

  /** Whether it would advance on its own at all (so a pause control makes sense). */
  const autoplay = !reduceMotion && count > 1
  const playing = autoplay && !stopped && !interacting && visible

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval)
    return () => window.clearInterval(id)
  }, [playing, count, interval])

  const ref = useCallback((node: HTMLElement | null) => {
    element.current = node
  }, [])

  useEffect(() => {
    const node = element.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? false),
      {
        threshold: 0.25,
      },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const go = useCallback((to: number) => setIndex(((to % count) + count) % count), [count])

  return {
    index,
    playing,
    autoplay,
    stopped,
    toggle: () => setStopped((value) => !value),
    go,
    next: () => go(index + 1),
    prev: () => go(index - 1),
    ref,
    handlers: {
      onMouseEnter: () => setInteracting(true),
      onMouseLeave: () => setInteracting(false),
      onFocus: () => setInteracting(true),
      onBlur: () => setInteracting(false),
    },
  }
}
