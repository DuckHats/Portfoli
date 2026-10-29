import { useMessages } from '@/lib/i18n'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

/** The way of working as a vertical timeline: one accent node per step on a thin rule. */
export function Process() {
  const { home } = useMessages()
  const { process } = home
  return (
    <Section id="process" no="04 / 06" tone="tint" title={process.title} intro={process.intro}>
      <ol className="relative ml-2 border-l border-ink lg:ml-[calc(100%/12*2)]">
        {process.steps.map((step, index) => (
          <li key={step.title} className="relative pb-14 pl-10 last:pb-0 sm:pl-16">
            <span
              aria-hidden
              className="absolute -left-[7px] top-3 h-3.5 w-3.5 border border-ink bg-accent"
            />
            <Reveal delay={index * 0.06}>
              <p aria-hidden className="meta">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 text-4xl sm:text-5xl">{step.title}</h3>
              <p className="mt-4 max-w-prose text-lg text-muted">{step.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
