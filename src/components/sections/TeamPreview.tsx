import { ArrowRight } from 'lucide-react'
import { teamMembers } from '@/content/team'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Section } from '../ui/Section'
import { MemberRow } from './MemberCard'

export function TeamPreview() {
  const { home } = useMessages()
  const { team } = home
  return (
    <Section
      id="team"
      no="05 / 06"
      title={team.title}
      intro={team.intro}
      action={
        <AppLink to="team" className="inline-flex items-center gap-2 font-medium text-accent-text">
          <span className="link-underline pb-0.5">{team.link}</span>{' '}
          <ArrowRight size={16} aria-hidden />
        </AppLink>
      }
    >
      <ul className="border-t border-ink">
        {teamMembers.map((member) => (
          <li key={member.id} className="border-b border-ink">
            <MemberRow member={member} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
