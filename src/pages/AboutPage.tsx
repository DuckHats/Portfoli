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
      <Container className="space-y-24 py-16 sm:py-24">
        <section aria-labelledby="values">
          <h2 id="values" className="text-3xl sm:text-4xl">
            {about.valuesTitle}
          </h2>
          <ul className="mt-12 grid gap-12 md:grid-cols-3 md:gap-10">
            {about.values.map((value, index) => (
              <li
                key={value.title}
                className={index === 1 ? 'md:mt-12' : index === 2 ? 'md:mt-24' : ''}
              >
                <span aria-hidden className="block h-0.5 w-10 bg-accent" />
                <h3 className="mt-5 text-2xl">{value.title}</h3>
                <p className="mt-3 text-muted">{value.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-12 border-2 border-ink bg-tint p-8 sm:p-14 md:grid-cols-2">
          <section aria-labelledby="origin">
            <h2 id="origin" className="text-3xl">
              {about.originTitle}
            </h2>
            <p className="mt-4 text-lg text-ink/85">
              {t('about.originBody', { year: SITE.foundedYear })}
            </p>
          </section>
          <section aria-labelledby="approach">
            <h2 id="approach" className="text-3xl">
              {about.approachTitle}
            </h2>
            <p className="mt-4 text-lg text-ink/85">{about.approachBody}</p>
          </section>
        </div>
      </Container>
    </>
  )
}
