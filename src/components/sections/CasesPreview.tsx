import { ArrowRight } from 'lucide-react'
import { projects } from '@/content/projects'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { ProjectCard } from './ProjectCard'

export function CasesPreview() {
  const { home } = useMessages()
  const { cases } = home
  return (
    <Section
      id="cases"
      eyebrow={cases.eyebrow}
      title={cases.title}
      intro={cases.intro}
      tone="muted"
      action={
        <AppLink
          to="projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
        >
          {cases.link} <ArrowRight size={16} aria-hidden />
        </AppLink>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.slice(0, 2).map((project, index) => (
          <Reveal key={project.id} delay={index * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
