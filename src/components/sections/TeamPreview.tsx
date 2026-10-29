import { ArrowRight } from 'lucide-react'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Section } from '../ui/Section'
import { TeamStrip } from './TeamStrip'

export function TeamPreview() {
  const { home } = useMessages()
  const { team } = home
  return (
    <Section
      id="team"
      label="05"
      title={team.title}
      intro={team.intro}
      action={
        <AppLink to="about" className="inline-flex items-center gap-2 font-medium text-accent-text">
          <span className="link-underline pb-0.5">{team.link}</span>{' '}
          <ArrowRight size={16} aria-hidden />
        </AppLink>
      }
    >
      <TeamStrip />
    </Section>
  )
}
