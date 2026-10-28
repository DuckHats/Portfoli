import { ArrowUpRight, Github } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { ShowcaseCarousel } from '@/components/sections/ShowcaseCarousel'
import { SEO } from '@/components/SEO'
import { AppLink, ExternalLink } from '@/components/ui/AppLink'
import { BrowserFrame } from '@/components/ui/BrowserFrame'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { Container } from '@/components/ui/Container'
import { Tag } from '@/components/ui/Tag'
import { findProject } from '@/content/projects'
import { useLanguage, useLocalize, useMessages } from '@/lib/i18n'
import { displayUrl } from '@/lib/projectUrl'
import { buildPath, projectPath } from '@/lib/routes'
import { breadcrumbJsonLd } from '@/lib/seo'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { projectId } = useParams()
  const project = findProject(projectId)
  const language = useLanguage()
  const localize = useLocalize()
  const { projects: copy, nav } = useMessages()

  if (!project) return <NotFoundPage />

  const description = localize(project.summary)
  const jsonLd = breadcrumbJsonLd([
    { name: nav.home, path: buildPath(language, 'home') },
    { name: nav.projects, path: buildPath(language, 'projects') },
    { name: project.title, path: projectPath(language, project.id) },
  ])
  const slides = project.gallery.map((src, i) => ({
    src,
    alt: `${project.title} — ${copy.imageOf} ${i + 1}`,
  }))

  return (
    <>
      <SEO title={project.title} description={description} image={project.image} jsonLd={jsonLd} />
      <article>
        <header className="border-b-2 border-ink bg-tint">
          <Container className="py-14 sm:py-20">
            <AppLink
              to="projects"
              className="link-underline pb-0.5 text-sm text-muted hover:text-ink"
            >
              ← {copy.back}
            </AppLink>
            <p className="mt-8 text-sm text-muted">
              {localize(project.category)} · {localize(project.status)}
            </p>
            <h1 className="mt-3 text-5xl sm:text-6xl">{project.title}</h1>
            <p className="mt-6 max-w-prose text-lg text-ink/85">{description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.link && (
                <ExternalLink href={project.link} className={buttonStyles()}>
                  {copy.visit} <ArrowUpRight size={16} aria-hidden />
                </ExternalLink>
              )}
              {project.github && (
                <ExternalLink
                  href={project.github}
                  className={buttonStyles({ variant: 'secondary' })}
                >
                  <Github size={16} aria-hidden /> {copy.source}
                </ExternalLink>
              )}
            </div>
          </Container>
        </header>

        <Container className="overflow-x-clip py-16 sm:py-20">
          <div className="relative">
            <div className="relative">
              <BrowserFrame url={displayUrl(project)}>
                <ShowcaseCarousel slides={slides} />
              </BrowserFrame>
            </div>
          </div>
        </Container>

        <Container className="grid gap-14 pb-20 lg:grid-cols-[1fr_18rem] lg:pb-28">
          <div className="space-y-14">
            <section aria-labelledby="challenge">
              <h2 id="challenge" className="text-3xl sm:text-4xl">
                {copy.challenge}
              </h2>
              <p className="mt-4 max-w-prose text-lg text-ink/85">{localize(project.challenge)}</p>
            </section>
            <section aria-labelledby="solution">
              <h2 id="solution" className="text-3xl sm:text-4xl">
                {copy.solution}
              </h2>
              <p className="mt-4 max-w-prose text-lg text-ink/85">{localize(project.solution)}</p>
            </section>
            <section aria-labelledby="results">
              <h2 id="results" className="text-3xl sm:text-4xl">
                {copy.results}
              </h2>
              <ul className="mt-4 max-w-prose space-y-3 text-lg text-ink/85">
                {localize(project.results).map((result) => (
                  <li key={result} className="flex gap-3">
                    <span aria-hidden className="mt-3.5 h-px w-5 shrink-0 bg-accent" />
                    {result}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside aria-labelledby="stack" className="lg:border-l lg:border-line lg:pl-8">
            <h2 id="stack" className="text-xl">
              {copy.technologies}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </aside>
        </Container>

        <section aria-labelledby="gallery" className="border-t-2 border-ink bg-tint py-16 sm:py-24">
          <Container>
            <h2 id="gallery" className="text-3xl sm:text-4xl">
              {copy.gallery}
            </h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-2">
              {slides.map((slide) => (
                <li key={slide.src}>
                  <BrowserFrame>
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full"
                    />
                  </BrowserFrame>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </article>
    </>
  )
}
