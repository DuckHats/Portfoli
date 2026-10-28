import { SEO } from '@/components/SEO'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { SITE } from '@/config/site'
import { useMessages, useT } from '@/lib/i18n'

export function AboutPage() {
  const { seo, about } = useMessages()
  const t = useT()
  return (
    <>
      <SEO title={seo.about.title} description={seo.about.description} />
      <PageHeader title={about.title} intro={about.intro} />
      <Container className="space-y-20 py-16">
        <section aria-labelledby="values">
          <h2 id="values" className="text-2xl font-semibold tracking-tight">
            {about.valuesTitle}
          </h2>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {about.values.map((value, index) => (
              <li key={value.title} className="border-t border-ink pt-5">
                <p className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{value.title}</h3>
                <p className="mt-2 text-sm text-muted">{value.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-12 md:grid-cols-2">
          <section aria-labelledby="origin">
            <h2 id="origin" className="text-2xl font-semibold tracking-tight">
              {about.originTitle}
            </h2>
            <p className="mt-3 text-muted">{t('about.originBody', { year: SITE.foundedYear })}</p>
          </section>
          <section aria-labelledby="approach">
            <h2 id="approach" className="text-2xl font-semibold tracking-tight">
              {about.approachTitle}
            </h2>
            <p className="mt-3 text-muted">{about.approachBody}</p>
          </section>
        </div>
      </Container>
    </>
  )
}
