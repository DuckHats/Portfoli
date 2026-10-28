import { SEO } from '@/components/SEO'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { SITE } from '@/config/site'
import { useMessages, useT } from '@/lib/i18n'

// TODO(client): have the privacy policy and legal notice reviewed by a legal advisor and add the
// registered company details (legal name, tax ID, address) required for a commercial website.
export function LegalPage({ kind }: { kind: 'privacy' | 'legal' }) {
  const { seo, legalPages } = useMessages()
  const t = useT()
  const sections = legalPages[kind].sections
  return (
    <>
      <SEO title={seo[kind].title} description={seo[kind].description} />
      <PageHeader title={seo[kind].title} />
      <Container className="py-16">
        <div className="max-w-prose space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
              <p className="mt-2 text-muted">{section.body.replace('{email}', SITE.email)}</p>
            </section>
          ))}
          <p className="text-sm text-muted">{t('legalPages.updated')}: 2026-10</p>
        </div>
      </Container>
    </>
  )
}
