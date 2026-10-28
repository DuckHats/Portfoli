import { useMessages } from '@/lib/i18n'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function Process() {
  const { home } = useMessages()
  const { process } = home
  return (
    <Section id="process" tone="tint" title={process.title} intro={process.intro}>
      <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
        {process.steps.map((step, index) => (
          <li key={step.title} className={index % 2 === 1 ? 'md:mt-14' : ''}>
            <Reveal delay={index * 0.06}>
              <span
                aria-hidden
                className="font-display text-8xl font-bold leading-none text-transparent [-webkit-text-stroke:2px_rgb(var(--color-ink))]"
              >
                {index + 1}
              </span>
              <h3 className="mt-5 text-2xl">{step.title}</h3>
              <p className="mt-3 text-muted">{step.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
