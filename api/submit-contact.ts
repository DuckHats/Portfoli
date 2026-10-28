import { contactSchema } from '../src/lib/schemas.js'
import { createFormHandler } from './_utils/handler.js'
import { createRateLimiter } from './_utils/rateLimit.js'

// Multipart bodies are parsed by formidable, so Vercel's own parser must be off.
export const config = { api: { bodyParser: false } }

export default createFormHandler({
  schema: contactSchema,
  limiter: createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 }),
  maxFileBytes: 1,
  toEmbed: (data) => ({
    title: 'New contact message',
    description: data.message,
    fields: [
      { name: 'Name', value: data.name, inline: true },
      { name: 'Email', value: data.email, inline: true },
    ],
  }),
})
