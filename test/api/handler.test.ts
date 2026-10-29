import type { ApiRequest, ApiResponse } from '../../api/_utils/types'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { contactSchema } from '../../src/lib/schemas'
import { createFormHandler } from '../../api/_utils/handler'
import { PayloadError } from '../../api/_utils/parse'
import { createRateLimiter } from '../../api/_utils/rateLimit'

const valid = {
  projectType: 'website',
  stage: 'idea',
  goal: 'A new website',
  timeline: 'flexible',
  budget: 'unknown',
  name: 'Ada',
  email: 'ada@example.com',
  message: 'Hola',
}

function setup(fields: Record<string, string> = valid, limit = 5) {
  const parse = vi.fn().mockResolvedValue({ fields })
  const send = vi.fn().mockResolvedValue(undefined)
  const handler = createFormHandler(
    {
      schema: contactSchema,
      limiter: createRateLimiter({ limit, windowMs: 60_000 }),
      maxFileBytes: 1,
      toEmbed: (d) => ({ title: 'x', fields: [{ name: 'Name', value: d.name }] }),
    },
    { parse, send },
  )
  return { handler, parse, send }
}

function call(handler: ReturnType<typeof setup>['handler'], method = 'POST', ip = '1.1.1.1') {
  const res = {
    statusCode: 0,
    body: undefined as unknown,
    headers: {} as Record<string, string>,
    setHeader(k: string, v: string) {
      this.headers[k] = v
      return this
    },
    status(code: number) {
      this.statusCode = code
      return this
    },
    json(body: unknown) {
      this.body = body
      return this
    },
  }
  const req = { method, headers: { 'x-forwarded-for': ip } } as unknown as ApiRequest
  return handler(req, res as unknown as ApiResponse).then(() => res)
}

describe('createFormHandler', () => {
  beforeEach(() => {
    process.env.DISCORD_WEBHOOK_URL = 'https://discord.test/hook'
  })

  it('rejects non-POST requests', async () => {
    const res = await call(setup().handler, 'GET')
    expect(res.statusCode).toBe(405)
    expect(res.headers.Allow).toBe('POST')
  })

  it('forwards a valid submission', async () => {
    const { handler, send } = setup()
    const res = await call(handler)
    expect(res.statusCode).toBe(200)
    expect(send).toHaveBeenCalledOnce()
    expect(send.mock.calls[0]![0]).toBe('https://discord.test/hook')
  })

  it('returns 400 with the failing fields and sends nothing', async () => {
    const { handler, send } = setup({ ...valid, email: 'nope' })
    const res = await call(handler)
    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({ error: 'invalid', fields: ['email'] })
    expect(send).not.toHaveBeenCalled()
  })

  it('silently drops honeypot hits', async () => {
    const { handler, send } = setup({ ...valid, website: 'http://spam' })
    const res = await call(handler)
    expect(res.statusCode).toBe(200)
    expect(send).not.toHaveBeenCalled()
  })

  it('rate-limits by client IP', async () => {
    const { handler } = setup(valid, 1)
    expect((await call(handler, 'POST', '9.9.9.9')).statusCode).toBe(200)
    expect((await call(handler, 'POST', '9.9.9.9')).statusCode).toBe(429)
    expect((await call(handler, 'POST', '8.8.8.8')).statusCode).toBe(200)
  })

  it('maps payload errors to 400 and hides internal failures', async () => {
    const bad = setup()
    bad.parse.mockRejectedValue(new PayloadError('x'))
    expect((await call(bad.handler)).statusCode).toBe(400)

    vi.spyOn(console, 'error').mockImplementation(() => {})
    const broken = setup()
    broken.send.mockRejectedValue(new Error('discord down'))
    const res = await call(broken.handler)
    expect(res.statusCode).toBe(500)
    expect(res.body).toEqual({ error: 'server_error' })
  })

  it('fails closed when the webhook is not configured', async () => {
    delete process.env.DISCORD_WEBHOOK_URL
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect((await call(setup().handler)).statusCode).toBe(500)
  })
})
