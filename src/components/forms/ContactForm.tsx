import {
  ArrowLeft,
  ArrowRight,
  Globe,
  Layers,
  LayoutDashboard,
  Lightbulb,
  PenTool,
  RefreshCw,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatePresence, m } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { useMessages, useT } from '@/lib/i18n'
import type { ProjectType, ValidationKey } from '@/lib/schemas'
import {
  CONTACT_STEPS,
  FEATURES_BY_TYPE,
  PROJECT_BUDGETS,
  PROJECT_STAGES,
  PROJECT_TIMELINES,
  PROJECT_TYPES,
  contactSchema,
  contactStepSchema,
  fieldErrors,
} from '@/lib/schemas'
import { buttonStyles } from '../ui/buttonStyles'
import { FormField } from '../ui/FormField'
import { inputStyles } from '../ui/inputStyles'
import { SubmitButton } from '../ui/SubmitButton'
import { ChipGroup, ChoiceCards, SelectField } from './BriefControls'
import { ConsentNote } from './ConsentNote'
import { FormStatus } from './FormStatus'
import { Honeypot } from './Honeypot'

const STEPS = ['type', 'stage', 'features', 'plan', 'contact', 'summary'] as const
const SUMMARY = STEPS.length - 1

const TYPE_ICONS: Record<ProjectType, LucideIcon> = {
  website: Globe,
  ecommerce: ShoppingBag,
  webapp: LayoutDashboard,
  mobile: Smartphone,
  design: PenTool,
  other: Sparkles,
}
const STAGE_ICONS: Record<(typeof PROJECT_STAGES)[number], LucideIcon> = {
  idea: Lightbulb,
  design: Layers,
  existing: RefreshCw,
}

const EMPTY = {
  projectType: '',
  projectTypeOther: '',
  stage: '',
  currentUrl: '',
  features: [] as string[],
  goal: '',
  timeline: '',
  budget: '',
  name: '',
  email: '',
  company: '',
  message: '',
}
type Brief = typeof EMPTY

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * "Let's talk about your project" as a guided brief: one question per screen, so the request
 * arrives broken down into what we need to judge it. Each step validates only its own fields;
 * the last screen reviews every answer (each one editable) before sending.
 */
export function ContactForm() {
  const { contact, validation } = useMessages()
  const t = useT()
  const { form: copy } = contact
  const { status, submit, reset } = useFormSubmit('/api/submit-contact')
  const [brief, setBrief] = useState<Brief>(EMPTY)
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  // Editing from the summary sends you straight back to it.
  const [fromSummary, setFromSummary] = useState(false)
  const [errors, setErrors] = useState<Record<string, ValidationKey>>({})
  const heading = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)
  const advance = useRef<number | undefined>(undefined)

  // Focus lands on the new question once the old one has left (never on first render), and on
  // the confirmation after sending (and back on the first question when starting over).
  const focusHeading = () => {
    if (moved.current) heading.current?.focus({ preventScroll: true })
  }
  useEffect(() => {
    if (status === 'success' || status === 'idle') focusHeading()
  }, [status])
  useEffect(() => () => window.clearTimeout(advance.current), [])

  const set = <K extends keyof Brief>(key: K, value: Brief[K]) => {
    setBrief((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      const rest = { ...current }
      delete rest[key]
      return rest
    })
  }

  const goTo = (target: number) => {
    window.clearTimeout(advance.current)
    moved.current = true
    setDirection(target >= step ? 1 : -1)
    setStep(target)
  }
  const forward = () => {
    if (fromSummary) setFromSummary(false)
    goTo(fromSummary ? SUMMARY : step + 1)
  }

  const next = () => {
    const result = contactStepSchema(step).safeParse(brief)
    if (!result.success) return setErrors(fieldErrors(result.error))
    setErrors({})
    forward()
  }

  const pickType = (value: string, byPointer: boolean) => {
    const allowed: readonly string[] = FEATURES_BY_TYPE[value as ProjectType]
    setBrief((current) => ({
      ...current,
      projectType: value,
      features: current.features.filter((feature) => allowed.includes(feature)),
    }))
    setErrors({})
    // A click on a complete answer moves on by itself, after a beat to see the choice land.
    if (byPointer && value !== 'other') advance.current = window.setTimeout(forward, 280)
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (step < SUMMARY) return next()
    const parsed = contactSchema.safeParse(brief)
    if (!parsed.success) {
      const found = fieldErrors(parsed.error)
      setErrors(found)
      setFromSummary(true)
      goTo(
        Math.max(
          0,
          CONTACT_STEPS.findIndex((fields) => fields.some((f) => f in found)),
        ),
      )
      return
    }
    const data = new FormData()
    for (const [key, value] of Object.entries(brief)) {
      data.append(key, Array.isArray(value) ? JSON.stringify(value) : value)
    }
    data.append('website', String(new FormData(event.currentTarget).get('website') ?? ''))
    await submit(data)
  }

  const startOver = () => {
    reset()
    setBrief(EMPTY)
    setErrors({})
    setFromSummary(false)
    moved.current = true
    setDirection(-1)
    setStep(0)
  }

  const error = (field: string) => (errors[field] ? validation[errors[field]] : undefined)
  const aria = (field: string) => ({
    'aria-invalid': errors[field] ? (true as const) : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  })
  const options = <T extends string>(values: readonly T[], labels: Record<T, string>) =>
    values.map((value) => ({ value, label: labels[value] }))

  if (status === 'success') {
    return (
      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-surface p-8 ring-1 ring-ink/10 sm:p-12"
      >
        <svg aria-hidden viewBox="0 0 64 64" className="h-16 w-16 text-accent">
          <m.circle
            cx="32"
            cy="32"
            r="29"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <m.path
            d="M20 33l8 8 16-17"
            fill="none"
            stroke="currentColor"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.45, ease: 'easeOut' }}
          />
        </svg>
        <h2 ref={heading} tabIndex={-1} className="mt-8 text-4xl outline-none sm:text-5xl">
          {copy.success}
        </h2>
        <p role="status" className="mt-4 max-w-md text-lg text-muted">
          {copy.successBody}
        </p>
        <button
          type="button"
          onClick={startOver}
          className={`${buttonStyles({ variant: 'secondary' })} mt-8`}
        >
          {copy.another}
        </button>
      </m.div>
    )
  }

  const id = STEPS[step]!
  const title = copy.steps[id].title
  const hint = copy.steps[id].hint
  const type = brief.projectType as ProjectType | ''

  const body: Record<(typeof STEPS)[number], ReactNode> = {
    type: (
      <div className="space-y-5">
        <ChoiceCards
          name="projectType"
          value={brief.projectType}
          onChange={pickType}
          error={error('projectType')}
          options={PROJECT_TYPES.map((value) => ({
            value,
            ...copy.projectTypes[value],
            Icon: TYPE_ICONS[value],
          }))}
        />
        {brief.projectType === 'other' && (
          <FormField
            id="projectTypeOther"
            label={copy.projectTypeOther}
            error={error('projectTypeOther')}
          >
            <input
              id="projectTypeOther"
              type="text"
              value={brief.projectTypeOther}
              onChange={(e) => set('projectTypeOther', e.target.value)}
              placeholder={copy.projectTypeOtherPlaceholder}
              className={inputStyles}
              {...aria('projectTypeOther')}
            />
          </FormField>
        )}
      </div>
    ),
    stage: (
      <div className="space-y-5">
        <ChoiceCards
          name="stage"
          value={brief.stage}
          onChange={(value) => set('stage', value)}
          error={error('stage')}
          options={PROJECT_STAGES.map((value) => ({
            value,
            ...copy.stages[value],
            Icon: STAGE_ICONS[value],
          }))}
        />
        {brief.stage === 'existing' && (
          <FormField id="currentUrl" label={copy.currentUrl} error={error('currentUrl')}>
            <input
              id="currentUrl"
              type="url"
              inputMode="url"
              value={brief.currentUrl}
              onChange={(e) => set('currentUrl', e.target.value)}
              placeholder={copy.currentUrlPlaceholder}
              className={inputStyles}
              {...aria('currentUrl')}
            />
          </FormField>
        )}
      </div>
    ),
    features: (
      <div className="space-y-8">
        <ChipGroup
          legend={copy.featuresLabel}
          values={brief.features}
          onChange={(values) => set('features', values)}
          options={(type ? FEATURES_BY_TYPE[type] : FEATURES_BY_TYPE.other).map((value) => ({
            value,
            label: copy.features[value],
          }))}
        />
        <FormField id="goal" label={copy.goal} error={error('goal')}>
          <input
            id="goal"
            type="text"
            value={brief.goal}
            onChange={(e) => set('goal', e.target.value)}
            placeholder={copy.goalPlaceholder}
            className={inputStyles}
            {...aria('goal')}
          />
        </FormField>
      </div>
    ),
    plan: (
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id="timeline"
          label={copy.timeline}
          placeholder={copy.timelinePlaceholder}
          value={brief.timeline}
          onChange={(value) => set('timeline', value)}
          error={error('timeline')}
          options={options(PROJECT_TIMELINES, copy.timelines)}
        />
        <SelectField
          id="budget"
          label={copy.budget}
          placeholder={copy.budgetPlaceholder}
          value={brief.budget}
          onChange={(value) => set('budget', value)}
          error={error('budget')}
          options={options(PROJECT_BUDGETS, copy.budgets)}
        />
      </div>
    ),
    contact: (
      <div className="grid gap-5 sm:grid-cols-2">
        {(
          [
            ['name', 'text', 'name'],
            ['email', 'email', 'email'],
          ] as const
        ).map(([field, inputType, autoComplete]) => (
          <FormField key={field} id={field} label={copy[field]} error={error(field)}>
            <input
              id={field}
              type={inputType}
              autoComplete={autoComplete}
              value={brief[field]}
              onChange={(e) => set(field, e.target.value)}
              placeholder={copy[`${field}Placeholder`]}
              className={inputStyles}
              {...aria(field)}
            />
          </FormField>
        ))}
        <div className="sm:col-span-2">
          <FormField id="company" label={copy.company} error={error('company')}>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              value={brief.company}
              onChange={(e) => set('company', e.target.value)}
              placeholder={copy.companyPlaceholder}
              className={inputStyles}
              {...aria('company')}
            />
          </FormField>
        </div>
        <div className="sm:col-span-2">
          <FormField id="message" label={copy.message} error={error('message')}>
            <textarea
              id="message"
              rows={4}
              value={brief.message}
              onChange={(e) => set('message', e.target.value)}
              placeholder={copy.messagePlaceholder}
              className={inputStyles}
              {...aria('message')}
            />
          </FormField>
        </div>
      </div>
    ),
    summary: (
      <dl className="divide-y divide-ink/15 rounded-2xl bg-surface ring-1 ring-ink/10">
        {(
          [
            [
              0,
              type === 'other'
                ? `${copy.projectTypes.other.label}: ${brief.projectTypeOther}`
                : type && copy.projectTypes[type].label,
            ],
            [
              1,
              [
                brief.stage && copy.stages[brief.stage as (typeof PROJECT_STAGES)[number]].label,
                brief.stage === 'existing' && brief.currentUrl,
              ],
            ],
            [
              2,
              [
                brief.goal,
                brief.features
                  .map((f) => copy.features[f as keyof typeof copy.features])
                  .join(' · '),
              ],
            ],
            [
              3,
              [
                brief.timeline && copy.timelines[brief.timeline as keyof typeof copy.timelines],
                brief.budget && copy.budgets[brief.budget as keyof typeof copy.budgets],
              ],
            ],
            [4, [`${brief.name} · ${brief.email}`, brief.company, brief.message]],
          ] as const
        ).map(([index, value]) => (
          <div key={index} className="relative p-5 pr-20 sm:p-6 sm:pr-24">
            <dt className="label">{copy.steps[STEPS[index]].title}</dt>
            <dd className="mt-2 space-y-1 break-words">
              {[value]
                .flat()
                .filter(Boolean)
                .map((line) => (
                  <p key={String(line)}>{line}</p>
                ))}
              <button
                type="button"
                onClick={() => {
                  setFromSummary(true)
                  goTo(index)
                }}
                aria-label={`${copy.edit}: ${copy.steps[STEPS[index]].title}`}
                className="link-underline absolute right-5 top-5 pb-0.5 text-sm font-semibold text-accent-text sm:right-6 sm:top-6"
              >
                {copy.edit}
              </button>
            </dd>
          </div>
        ))}
      </dl>
    ),
  }

  const Group = id === 'summary' ? 'div' : 'fieldset'

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot />

      <div className="flex items-center gap-4">
        <span aria-hidden className="label tabular-nums text-ink">
          {pad(step + 1)} / {pad(STEPS.length)}
        </span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
          <m.div
            className="h-full origin-left rounded-full bg-accent"
            initial={false}
            animate={{ scaleX: (step + 1) / STEPS.length }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {t('contact.form.stepOf', { n: step + 1, total: STEPS.length })}
      </p>

      <AnimatePresence mode="wait" initial={false} custom={direction} onExitComplete={focusHeading}>
        <m.div
          key={step}
          custom={direction}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: d * 48 }),
            center: { opacity: 1, x: 0 },
            exit: (d: number) => ({ opacity: 0, x: d * -48 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <Group
            {...(Group === 'fieldset' ? { 'aria-labelledby': 'brief-title' } : {})}
            aria-describedby="brief-hint"
          >
            <h2
              id="brief-title"
              ref={heading}
              tabIndex={-1}
              className="text-4xl outline-none sm:text-5xl"
            >
              {title}
            </h2>
            <p id="brief-hint" className="mt-3 text-muted">
              {hint}
            </p>
            <div className="mt-8">{body[id]}</div>
          </Group>
        </m.div>
      </AnimatePresence>

      <div className="mt-10 space-y-5">
        {step === SUMMARY && <ConsentNote />}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => goTo(step - 1)}
              className={buttonStyles({ variant: 'ghost', size: 'lg' })}
            >
              <ArrowLeft size={18} aria-hidden /> {copy.back}
            </button>
          ) : (
            <span />
          )}
          {step === SUMMARY ? (
            <SubmitButton status={status} label={copy.submit} sendingLabel={copy.sending} />
          ) : (
            <button type="submit" className={buttonStyles({ size: 'lg' })}>
              {fromSummary ? copy.backToSummary : copy.next} <ArrowRight size={18} aria-hidden />
            </button>
          )}
        </div>
        <FormStatus
          status={status === 'error' ? 'error' : 'idle'}
          success={copy.success}
          error={copy.error}
        />
      </div>
    </form>
  )
}
