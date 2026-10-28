import { SEO } from '@/components/SEO'
import { CasesPreview } from '@/components/sections/CasesPreview'
import { CtaBand } from '@/components/sections/CtaBand'
import { Hero } from '@/components/sections/Hero'
import { Process } from '@/components/sections/Process'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { TeamPreview } from '@/components/sections/TeamPreview'
import { useMessages } from '@/lib/i18n'

export function HomePage() {
  const { seo } = useMessages()
  return (
    <>
      <SEO home title={seo.home.title} description={seo.home.description} />
      <Hero />
      <ServicesOverview />
      <CasesPreview />
      <Process />
      <TeamPreview />
      <CtaBand />
    </>
  )
}
