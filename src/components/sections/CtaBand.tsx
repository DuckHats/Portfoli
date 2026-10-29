import { ArrowRight } from 'lucide-react'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { buttonStyles } from '../ui/buttonStyles'
import { Container } from '../ui/Container'
import { Headline } from '../ui/Headline'
import { Magnetic } from '../ui/Magnetic'

/** The closing act: red, poster-size question, one button. */
export function CtaBand() {
  const { home } = useMessages()
  const { cta } = home
  return (
    <section
      data-act="red"
      aria-labelledby="cta-title"
      className="relative overflow-hidden bg-canvas text-ink"
    >
      <div
        aria-hidden
        className="mark-mask pointer-events-none absolute -right-24 -top-16 hidden aspect-square w-[36rem] bg-ink/10 sm:block"
      />
      <Container className="relative py-28 sm:py-40">
        <Headline
          as="h2"
          id="cta-title"
          text={cta.title}
          className="max-w-5xl text-5xl sm:text-8xl lg:text-9xl"
        />
        <div className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-lg sm:text-xl">{cta.description}</p>
          <Magnetic>
            <AppLink to="contact" className={buttonStyles({ size: 'lg' })}>
              {cta.button} <ArrowRight size={18} aria-hidden />
            </AppLink>
          </Magnetic>
        </div>
      </Container>
    </section>
  )
}
