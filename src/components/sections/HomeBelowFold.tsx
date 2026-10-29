import { useMessages } from '@/lib/i18n'
import { ActIndex } from './ActIndex'
import { CasesPreview } from './CasesPreview'
import { CtaBand } from './CtaBand'
import { Process } from './Process'
import { ServicesOverview } from './ServicesOverview'
import { TeamPreview } from './TeamPreview'

/** Everything after the hero and marquee: its own chunk, so the first screen paints sooner. */
export function HomeBelowFold() {
  const { nav, home } = useMessages()
  const acts = [
    { id: 'hero', label: nav.home },
    { id: 'services', label: home.services.title },
    { id: 'cases', label: home.cases.title },
    { id: 'process', label: home.process.title },
    { id: 'team', label: home.team.title },
  ]
  return (
    <>
      <ActIndex acts={acts} />
      <ServicesOverview />
      <CasesPreview />
      <Process />
      <TeamPreview />
      <CtaBand />
    </>
  )
}
