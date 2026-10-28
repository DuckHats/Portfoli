import { ArrowRight } from 'lucide-react'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function ServicesOverview() {
  const { home } = useMessages()
  const { services } = home
  return (
    <Section
      id="services"
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
      <ul className="divide-y divide-line border-y-2 border-ink">
        {services.items.map((item, index) => (
          <li key={item.title}>
            <Reveal delay={index * 0.05}>
              <div className="grid gap-3 py-8 transition-colors hover:bg-tint md:grid-cols-[1fr_1.2fr] md:items-baseline md:gap-12 md:px-4">
                <h3 className="text-3xl sm:text-4xl">{item.title}</h3>
                <p className="text-lg text-muted">{item.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
