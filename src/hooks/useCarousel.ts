import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

interface Options {
  count: number
  /** Milliseconds between slides. */
  interval?: number
}

/**
 * Carousel state with autoplay that stays out of the way: it only runs while the carousel is on
 * screen, not hovered or focused, and never for users who prefer reduced motion.
 */
export function useCarousel({ count, interval = 3500 }: Options) {
  const [index, setIndex] = useState(0)
  const [interacting, setInteracting] = useState(false)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')
  const reduceMotion = usePrefersReducedMotion()
  const element = useRef<HTMLElement | null>(null)

  const playing = !reduceMotion && !interacting && visible && count > 1

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
