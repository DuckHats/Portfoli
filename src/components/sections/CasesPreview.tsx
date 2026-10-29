import { ArrowRight } from 'lucide-react'
import { featuredProject, projects } from '@/content/projects'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Section } from '../ui/Section'
import { ProjectStack } from './ProjectStack'

const others = projects.filter((project) => project !== featuredProject).slice(0, 2)

export function CasesPreview() {
  const { home } = useMessages()
  const { cases } = home
  return (
    <Section
      id="cases"
      label="02"
      title={cases.title}
      intro={cases.intro}
      action={
        <AppLink
          to="projects"
          className="inline-flex items-center gap-2 font-semibold text-accent-text"
        >
          <span className="link-underline pb-0.5">{cases.link}</span>{' '}
          <ArrowRight size={16} aria-hidden />
        </AppLink>
      }
    >
      <ProjectStack projects={others} />
    </Section>
  )
}
