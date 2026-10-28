import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/content/projects'
import { useLocalize, useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Tag } from '../ui/Tag'

export function ProjectCard({ project }: { project: Project }) {
  const localize = useLocalize()
  const { projects } = useMessages()
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-ink/30">
      <div className="aspect-[16/9] overflow-hidden border-b border-line bg-canvas">
        <img
          src={project.image}
          alt={`${projects.imageOf} ${project.title}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Tag>{localize(project.category)}</Tag>
          <Tag>{localize(project.status)}</Tag>
        </div>
        <h3 className="text-xl font-semibold tracking-tight">
          <AppLink to="projects" param={project.id} className="after:absolute after:inset-0">
            {project.title}
          </AppLink>
        </h3>
        <p className="mt-2 flex-1 text-muted">{localize(project.summary)}</p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          {projects.view} <ArrowUpRight size={16} aria-hidden />
        </p>
      </div>
    </article>
  )
}
