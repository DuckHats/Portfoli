import { ArrowRight } from 'lucide-react'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

/** Services as an index table: number, name, description. The row shifts on hover. */
export function ServicesOverview() {
  const { home } = useMessages()
  const { services } = home
  return (
    <Section
      id="services"
      no="02 / 06"
      title={services.title}
      intro={services.intro}
      action={
        <AppLink
          to="services"
          className="inline-flex items-center gap-2 font-medium text-accent-text"
        >
          <span className="link-underline pb-0.5">{services.link}</span>{' '}
          <ArrowRight size={16} aria-hidden />
        </AppLink>
      }
    >
      <ul className="border-t border-ink">
        {services.items.map((item, index) => (
          <li key={item.title} className="border-b border-ink">
            <Reveal delay={index * 0.05}>
              <div className="row-shift grid gap-3 py-8 lg:grid-cols-12 lg:items-baseline lg:gap-8">
                <div className="flex items-baseline gap-6 lg:col-span-7">
                  <span aria-hidden className="meta w-8 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-4xl sm:text-6xl">{item.title}</h3>
                </div>
                <p className="text-lg text-muted lg:col-span-5">{item.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
