import { Suspense, lazy } from 'react'
import { SEO } from '@/components/SEO'
import { Hero } from '@/components/sections/Hero'
import { TechMarquee } from '@/components/sections/TechMarquee'
import { useSectionKeys } from '@/hooks/useSectionKeys'
import { useLanguage, useMessages } from '@/lib/i18n'
import { websiteJsonLd } from '@/lib/seo'

const HomeBelowFold = lazy(() =>
  import('@/components/sections/HomeBelowFold').then((module) => ({
    default: module.HomeBelowFold,
  })),
)

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
      {/* Tall placeholder keeps the footer out of view while the rest of the page loads. */}
      <Suspense fallback={<div className="min-h-screen" aria-hidden />}>
        <HomeBelowFold />
      </Suspense>
    </>
  )
}
