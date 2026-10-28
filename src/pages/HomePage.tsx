import { SEO } from '@/components/SEO'
import { CasesPreview } from '@/components/sections/CasesPreview'
import { CtaBand } from '@/components/sections/CtaBand'
import { Hero } from '@/components/sections/Hero'
import { Process } from '@/components/sections/Process'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { TeamPreview } from '@/components/sections/TeamPreview'
import { TechMarquee } from '@/components/sections/TechMarquee'
import { useSectionKeys } from '@/hooks/useSectionKeys'
import { useLanguage, useMessages } from '@/lib/i18n'
import { websiteJsonLd } from '@/lib/seo'

export function HomePage() {
  const { seo } = useMessages()
  const language = useLanguage()
  useSectionKeys()
  return (
    <>
      <SEO
        home
        title={seo.home.title}
        description={seo.home.description}
        jsonLd={websiteJsonLd(language)}
      />
      <Hero />
      <TechMarquee />
      <ServicesOverview />
      <CasesPreview />
      <Process />
      <TeamPreview />
      <CtaBand />
    </>
  )
}
