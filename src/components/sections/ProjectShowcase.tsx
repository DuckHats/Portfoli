import type { Project } from '@/content/projects'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useLocalize, useMessages } from '@/lib/i18n'
import { displayUrl, showcaseImages } from '@/lib/projectUrl'
import { AppLink } from '../ui/AppLink'
import { BrowserFrame } from '../ui/BrowserFrame'
import { ShowcaseCarousel } from './ShowcaseCarousel'

interface ProjectShowcaseProps {
  project: Project
  /** Put the text on the left and the browser on the right. */
  reverse?: boolean
  /** Heading level, so the page keeps a valid outline. */
  as?: 'h2' | 'h3'
}

/** The signature piece: a project presented inside a live browser window next to its story. */
export function ProjectShowcase({
  project,
  reverse = false,
  as: Heading = 'h3',
}: ProjectShowcaseProps) {
  const localize = useLocalize()
  const { projects } = useMessages()
  const parallax = useScrollProgress<HTMLDivElement>()

  const slides = showcaseImages(project).map((src, i) => ({
    src,
    alt: `${project.title} — ${projects.imageOf} ${i + 1}`,
  }))

  return (
    <article className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <div className={`relative lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}>
        <div
          aria-hidden
          className={`absolute inset-0 translate-y-3 rounded-2xl bg-accent-soft lg:translate-y-5 ${
            reverse ? '-translate-x-3 lg:-translate-x-5' : 'translate-x-3 lg:translate-x-5'
          }`}
        />
        <div
          ref={parallax}
          className="relative [--p:0.5]"
          style={{ transform: 'translate3d(0, calc((var(--p) - 0.5) * -28px), 0)' }}
        >
          <BrowserFrame url={displayUrl(project)}>
            <ShowcaseCarousel slides={slides} />
          </BrowserFrame>
        </div>
      </div>

      <div className="lg:col-span-5">
        <p className="text-sm text-muted">
          {localize(project.category)} · {localize(project.status)}
        </p>
        <Heading className="mt-3 text-4xl sm:text-5xl">{project.title}</Heading>
        <p className="mt-5 text-lg text-ink/85">{localize(project.summary)}</p>
        <ul className="mt-6 space-y-2 text-ink/85">
          {localize(project.results)
            .slice(0, 2)
            .map((result) => (
              <li key={result} className="flex gap-3">
                <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-accent" />
                {result}
              </li>
            ))}
        </ul>
        <p className="mt-6 text-sm text-muted">{project.technologies.join(' · ')}</p>
        <AppLink
          to="projects"
          param={project.id}
          className="link-underline mt-8 inline-block pb-0.5 font-medium text-accent"
        >
          {projects.view} →
        </AppLink>
      </div>
    </article>
  )
}
