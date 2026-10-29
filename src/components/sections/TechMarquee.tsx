import { projects } from '@/content/projects'
import { useMessages } from '@/lib/i18n'

const technologies = [...new Set(projects.flatMap((project) => project.technologies))]

/** Slow ticker of the technologies used in real projects. Static and wrapped for reduced motion. */
export function TechMarquee() {
  const { home } = useMessages()
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-12 pr-12 motion-reduce:flex-wrap motion-reduce:justify-center ${
        hidden ? 'motion-reduce:hidden' : ''
      }`}
    >
      {technologies.map((name) => (
        <li key={name} className="flex items-center gap-12 whitespace-nowrap">
          <span className="font-display text-5xl font-black uppercase tracking-tight sm:text-6xl">
            {name}
          </span>
          <span aria-hidden className="mark-mask h-8 w-8 bg-accent" />
        </li>
      ))}
    </ul>
  )

  return (
    <section
      data-act="paper"
      aria-label={home.tech.label}
      className="overflow-hidden bg-canvas py-8 text-ink"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:justify-center">
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}
