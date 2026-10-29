import type { Project } from '@/content/projects'
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

/** A project presented inside a live browser window next to its story. */
export function ProjectShowcase({
  project,
  reverse = false,
  as: Heading = 'h3',
}: ProjectShowcaseProps) {
  const localize = useLocalize()
  const { projects } = useMessages()

  const slides = showcaseImages(project).map((src, i) => ({
    src,
    alt: `${project.title} — ${projects.imageOf} ${i + 1}`,
  }))

  return (
    <article className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <div className={`lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}>
        <BrowserFrame url={displayUrl(project)}>
          <ShowcaseCarousel slides={slides} />
        </BrowserFrame>
      </div>

      <div className="lg:col-span-5">
        <p className="label">
          {localize(project.category)} · {localize(project.status)}
        </p>
        <Heading className="mt-4 text-4xl sm:text-5xl">{project.title}</Heading>
        <p className="mt-5 text-lg text-ink/85">{localize(project.summary)}</p>
        <ul className="mt-6 space-y-2 text-ink/85">
          {localize(project.results)
            .slice(0, 2)
            .map((result) => (
              <li key={result} className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                {result}
              </li>
            ))}
        </ul>
        <p className="mt-6 text-sm text-muted">{project.technologies.join(' · ')}</p>
        <AppLink
          to="projects"
          param={project.id}
          className="link-underline mt-8 inline-block pb-0.5 font-semibold text-accent-text"
        >
          {projects.view} →
        </AppLink>
      </div>
    </article>
  )
}
