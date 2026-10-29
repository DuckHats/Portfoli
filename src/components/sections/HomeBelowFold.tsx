import { CasesPreview } from './CasesPreview'
import { CtaBand } from './CtaBand'
import { Process } from './Process'
import { ServicesOverview } from './ServicesOverview'
import { TeamPreview } from './TeamPreview'

/** Everything after the hero and marquee: its own chunk, so the first screen paints sooner. */
export function HomeBelowFold() {
  return (
    <>
      <ServicesOverview />
      <CasesPreview />
      <Process />
      <TeamPreview />
      <CtaBand />
    </>
  )
}
