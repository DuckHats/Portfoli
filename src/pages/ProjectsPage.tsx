import { ProjectShowcase } from '@/components/sections/ProjectShowcase'
import { SEO } from '@/components/SEO'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { projects } from '@/content/projects'
import { useMessages } from '@/lib/i18n'

export function ProjectsPage() {
  const { seo, projects: copy } = useMessages()
  return (
    <>
      <SEO title={seo.projects.title} description={seo.projects.description} />
      <PageHeader title={copy.title} intro={copy.intro} />
      <Container className="overflow-x-clip py-20 sm:py-28">
        <div className="space-y-28 sm:space-y-36">
          {projects.map((project, index) => (
            <Reveal key={project.id}>
              <ProjectShowcase project={project} as="h2" reverse={index % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  )
}
