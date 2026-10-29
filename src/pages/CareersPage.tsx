import { CareersForm } from '@/components/forms/CareersForm'
import { SEO } from '@/components/SEO'
import { pageJsonLd } from '@/lib/jsonLd'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { useMessages, useLanguage } from '@/lib/i18n'

export function CareersPage() {
  const language = useLanguage()
  const { seo, careers } = useMessages()
  return (
    <>
      <SEO
        title={seo.careers.title}
        description={seo.careers.description}
        jsonLd={pageJsonLd('careers', language)}
      />
      <PageHeader title={careers.title} intro={careers.intro} />
      <div data-act="paper" className="bg-canvas">
        <Container className="py-20 sm:py-28">
          <div className="max-w-xl">
            <CareersForm />
          </div>
        </Container>
      </div>
    </>
  )
}
