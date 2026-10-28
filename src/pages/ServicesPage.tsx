import { SEO } from '@/components/SEO'
import { AppLink } from '@/components/ui/AppLink'
import { buttonStyles } from '@/components/ui/buttonStyles'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { serviceCategories } from '@/content/services'
import { useLocalize, useMessages } from '@/lib/i18n'

export function ServicesPage() {
  const { seo, services, home } = useMessages()
  const localize = useLocalize()
  return (
    <>
      <SEO title={seo.services.title} description={seo.services.description} />
      <PageHeader title={services.title} intro={services.intro} />
      <Container className="py-16 sm:py-24">
        <div className="space-y-20 sm:space-y-28">
          {serviceCategories.map((category) => (
            <section
              key={category.id}
              aria-labelledby={`${category.id}-title`}
              className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-16"
            >
              <h2
                id={`${category.id}-title`}
                className="text-3xl sm:text-4xl lg:sticky lg:top-28 lg:self-start"
              >
                {localize(category.title)}
              </h2>
              <div>
                <ul className="divide-y divide-line border-y-2 border-ink">
                  {category.items.map((item) => (
                    <li key={item.id} className="py-7">
                      <h3 className="text-2xl">{localize(item.name)}</h3>
                      {item.description && (
                        <p className="mt-2 max-w-prose text-muted">{localize(item.description)}</p>
                      )}
                      {item.tiers && (
                        <dl className="mt-5 space-y-2 text-sm">
                          {item.tiers.map((tier) => (
                            <div
                              key={tier.name.en}
                              className="grid gap-x-6 sm:grid-cols-[9rem_1fr]"
                            >
                              <dt className="font-semibold">{localize(tier.name)}</dt>
                              <dd className="text-muted">
                                {tier.description ? localize(tier.description) : ''}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      {item.note && (
                        <p className="mt-4 text-sm text-muted">
                          <span className="font-semibold text-ink">{services.noteLabel}:</span>{' '}
                          {localize(item.note)}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
                {category.note && (
                  <p className="mt-4 text-sm text-muted">{localize(category.note)}</p>
                )}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-20 max-w-prose border-l-2 border-accent pl-5 text-muted">
          {services.disclaimer}
        </p>

        <div className="mt-14 flex flex-col items-start gap-6 border-2 border-ink bg-tint p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12">
          <div>
            <h2 className="text-3xl sm:text-4xl">{home.cta.title}</h2>
            <p className="mt-2 text-muted">{home.cta.description}</p>
          </div>
          <AppLink to="contact" className={buttonStyles({ size: 'lg' })}>
            {home.cta.button}
          </AppLink>
        </div>
      </Container>
    </>
  )
}
