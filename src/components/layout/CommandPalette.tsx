import { ArrowRight, Copy, Languages, Search, SunMoon } from 'lucide-react'
import { m } from 'motion/react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SITE } from '@/config/site'
import { projects } from '@/content/projects'
import { useLanguage, useLocalize, useMessages, useT } from '@/lib/i18n'
import { LANGUAGES, LANGUAGE_NAMES, storeLanguage } from '@/lib/languages'
import { buildPath, projectPath, switchLanguagePath } from '@/lib/routes'
import type { RouteKey } from '@/lib/routes'
import { toggleTheme } from '@/lib/theme'

interface Command {
  id: string
  group: string
  label: string
  hint?: string
  icon: ReactNode
  run: () => void
}

const PAGES = [
  'home',
  'services',
  'projects',
  'team',
  'about',
  'contact',
  'careers',
] as const satisfies readonly RouteKey[]

/** Case- and accent-insensitive, so "serveis" finds "Serveis" and "solucio" finds "Solució". */
const fold = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/**
 * Quick search: jump to any page or project, switch language or theme, copy the email address.
 * Focus stays in the search box (options are announced with aria-activedescendant); Escape or a
 * click outside closes it and focus returns to where it was.
 */
export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const { nav, palette } = useMessages()
  const t = useT()
  const localize = useLocalize()
  const language = useLanguage()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const listId = useId()
  const input = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [status, setStatus] = useState('')

  const commands = useMemo<Command[]>(() => {
    const go = (path: string) => () => {
      navigate(path)
      onClose()
    }
    return [
      ...PAGES.map((key) => ({
        id: `page-${key}`,
        group: palette.pages,
        label: nav[key],
        icon: <ArrowRight size={16} aria-hidden />,
        run: go(buildPath(language, key)),
      })),
      ...projects.map((project) => ({
        id: `project-${project.id}`,
        group: palette.projects,
        label: project.title,
        hint: localize(project.category),
        icon: <ArrowRight size={16} aria-hidden />,
        run: go(projectPath(language, project.id)),
      })),
      {
        id: 'theme',
        group: palette.actions,
        label: palette.theme,
        icon: <SunMoon size={16} aria-hidden />,
        run: () => {
          toggleTheme()
          onClose()
        },
      },
      ...LANGUAGES.filter((code) => code !== language).map((code) => ({
        id: `lang-${code}`,
        group: palette.actions,
        label: t('palette.language', { name: LANGUAGE_NAMES[code] }),
        icon: <Languages size={16} aria-hidden />,
        run: () => {
          storeLanguage(code)
          navigate(switchLanguagePath(pathname, code))
          onClose()
        },
      })),
      {
        id: 'email',
        group: palette.actions,
        label: palette.copyEmail,
        hint: SITE.email,
        icon: <Copy size={16} aria-hidden />,
        run: () => {
          void navigator.clipboard?.writeText(SITE.email).then(() => setStatus(palette.copied))
        },
      },
    ]
  }, [language, localize, nav, navigate, onClose, palette, pathname, t])

  const results = useMemo(() => {
    const needle = fold(query.trim())
    return needle
      ? commands.filter((command) =>
          fold(`${command.label} ${command.hint ?? ''}`).includes(needle),
        )
      : commands
  }, [commands, query])

  // Remember what had focus so it gets it back when the palette closes.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    input.current?.focus()
    return () => previous?.focus?.()
  }, [])

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((index) => (results.length ? (index + 1) % results.length : 0))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => (results.length ? (index - 1 + results.length) % results.length : 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      results[active]?.run()
    } else if (event.key === 'Tab') {
      // The search box is the only focus stop inside the dialog.
      event.preventDefault()
    }
  }

  const optionId = (index: number) => `${listId}-${index}`
  // Results keep their global index (for the keyboard) while being shown under group headings.
  const groups = results.reduce<{ name: string; items: { command: Command; index: number }[] }[]>(
    (list, command, index) => {
      const last = list[list.length - 1]
      if (last?.name === command.group) last.items.push({ command, index })
      else list.push({ name: command.group, items: [{ command, index }] })
      return list
    },
    [],
  )

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]">
      <m.div
        aria-hidden
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <m.div
        role="dialog"
        aria-modal="true"
        aria-label={palette.title}
        data-act="ink"
        initial={{ opacity: 0, scale: 0.94, y: -16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-canvas text-ink shadow-[0_40px_100px_-20px_rgb(0_0_0/0.7)] ring-1 ring-ink/15"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-ink/15 px-5">
          <Search size={18} aria-hidden className="text-muted" />
          <input
            ref={input}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results.length ? optionId(active) : undefined}
            aria-autocomplete="list"
            aria-label={palette.placeholder}
            placeholder={palette.placeholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
            }}
            className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
          <kbd className="label rounded border border-ink/20 px-1.5 py-0.5">Esc</kbd>
        </div>

        <div
          id={listId}
          role="listbox"
          aria-label={palette.title}
          className="max-h-[50vh] overflow-y-auto p-2"
        >
          {groups.map(({ name, items }, group) => (
            <div key={name} role="group" aria-labelledby={`${listId}-g${group}`}>
              <p id={`${listId}-g${group}`} className="label px-3 pb-1 pt-3">
                {name}
              </p>
              {items.map(({ command, index }) => {
                const selected = index === active
                return (
                  // Keys are handled once on the dialog (aria-activedescendant pattern), not per option.
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                  <div
                    key={command.id}
                    id={optionId(index)}
                    tabIndex={-1}
                    role="option"
                    aria-selected={selected}
                    onPointerMove={() => setActive(index)}
                    onClick={command.run}
                    className="relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5"
                  >
                    {selected && (
                      <m.span
                        layoutId="palette-active"
                        aria-hidden
                        className="absolute inset-0 rounded-xl bg-ink/10"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative text-muted">{command.icon}</span>
                    <span className="relative flex-1 font-medium">{command.label}</span>
                    {command.hint && (
                      <span className="relative text-sm text-muted">{command.hint}</span>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        {results.length === 0 && (
          <p className="px-5 pb-6 text-center text-muted">{palette.empty}</p>
        )}
        <p aria-live="polite" className="sr-only">
          {status}
        </p>
      </m.div>
    </div>
  )
}
