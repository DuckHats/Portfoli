import { describe, expect, it } from 'vitest'
import { careersSchema, contactSchema, fieldErrors } from './schemas'

const contact = { name: 'Ada', email: 'ada@example.com', message: 'Hola' }

describe('contactSchema', () => {
  it('accepts a valid message', () => {
    expect(contactSchema.safeParse(contact).success).toBe(true)
  })

  it('reports required, email and length errors as message keys', () => {
    const result = contactSchema.safeParse({ name: '', email: 'nope', message: 'x'.repeat(5000) })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(fieldErrors(result.error)).toEqual({
        name: 'required',
        email: 'email',
        message: 'tooLong',
      })
    }
  })

  it('rejects a filled honeypot', () => {
    expect(contactSchema.safeParse({ ...contact, website: 'http://spam' }).success).toBe(false)
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
