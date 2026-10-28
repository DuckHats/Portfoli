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
      title={team.title}
      intro={team.intro}
      action={
        <AppLink to="team" className="inline-flex items-center gap-2 font-medium text-accent">
          <span className="link-underline pb-0.5">{team.link}</span>{' '}
          <ArrowRight size={16} aria-hidden />
        </AppLink>
      }
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {teamMembers.map((member, index) => (
          <div key={member.id} className={index % 2 === 1 ? 'md:mt-10' : ''}>
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    </Section>
  )
}
