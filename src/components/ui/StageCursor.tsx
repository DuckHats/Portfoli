import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const INTERACTIVE = 'a, button, [role="option"], [data-cursor]'

/**
 * A ring that trails the mouse and grows over anything clickable; elements with `data-cursor`
 * show their label inside it. Decorative only: the native cursor stays, and touch, pen or
 * reduced-motion users never see it.
 */
export default function StageCursor() {
  const reduce = useReducedMotion()
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 })
  const [target, setTarget] = useState<{ active: boolean; label: string | null }>({
    active: false,
    label: null,
  })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!fine || reduce) return
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
      const element = event.target instanceof Element ? event.target : null
      const active = Boolean(element?.closest(INTERACTIVE))
      const label = element?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? null
      setTarget((current) =>
        current.active === active && current.label === label ? current : { active, label },
      )
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [fine, reduce, x, y])

  if (!fine || reduce) return null

  return (
    <m.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-difference"
    >
      <m.div
        animate={{
          scale: target.label ? 4.5 : target.active ? 2.2 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="-ml-3 -mt-3 flex h-6 w-6 items-center justify-center rounded-full border border-white"
      >
        {target.label && (
          <span className="text-[3px] font-bold uppercase tracking-wider text-white">
            {target.label}
          </span>
        )}
      </m.div>
    </m.div>
  )
}
