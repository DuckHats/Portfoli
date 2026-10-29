import { m, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import type { Project } from '@/content/projects'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ProjectShowcase } from './ProjectShowcase'

interface ProjectStackProps {
  projects: Project[]
  as?: 'h2' | 'h3'
}

/**
 * Projects as a stack of pages: on wide screens each one sticks and the next slides over it, while
 * the covered page sinks back in depth. On small screens it is a plain list.
 */
export function ProjectStack({ projects, as }: ProjectStackProps) {
  const container = useRef<HTMLOListElement>(null)
  const wide = useMediaQuery('(min-width: 1024px)')
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] })

  return (
    <ol ref={container} className="space-y-16 lg:space-y-0">
      {projects.map((project, index) => (
        <StackPage
          key={project.id}
          index={index}
          total={projects.length}
          progress={scrollYProgress}
          stacked={wide}
        >
          <ProjectShowcase project={project} as={as} reverse={index % 2 === 1} />
        </StackPage>
      ))}
    </ol>
  )
}

interface StackPageProps {
  index: number
  total: number
  progress: MotionValue<number>
  stacked: boolean
  children: ReactNode
}

function StackPage({ index, total, progress, stacked, children }: StackPageProps) {
  const start = index / total
  const depth = total - 1 - index
  const scale = useTransform(progress, [start, 1], [1, 1 - depth * 0.06])
  const rotateX = useTransform(progress, [start, 1], [0, depth * 6])
  const opacity = useTransform(progress, [start, 1], [1, 1 - depth * 0.35])

  return (
    <li
      className="lg:sticky lg:pb-24"
      style={stacked ? { top: `calc(6rem + ${index * 2}rem)` } : undefined}
    >
      <m.div
        style={stacked ? { scale, rotateX, opacity, transformPerspective: 1600 } : undefined}
        className="origin-top rounded-2xl bg-surface p-6 ring-1 ring-ink/10 sm:p-10"
      >
        {children}
      </m.div>
    </li>
  )
}
