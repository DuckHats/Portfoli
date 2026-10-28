import { ProjectCard } from '@/components/sections/ProjectCard'
import { SEO } from '@/components/SEO'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { projects } from '@/content/projects'
import { useMessages } from '@/lib/i18n'

export function ProjectsPage() {
  const { seo, projects: copy } = useMessages()
  return (
    <>
      <SEO title={seo.projects.title} description={seo.projects.description} />
      <PageHeader title={copy.title} intro={copy.intro} />
      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </>
  )
}
