import { ArrowRight } from 'lucide-react'
import { AnimatePresence, m, useMotionValue, useSpring } from 'motion/react'
import { useState } from 'react'
import type { PointerEvent } from 'react'
import type { Project } from '@/content/projects'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Container } from '../ui/Container'

/**
 * The way on to the next project: its name at poster size. With a mouse, its screenshot appears
 * and trails the pointer while hovering.
 */
export function NextProject({ project }: { project: Project }) {
  const { projects } = useMessages()
  const [hover, setHover] = useState(false)
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 26 })
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 26 })

  const onMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return
    const box = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - box.left)
    y.set(event.clientY - box.top)
    setHover(true)
  }

  return (
    <section
      data-act="red"
      aria-label={projects.nextProject}
      className="relative overflow-hidden bg-canvas text-ink"
      onPointerMove={onMove}
      onPointerLeave={() => setHover(false)}
    >
      <AnimatePresence>
        {hover && (
          <m.img
            aria-hidden
            src={project.image}
            alt=""
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="pointer-events-none absolute left-0 top-0 z-0 -ml-40 -mt-28 hidden w-80 rounded-xl shadow-[0_30px_60px_-15px_rgb(0_0_0/0.6)] md:block"
          />
        )}
      </AnimatePresence>
      <Container className="relative py-24 sm:py-32">
        <p className="label">{projects.nextProject}</p>
        <AppLink
          to="projects"
          param={project.id}
          className="group mt-6 flex items-center justify-between gap-8"
        >
          <span className="font-display text-5xl font-black uppercase leading-[0.9] sm:text-8xl">
            {project.title}
          </span>
          <ArrowRight
            size={64}
            aria-hidden
            className="shrink-0 transition-transform duration-300 group-hover:translate-x-3"
          />
        </AppLink>
      </Container>
    </section>
  )
}
