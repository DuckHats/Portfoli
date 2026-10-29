import { ArrowRight, Plus } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { useId, useState } from 'react'
import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'
import { Section } from '../ui/Section'

/**
 * The red act. Services set as giant type; the open row turns toward the viewer and reveals its
 * description. Rows are real disclosure buttons, so hover, click, tap and keyboard all work.
 */
export function ServicesOverview() {
  const { home } = useMessages()
  const { services } = home
  const [open, setOpen] = useState(0)
  const baseId = useId()

  return (
    <Section
      id="services"
      act="red"
      label="02"
      title={services.title}
      intro={services.intro}
      action={
        <AppLink to="services" className="inline-flex items-center gap-2 font-semibold">
          <span className="link-underline pb-0.5">{services.link}</span>{' '}
          <ArrowRight size={16} aria-hidden />
        </AppLink>
      }
    >
      <ul className="[perspective:1400px]">
        {services.items.map((item, index) => {
          const isOpen = open === index
          const panelId = `${baseId}-${index}`
          return (
            <m.li
              key={item.title}
              layout
              animate={{ rotateX: isOpen ? 0 : 8 }}
              style={{ transformOrigin: '50% 100%' }}
              className="border-t border-ink/25 last:border-b"
              onPointerEnter={(event) => event.pointerType === 'mouse' && setOpen(index)}
            >
              <h3 className="text-[1.7rem] sm:text-5xl md:text-6xl lg:text-7xl">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(index)}
                  onFocus={() => setOpen(index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left uppercase"
                >
                  {item.title}
                  <Plus
                    size={32}
                    aria-hidden
                    className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={panelId}
                    key="panel"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-8 text-lg sm:text-xl">{item.description}</p>
                  </m.div>
                )}
              </AnimatePresence>
            </m.li>
          )
        })}
      </ul>
    </Section>
  )
}
