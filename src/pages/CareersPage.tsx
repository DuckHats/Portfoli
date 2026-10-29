import { CareersForm } from '@/components/forms/CareersForm'
import { SEO } from '@/components/SEO'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { useMessages } from '@/lib/i18n'

export function CareersPage() {
  const { seo, careers } = useMessages()
  return (
    <>
      <SEO title={seo.careers.title} description={seo.careers.description} />
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
