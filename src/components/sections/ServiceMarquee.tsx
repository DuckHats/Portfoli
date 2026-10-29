import {
  m,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useEffect, useRef } from 'react'
import { useMessages } from '@/lib/i18n'

/** Percent of one row's width travelled per second when the page is still. */
const BASE_SPEED = 2

const wrap = (min: number, max: number, value: number) => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

/**
 * The services we offer, on a band that reacts to scrolling: it speeds up and
 * leans with the scroll velocity and turns round when you scroll back up. It pauses on hover and
 * is a static, wrapped list for reduced motion.
 */
export function ServiceMarquee() {
  const { home, contact } = useMessages()
  // What we build, in the same words the project brief offers (its open "other" choice aside).
  const services = Object.entries(contact.form.projectTypes)
    .filter(([id]) => id !== 'other')
    .map(([id, kind]) => ({ id, name: kind.label }))
  const reduce = useReducedMotion()
  const offset = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [0, 1000], [0, 5], { clamp: false })
  const skewX = useTransform(velocity, [-2500, 2500], [10, -10])
  const x = useTransform(offset, (value) => `${value}%`)
  const direction = useRef(-1)
  const paused = useRef(false)
  const band = useRef<HTMLElement>(null)
  // No per-frame work while the band is off screen (assumed on screen where unsupported).
  const onScreen = useRef(true)
  useEffect(() => {
    const node = band.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => {
      onScreen.current = Boolean(entry?.isIntersecting)
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current || !onScreen.current) return
    const speed = boost.get()
    if (speed < 0) direction.current = 1
    else if (speed > 0) direction.current = -1
    const move = direction.current * BASE_SPEED * (delta / 1000) * (1 + Math.abs(speed))
    offset.set(wrap(-50, 0, offset.get() + move))
  })

  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-12 pr-12 motion-reduce:flex-wrap motion-reduce:justify-center ${
        hidden ? 'motion-reduce:hidden' : ''
      }`}
    >
      {services.map((service) => (
        <li key={service.id} className="flex items-center gap-12 whitespace-nowrap">
          <span className="font-display text-5xl font-black uppercase tracking-tight sm:text-6xl">
            {service.name}
          </span>
          <span aria-hidden className="mark-mask h-8 w-8 bg-accent" />
        </li>
      ))}
    </ul>
  )

  return (
    <section
      ref={band}
      data-act="paper"
      aria-label={home.marquee.label}
      className="overflow-hidden bg-canvas py-8 text-ink"
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
    >
      <m.div
        style={reduce ? undefined : { x, skewX }}
        className="flex w-max motion-reduce:w-auto motion-reduce:justify-center"
      >
        {row(false)}
        {row(true)}
      </m.div>
    </section>
  )
}
