import { useMessages } from '@/lib/i18n'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function Process() {
  const { home } = useMessages()
  const { process } = home
  return (
    <Section id="process" eyebrow={process.eyebrow} title={process.title} intro={process.intro}>
      <ol className="grid gap-8 md:grid-cols-4">
        {process.steps.map((step, index) => (
          <li key={step.title} className="border-t border-ink pt-5">
            <Reveal delay={index * 0.05}>
              <p className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
