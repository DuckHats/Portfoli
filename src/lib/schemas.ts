// Shared by the browser forms and the serverless handlers in /api: keep it free of
// aliases and DOM/Node-only imports. Issue messages are keys of `messages.validation`.
import { z } from 'zod'

export const CAREER_ROLES = [
  'frontend',
  'backend',
  'fullstack',
  'design',
  'product',
  'marketing',
  'other',
] as const

/** The project brief behind "Let's talk about your project". */
export const PROJECT_TYPES = [
  'website',
  'ecommerce',
  'webapp',
  'mobile',
  'design',
  'other',
] as const
export const PROJECT_STAGES = ['idea', 'design', 'existing'] as const
export const PROJECT_FEATURES = [
  'payments',
  'catalog',
  'booking',
  'accounts',
  'admin',
  'cms',
  'multilingual',
  'integrations',
  'notifications',
] as const
export const PROJECT_TIMELINES = ['asap', 'short', 'medium', 'flexible'] as const
export const PROJECT_BUDGETS = ['small', 'medium', 'large', 'xlarge', 'unknown'] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]
export type ProjectFeature = (typeof PROJECT_FEATURES)[number]

/** The features worth asking about for each kind of project, most likely first. */
export const FEATURES_BY_TYPE: Record<ProjectType, readonly ProjectFeature[]> = {
  website: ['cms', 'multilingual', 'booking', 'integrations', 'notifications'],
  ecommerce: ['payments', 'catalog', 'accounts', 'admin', 'multilingual', 'integrations'],
  webapp: ['accounts', 'admin', 'payments', 'integrations', 'notifications', 'multilingual'],
  mobile: ['accounts', 'notifications', 'payments', 'booking', 'integrations', 'admin'],
  design: ['multilingual', 'cms', 'accounts'],
  other: PROJECT_FEATURES,
}

export const LIMITS = {
  name: 100,
  company: 100,
  goal: 300,
  email: 254,
  message: 4000,
  role: 100,
  link: 300,
  links: 5,
  cvBytes: 5 * 1024 * 1024,
} as const

export type ValidationKey = 'required' | 'email' | 'tooLong' | 'fileType' | 'fileSize' | 'url'

const text = (max: number) => z.string().trim().min(1, 'required').max(max, 'tooLong')

const email = z
  .string()
  .trim()
  .min(1, 'required')
  .max(LIMITS.email, 'tooLong')
  .pipe(z.email('email'))

/** Bots fill hidden inputs; real users never see this one. */
const honeypot = z.string().max(0).optional()

const optionalText = (max: number) => z.string().trim().max(max, 'tooLong').optional()
const choice = <T extends readonly [string, ...string[]]>(values: T) =>
  z.enum(values, { error: 'required' })

const contactFields = z.object({
  projectType: choice(PROJECT_TYPES),
  projectTypeOther: optionalText(LIMITS.role),
  stage: choice(PROJECT_STAGES),
  currentUrl: z.union([z.literal(''), z.url('url').max(LIMITS.link, 'tooLong')]).optional(),
  features: z.array(z.enum(PROJECT_FEATURES)).max(PROJECT_FEATURES.length).default([]),
  goal: text(LIMITS.goal),
  timeline: choice(PROJECT_TIMELINES),
  budget: choice(PROJECT_BUDGETS),
  name: text(LIMITS.name),
  email,
  company: optionalText(LIMITS.company),
  message: optionalText(LIMITS.message),
  website: honeypot,
})

type ContactFieldName = keyof typeof contactFields.shape

const otherTypeNamed = (v: { projectType?: string; projectTypeOther?: string }) =>
  v.projectType !== 'other' || Boolean(v.projectTypeOther)
const otherTypeIssue = { path: ['projectTypeOther'], message: 'required' }

export const contactSchema = contactFields.refine(otherTypeNamed, otherTypeIssue)

/** The brief's steps, as the fields each one asks for (the last screen only reviews them). */
export const CONTACT_STEPS = [
  ['projectType', 'projectTypeOther'],
  ['stage', 'currentUrl'],
  ['features', 'goal'],
  ['timeline', 'budget'],
  ['name', 'email', 'company', 'message'],
] as const satisfies readonly (readonly ContactFieldName[])[]

/** Validates only the fields of one step, so the brief can stop on the step that needs fixing. */
export function contactStepSchema(step: number) {
  const fields = CONTACT_STEPS[step] ?? []
  const mask = Object.fromEntries(fields.map((field) => [field, true])) as Partial<
    Record<ContactFieldName, true>
  >
  const picked = contactFields.pick(mask)
  return step === 0 ? picked.refine(otherTypeNamed, otherTypeIssue) : picked
}

export const careersSchema = z
  .object({
    name: text(LIMITS.name),
    email,
    role: z.enum(CAREER_ROLES, { error: 'required' }),
    customRole: z.string().trim().max(LIMITS.role, 'tooLong').optional(),
    links: z
      .array(z.url('url').max(LIMITS.link, 'tooLong'))
      .max(LIMITS.links, 'tooLong')
      .default([]),
    message: text(LIMITS.message),
    website: honeypot,
  })
  .refine((v) => v.role !== 'other' || Boolean(v.customRole), {
    path: ['customRole'],
    message: 'required',
  })

export type ContactInput = z.infer<typeof contactSchema>
export type CareersInput = z.infer<typeof careersSchema>

/** First error per field, as a validation message key. */
export function fieldErrors(error: z.ZodError): Record<string, ValidationKey> {
  const out: Record<string, ValidationKey> = {}
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? '_')
    if (!(field in out)) out[field] = issue.message as ValidationKey
  }
  return out
}
