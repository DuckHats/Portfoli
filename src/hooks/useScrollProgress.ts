import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Writes `--p` (0 when the element enters at the bottom of the viewport, 1 when it leaves at the
 * top) onto the returned ref. It only listens while the element is on screen and does nothing for
 * users who prefer reduced motion, so the CSS default (`--p: 0.5`) leaves it still.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const reduceMotion = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || reduceMotion || typeof IntersectionObserver === 'undefined') return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const viewport = window.innerHeight
      const progress = Math.min(1, Math.max(0, (viewport - rect.top) / (viewport + rect.height)))
      node.style.setProperty('--p', progress.toFixed(3))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        window.addEventListener('scroll', schedule, { passive: true })
        window.addEventListener('resize', schedule)
        schedule()
      } else {
        window.removeEventListener('scroll', schedule)
        window.removeEventListener('resize', schedule)
      }
    })
    observer.observe(node)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reduceMotion])

  return ref
}
