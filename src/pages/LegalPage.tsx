import { SEO } from '@/components/SEO'
import { pageJsonLd } from '@/lib/jsonLd'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { SITE } from '@/config/site'
import { useLanguage, useMessages, useT } from '@/lib/i18n'

// TODO(client): have the privacy policy and legal notice reviewed by a legal advisor and add the
// registered company details (legal name, tax ID, address) required for a commercial website.
export function LegalPage({ kind }: { kind: 'privacy' | 'legal' }) {
  const { seo, legalPages } = useMessages()
  const language = useLanguage()
  const t = useT()
  const sections = legalPages[kind].sections
  return (
    <>
      <SEO
        title={seo[kind].title}
        description={seo[kind].description}
        jsonLd={pageJsonLd(kind, language)}
      />
      <PageHeader title={seo[kind].title} />
      <div data-act="paper" className="bg-canvas">
        <Container className="py-20">
          <div className="max-w-prose space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl">{section.title}</h2>
                <p className="mt-2 text-muted">{section.body.replace('{email}', SITE.email)}</p>
              </section>
            ))}
            <p className="text-sm text-muted">
              {t('legalPages.updated')}: {SITE.legalUpdated}
            </p>
          </div>
        </Container>
      </div>
    </>
  )
}
