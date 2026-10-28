import { ArrowUpRight, Github } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { SEO } from '@/components/SEO'
import { AppLink, ExternalLink } from '@/components/ui/AppLink'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { Container } from '@/components/ui/Container'
import { Tag } from '@/components/ui/Tag'
import { findProject } from '@/content/projects'
import { SITE } from '@/config/site'
import { useLanguage, useLocalize, useMessages } from '@/lib/i18n'
import { buildPath, projectPath } from '@/lib/routes'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { projectId } = useParams()
  const project = findProject(projectId)
  const language = useLanguage()
  const localize = useLocalize()
  const { projects: copy, nav } = useMessages()

  if (!project) return <NotFoundPage />

  const description = localize(project.summary)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: nav.home,
        item: `${SITE.url}${buildPath(language, 'home')}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: nav.projects,
        item: `${SITE.url}${buildPath(language, 'projects')}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${SITE.url}${projectPath(language, project.id)}`,
      },
    ],
  }

  return (
    <>
      <SEO title={project.title} description={description} image={project.image} jsonLd={jsonLd} />
      <article>
        <header className="border-b border-line">
          <Container className="py-14 sm:py-20">
            <AppLink to="projects" className="text-sm text-muted transition-colors hover:text-ink">
              ← {copy.back}
            </AppLink>
            <div className="mt-6 flex flex-wrap gap-2">
              <Tag>{localize(project.category)}</Tag>
              <Tag>{localize(project.status)}</Tag>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-prose text-lg text-muted">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
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

        <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_18rem]">
          <div className="space-y-12">
            <section aria-labelledby="challenge">
              <h2 id="challenge" className="text-2xl font-semibold tracking-tight">
                {copy.challenge}
              </h2>
              <p className="mt-3 max-w-prose text-muted">{localize(project.challenge)}</p>
            </section>
            <section aria-labelledby="solution">
              <h2 id="solution" className="text-2xl font-semibold tracking-tight">
                {copy.solution}
              </h2>
              <p className="mt-3 max-w-prose text-muted">{localize(project.solution)}</p>
            </section>
            <section aria-labelledby="results">
              <h2 id="results" className="text-2xl font-semibold tracking-tight">
                {copy.results}
              </h2>
              <ul className="mt-3 max-w-prose list-disc space-y-2 pl-5 text-muted marker:text-accent">
                {localize(project.results).map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside aria-labelledby="stack" className="lg:border-l lg:border-line lg:pl-8">
            <h2 id="stack" className="font-mono text-xs uppercase tracking-widest text-muted">
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

        <section aria-labelledby="gallery" className="border-t border-line bg-surface py-16">
          <Container>
            <h2 id="gallery" className="text-2xl font-semibold tracking-tight">
              {copy.gallery}
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {project.gallery.map((src, index) => (
                <li key={src} className="overflow-hidden rounded-lg border border-line bg-canvas">
                  <img
                    src={src}
                    alt={`${project.title} — ${copy.imageOf} ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full"
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </article>
    </>
  )
}
