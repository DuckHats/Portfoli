import type { IncomingMessage } from 'node:http'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { ZodType } from 'zod'
import type { DiscordEmbed, DiscordFile } from './discord.js'
import { sendToDiscord } from './discord.js'
import type { ParsedForm } from './parse.js'
import { PayloadError, parseMultipart } from './parse.js'
import type { RateLimiter } from './rateLimit.js'

export interface FormHandlerOptions<T> {
  schema: ZodType<T>
  limiter: RateLimiter
  maxFileBytes: number
  /** Turns raw multipart fields into the object the schema validates. */
  normalise?: (fields: Record<string, string>) => unknown
  toEmbed: (data: T) => DiscordEmbed
}

export interface FormHandlerDeps {
  parse: (req: IncomingMessage, maxFileBytes: number) => Promise<ParsedForm>
  send: (url: string, embed: DiscordEmbed, file?: DiscordFile) => Promise<void>
}

const defaultDeps: FormHandlerDeps = { parse: parseMultipart, send: sendToDiscord }

export const clientIp = (req: Pick<VercelRequest, 'headers'>): string => {
  const forwarded = req.headers['x-forwarded-for']
  const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim()
  return first || 'unknown'
}

/** One handler shape for every form: method check, rate limit, parse, honeypot, validate, forward. */
export function createFormHandler<T>(
  options: FormHandlerOptions<T>,
  deps: FormHandlerDeps = defaultDeps,
) {
  return async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ error: 'method_not_allowed' })
    }
    if (!options.limiter.check(clientIp(req))) {
      return res.status(429).json({ error: 'rate_limited' })
    }

    const webhook = process.env.DISCORD_WEBHOOK_URL
    if (!webhook) {
      console.error('DISCORD_WEBHOOK_URL is not configured')
      return res.status(500).json({ error: 'server_error' })
    }

    try {
      const { fields, file } = await deps.parse(req, options.maxFileBytes)

      // Honeypot: pretend it worked so bots do not learn they were caught.
      if (fields.website) return res.status(200).json({ success: true })

      const input = options.normalise ? options.normalise(fields) : fields
      const result = options.schema.safeParse(input)
      if (!result.success) {
        return res
          .status(400)
          .json({ error: 'invalid', fields: result.error.issues.map((i) => i.path[0]) })
      }

      await deps.send(webhook, options.toEmbed(result.data), file)
      return res.status(200).json({ success: true })
    } catch (error) {
      if (error instanceof PayloadError) return res.status(400).json({ error: 'invalid_payload' })
      console.error('Form submission failed', error)
      return res.status(500).json({ error: 'server_error' })
    }
  }
}
