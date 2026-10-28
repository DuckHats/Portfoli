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

export const LIMITS = {
  name: 100,
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

export const contactSchema = z.object({
  name: text(LIMITS.name),
  email,
  message: text(LIMITS.message),
  website: honeypot,
})

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
