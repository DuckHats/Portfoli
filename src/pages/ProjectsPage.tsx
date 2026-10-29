import { ProjectStack } from '@/components/sections/ProjectStack'
import { SEO } from '@/components/SEO'
import { pageJsonLd } from '@/lib/jsonLd'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { projects } from '@/content/projects'
import { useMessages, useLanguage } from '@/lib/i18n'

export function ProjectsPage() {
  const language = useLanguage()
  const { seo, projects: copy } = useMessages()
  return (
    <>
      <SEO
        title={seo.projects.title}
        description={seo.projects.description}
        jsonLd={pageJsonLd('projects', language)}
      />
      <PageHeader title={copy.title} intro={copy.intro} />
      <div data-act="paper" className="overflow-x-clip bg-canvas">
        <Container className="py-20 sm:py-28">
          <ProjectStack projects={projects} as="h2" />
        </Container>
      </div>
    </>
  )
}
