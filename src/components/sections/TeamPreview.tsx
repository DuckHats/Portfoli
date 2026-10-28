import { ArrowRight } from 'lucide-react'
import { teamMembers } from '@/content/team'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Section } from '../ui/Section'
import { MemberCard } from './MemberCard'

export function TeamPreview() {
  const { home } = useMessages()
  const { team } = home
  return (
    <Section
      id="team"
      eyebrow={team.eyebrow}
      title={team.title}
      intro={team.intro}
      action={
        <AppLink
          to="team"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
        >
          {team.link} <ArrowRight size={16} aria-hidden />
        </AppLink>
      }
    >
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {teamMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </Section>
  )
}
