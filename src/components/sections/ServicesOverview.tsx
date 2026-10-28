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
      eyebrow={services.eyebrow}
      title={services.title}
      intro={services.intro}
      action={
        <AppLink
          to="services"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
        >
          {services.link} <ArrowRight size={16} aria-hidden />
        </AppLink>
      }
    >
      <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {services.items.map((item, index) => (
          <li key={item.title} className="bg-surface p-6">
            <Reveal delay={index * 0.05}>
              <p className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
