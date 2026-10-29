import { useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'

/**
 * Pulls its child a few pixels toward a mouse pointer and springs back on leave (CSS transition on
 * transform). Plain DOM on purpose: it sits in the hero, which must not wait for the motion chunk.
 * Touch and pen are ignored; reduced motion makes the transition instant via the global rule.
 */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current
    if (!node || event.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = node.getBoundingClientRect()
    const x = (event.clientX - box.left - box.width / 2) * strength
    const y = (event.clientY - box.top - box.height / 2) * strength
    node.style.transform = `translate(${x}px, ${y}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block transition-transform duration-300 ease-out"
    >
      {children}
    </div>
  )
}
