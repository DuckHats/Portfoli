import { ArrowUpRight, Github } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { NextProject } from '@/components/sections/NextProject'
import { ProjectGallery } from '@/components/sections/ProjectGallery'
import { ShowcaseCarousel } from '@/components/sections/ShowcaseCarousel'
import { SEO } from '@/components/SEO'
import { AppLink, ExternalLink } from '@/components/ui/AppLink'
import { BrowserFrame } from '@/components/ui/BrowserFrame'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { Container } from '@/components/ui/Container'
import { Headline } from '@/components/ui/Headline'
import { Reveal } from '@/components/ui/Reveal'
import { Tag } from '@/components/ui/Tag'
import { findProject, projects } from '@/content/projects'
import { useLanguage, useLocalize, useMessages } from '@/lib/i18n'
import { displayUrl } from '@/lib/projectUrl'
import { projectJsonLd } from '@/lib/jsonLd'
import { metaDescription } from '@/lib/seo'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { projectId } = useParams()
  const project = findProject(projectId)
  const language = useLanguage()
  const localize = useLocalize()
  const { projects: copy } = useMessages()

  if (!project) return <NotFoundPage />

  const description = localize(project.summary)
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length]!
  const jsonLd = projectJsonLd(project, language)
  const slides = project.gallery.map((src, i) => ({
    src,
    alt: `${project.title} — ${copy.imageOf} ${i + 1}`,
  }))

  return (
    <>
      <SEO
        title={project.title}
        description={metaDescription(description)}
        image={project.image}
        jsonLd={jsonLd}
      />
      <article>
        <header data-act="ink" className="bg-canvas text-ink">
          <Container className="pb-16 pt-14 sm:pb-24 sm:pt-20">
            <AppLink
              to="projects"
              className="link-underline pb-0.5 text-sm text-muted hover:text-ink"
            >
              ← {copy.back}
            </AppLink>
            <p className="label mt-10">
              {localize(project.category)} · {localize(project.status)}
            </p>
            <Headline text={project.title} className="mt-4 text-5xl sm:text-8xl" />
            <p className="mt-8 max-w-prose text-lg text-muted sm:text-xl">{description}</p>
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

        <div data-act="paper" className="bg-canvas">
          <Container className="overflow-x-clip py-16 sm:py-20">
            <Reveal>
              <BrowserFrame url={displayUrl(project)}>
                <ShowcaseCarousel slides={slides} />
              </BrowserFrame>
            </Reveal>
          </Container>

          <Container className="grid gap-14 pb-20 lg:grid-cols-[1fr_18rem] lg:pb-28">
            <div className="space-y-14">
              <section aria-labelledby="challenge">
                <h2 id="challenge" className="text-3xl sm:text-5xl">
                  {copy.challenge}
                </h2>
                <p className="mt-4 max-w-prose text-lg text-ink/85">
                  {localize(project.challenge)}
                </p>
              </section>
              <section aria-labelledby="solution">
                <h2 id="solution" className="text-3xl sm:text-5xl">
                  {copy.solution}
                </h2>
                <p className="mt-4 max-w-prose text-lg text-ink/85">{localize(project.solution)}</p>
              </section>
              <section aria-labelledby="results">
                <h2 id="results" className="text-3xl sm:text-5xl">
                  {copy.results}
                </h2>
                <ul className="mt-4 max-w-prose space-y-3 text-lg text-ink/85">
                  {localize(project.results).map((result) => (
                    <li key={result} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                      />
                      {result}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside
              aria-labelledby="stack"
              className="self-start rounded-2xl bg-surface p-6 ring-1 ring-ink/10 lg:sticky lg:top-28"
            >
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
        </div>

        <section
          data-act="ink"
          aria-labelledby="gallery"
          className="bg-canvas py-20 text-ink sm:py-28"
        >
          <Container>
            <h2 id="gallery" className="text-4xl sm:text-6xl">
              {copy.gallery}
            </h2>
            <div className="mt-10">
              <ProjectGallery slides={slides} />
            </div>
          </Container>
        </section>
        <NextProject project={nextProject} />
      </article>
    </>
  )
}
