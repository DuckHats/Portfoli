import { m, useScroll, useSpring } from 'motion/react'

/** How far down the page you are, as a hairline along the bottom of the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
    />
  )
}
