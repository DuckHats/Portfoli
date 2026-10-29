import { SEO } from '@/components/SEO'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { SITE } from '@/config/site'
import { useMessages, useT } from '@/lib/i18n'

export function AboutPage() {
  const { seo, about } = useMessages()
  const t = useT()
  return (
    <>
      <SEO title={seo.about.title} description={seo.about.description} />
      <PageHeader title={about.title} intro={about.intro} />
      <section data-act="paper" aria-labelledby="values" className="bg-canvas text-ink">
        <Container className="py-24 sm:py-32">
          <h2 id="values" className="text-4xl sm:text-6xl">
            {about.valuesTitle}
          </h2>
          <ol className="mt-16 space-y-4">
            {about.values.map((value, index) => (
              <li key={value.title}>
                <Reveal delay={index * 0.08}>
                  <div className="grid gap-4 rounded-2xl bg-surface p-8 ring-1 ring-ink/10 sm:p-12 lg:grid-cols-12 lg:items-baseline">
                    <span
                      aria-hidden
                      className="font-display text-6xl font-black text-accent lg:col-span-2"
                    >
                      {index + 1}
                    </span>
                    <h3 className="text-3xl sm:text-4xl lg:col-span-5 lg:text-2xl xl:text-3xl">
                      {value.title}
                    </h3>
                    <p className="text-lg text-muted lg:col-span-5">{value.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div data-act="ink" className="bg-canvas text-ink">
        <Container className="grid gap-16 py-24 sm:py-32 md:grid-cols-2">
          <section aria-labelledby="origin">
            <h2 id="origin" className="text-4xl md:text-3xl lg:text-4xl xl:text-5xl">
              {about.originTitle}
            </h2>
            <p className="mt-6 text-lg text-muted">
              {t('about.originBody', { year: SITE.foundedYear })}
            </p>
          </section>
          <section aria-labelledby="approach">
            <h2 id="approach" className="text-4xl md:text-3xl lg:text-4xl xl:text-5xl">
              {about.approachTitle}
            </h2>
            <p className="mt-6 text-lg text-muted">{about.approachBody}</p>
          </section>
        </Container>
      </div>
    </>
  )
}
