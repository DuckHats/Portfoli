import { useRef } from 'react'
import type { PointerEvent } from 'react'
import { SITE } from '@/config/site'

const RADIUS = 260
const MAX_LIFT = 0.18 // em

/**
 * The oversized footer wordmark, cropped by the bottom edge. Letters rise toward a nearby mouse
 * pointer. Each letter is pseudo-element text, so it stays graphic only (not read out, not a
 * contrast target). Only `transform` changes, and only while the pointer is over it. The glyphs
 * reach above the line box, so they take no pointer events: they would cover the links above.
 */
export function Wordmark() {
  const root = useRef<HTMLDivElement>(null)
  const frame = useRef(0)

  const lift = (clientX: number | null) => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      root.current?.querySelectorAll<HTMLElement>('[data-char]').forEach((letter) => {
        let amount = 0
        if (clientX !== null) {
          const box = letter.getBoundingClientRect()
          const distance = Math.abs(clientX - (box.left + box.width / 2))
          amount = Math.max(0, 1 - distance / RADIUS)
        }
        letter.style.transform = `translateY(${(-amount * MAX_LIFT).toFixed(3)}em)`
        // The nearest letters also take the accent.
        letter.style.color = amount > 0.6 ? 'rgb(var(--color-accent) / 0.4)' : ''
      })
    })
  }

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lift(event.clientX)
  }

  return (
    <div
      ref={root}
      aria-hidden
      onPointerMove={onMove}
      onPointerLeave={() => lift(null)}
      className="mt-4 flex select-none justify-center whitespace-nowrap font-display text-[12.5vw] font-black uppercase leading-[0.78] text-ink/[0.07]"
    >
      {[...SITE.name].map((char, index) => (
        <span
          key={`${char}-${index}`}
          data-char={char}
          className="pointer-events-none inline-block transition-[transform,color] duration-300 ease-out before:content-[attr(data-char)]"
        />
      ))}
    </div>
  )
}
