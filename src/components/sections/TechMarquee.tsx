import { projects } from '@/content/projects'
import { useMessages } from '@/lib/i18n'

const technologies = [...new Set(projects.flatMap((project) => project.technologies))]

/** Slow ticker of the technologies used in real projects. Static and wrapped for reduced motion. */
export function TechMarquee() {
  const { home } = useMessages()
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-10 pr-10 motion-reduce:flex-wrap motion-reduce:justify-center ${
        hidden ? 'motion-reduce:hidden' : ''
      }`}
    >
      {technologies.map((name) => (
        <li key={name} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display text-3xl font-medium text-ink">{name}</span>
          <span aria-hidden className="h-2 w-2 bg-accent" />
        </li>
      ))}
    </ul>
  )

  return (
    <section
      aria-label={home.tech.label}
      className="overflow-hidden border-y-2 border-ink bg-tint py-6"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:justify-center">
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}
