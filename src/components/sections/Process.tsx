import { m } from 'motion/react'
import { useMessages } from '@/lib/i18n'
import { Section } from '../ui/Section'

/** The way of working as four acts on the dark stage, each turning in from the side. */
export function Process() {
  const { home } = useMessages()
  const { process } = home
  return (
    <Section id="process" act="ink" label="04" title={process.title} intro={process.intro}>
      <ol className="grid gap-x-16 gap-y-16 [perspective:1400px] md:grid-cols-2">
        {process.steps.map((step, index) => (
          <m.li
            key={step.title}
            initial={{ opacity: 0, rotateY: -35, x: -30 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, delay: index * 0.12 }}
            style={{ transformOrigin: '0% 50%' }}
            className={index % 2 === 1 ? 'md:mt-32' : ''}
          >
            <span
              aria-hidden
              className="block font-display text-[8rem] font-black leading-none text-transparent [-webkit-text-stroke:2px_rgb(var(--color-accent))] sm:text-[10rem]"
            >
              {index + 1}
            </span>
            <h3 className="mt-4 text-2xl sm:text-4xl">{step.title}</h3>
            <p className="mt-4 max-w-md text-lg text-muted">{step.description}</p>
          </m.li>
        ))}
      </ol>
    </Section>
  )
}
