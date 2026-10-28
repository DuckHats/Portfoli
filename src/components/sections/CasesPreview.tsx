import { ArrowRight } from 'lucide-react'
import { projects } from '@/content/projects'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { ProjectShowcase } from './ProjectShowcase'

export function CasesPreview() {
  const { home } = useMessages()
  const { cases } = home
  return (
    <Section
      id="cases"
      title={cases.title}
      intro={cases.intro}
      action={
        <AppLink
          to="projects"
          className="inline-flex items-center gap-2 font-medium text-accent-text"
        >
          <span className="link-underline pb-0.5">{cases.link}</span>{' '}
          <ArrowRight size={16} aria-hidden />
        </AppLink>
      }
    >
      <div className="space-y-28 sm:space-y-36">
        {projects.slice(1, 3).map((project, index) => (
          <Reveal key={project.id}>
            <ProjectShowcase project={project} reverse={index % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
