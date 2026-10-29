import { m, motionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { useEffect } from 'react'
import type { ReactNode, RefObject } from 'react'

/** The hero's 3D layer: the tilting window and the light, sharing one pointer position. */

const MAX_TILT = 10
const spring = { stiffness: 120, damping: 20 }

// Pointer position on the stage, -0.5..0.5 on each axis. There is one hero, so module scope is fine.
const px = motionValue(0)
const py = motionValue(0)

/** The soft light that follows the mouse; it also owns the stage's pointer listeners. */
export function HeroLight({ stage }: { stage: RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion()
  const x = useSpring(useTransform(px, [-0.5, 0.5], ['-30vw', '30vw']), spring)
  const y = useSpring(useTransform(py, [-0.5, 0.5], ['-25vh', '25vh']), spring)

  useEffect(() => {
    const node = stage.current
    if (!node || reduce) return
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      const box = node.getBoundingClientRect()
      px.set((event.clientX - box.left) / box.width - 0.5)
      py.set((event.clientY - box.top) / box.height - 0.5)
    }
    const onLeave = () => {
      px.set(0)
      py.set(0)
    }
    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
    }
  }, [stage, reduce])

  return (
    <m.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none absolute left-1/2 top-1/2 -ml-[30rem] -mt-[30rem] h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(circle,rgb(var(--color-ink)/0.11),transparent_62%)]"
    />
  )
}

/** Floats its children in perspective, turned toward the mouse and settling flat on scroll. */
export function HeroTilt({
  stage,
  children,
}: {
  stage: RefObject<HTMLElement | null>
  children: ReactNode
}) {
  const reduce = useReducedMotion()
  const tiltY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), spring)
  const tiltX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), spring)

  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end start'] })
  const settle = useTransform(scrollYProgress, [0, 0.6], [12, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 1.05])
  const rotateX = useTransform(() => (reduce ? 0 : settle.get() + tiltX.get()))
  const rotateY = useTransform(() => (reduce ? 0 : tiltY.get()))

  return (
    <m.div
      style={{ rotateX, rotateY, scale: reduce ? 1 : scale, transformStyle: 'preserve-3d' }}
      className="relative"
    >
      {children}
    </m.div>
  )
}
