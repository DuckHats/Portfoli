import { describe, expect, it } from 'vitest'
import {
  CONTACT_STEPS,
  careersSchema,
  contactSchema,
  contactStepSchema,
  fieldErrors,
} from './schemas'

const contact = { name: 'Ada', email: 'ada@example.com', message: 'Hola' }
const brief = {
  ...contact,
  projectType: 'ecommerce',
  stage: 'existing',
  currentUrl: 'https://example.com',
  features: ['payments', 'catalog'],
  goal: 'Sell online',
  timeline: 'short',
  budget: 'unknown',
}

describe('contactSchema', () => {
  it('accepts a complete brief, with or without the optional fields', () => {
    expect(contactSchema.safeParse(brief).success).toBe(true)
    const minimal = { ...brief, message: undefined, currentUrl: undefined, features: [] }
    expect(contactSchema.safeParse(minimal).success).toBe(true)
  })

  it('reports required, email, url and length errors as message keys', () => {
    const result = contactSchema.safeParse({
      ...brief,
      name: '',
      email: 'nope',
      currentUrl: 'not a url',
      message: 'x'.repeat(5000),
      budget: undefined,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(fieldErrors(result.error)).toEqual({
        currentUrl: 'url',
        budget: 'required',
        name: 'required',
        email: 'email',
        message: 'tooLong',
      })
    }
  })

  it('rejects unknown choices and a filled honeypot', () => {
    expect(contactSchema.safeParse({ ...brief, features: ['teleport'] }).success).toBe(false)
    expect(contactSchema.safeParse({ ...brief, website: 'http://spam' }).success).toBe(false)
  })

  it('needs the project named when its type is "other"', () => {
    const result = contactSchema.safeParse({ ...brief, projectType: 'other' })
    expect(result.success).toBe(false)
    if (!result.success) expect(fieldErrors(result.error)).toEqual({ projectTypeOther: 'required' })
  })
})

describe('contactStepSchema', () => {
  it('validates only the fields of its step', () => {
    expect(contactStepSchema(0).safeParse({ projectType: 'website' }).success).toBe(true)
    const result = contactStepSchema(0).safeParse({ projectType: 'other' })
    expect(result.success).toBe(false)
    if (!result.success) expect(fieldErrors(result.error)).toEqual({ projectTypeOther: 'required' })
    expect(contactStepSchema(3).safeParse({ timeline: 'asap' }).success).toBe(false)
  })

  it('covers every field of the brief across the steps exactly once', () => {
    const fields = CONTACT_STEPS.flat()
    expect(new Set(fields).size).toBe(fields.length)
    expect([...fields, 'website'].sort()).toEqual(
      Object.keys(brief).concat('company', 'projectTypeOther', 'website').sort(),
    )
  })
})

describe('careersSchema', () => {
  const base = { ...contact, role: 'frontend', links: ['https://github.com/ada'] }

  it('accepts a valid application', () => {
    expect(careersSchema.safeParse(base).success).toBe(true)
  })

  it('requires a custom role when role is "other"', () => {
    const result = careersSchema.safeParse({ ...base, role: 'other' })
    expect(result.success).toBe(false)
    if (!result.success) expect(fieldErrors(result.error)).toEqual({ customRole: 'required' })
  })

  it('rejects unknown roles, bad links and too many links', () => {
    expect(careersSchema.safeParse({ ...base, role: 'wizard' }).success).toBe(false)
    expect(careersSchema.safeParse({ ...base, links: ['not a url'] }).success).toBe(false)
    expect(
      careersSchema.safeParse({ ...base, links: Array(6).fill('https://a.dev') }).success,
    ).toBe(false)
  })
})
