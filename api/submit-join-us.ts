import { LIMITS, careersSchema } from '../src/lib/schemas.js'
import { createFormHandler } from './_utils/handler.js'
import { parseStringList } from './_utils/parse.js'
import { createRateLimiter } from './_utils/rateLimit.js'

export const config = { api: { bodyParser: false } }

export default createFormHandler({
  schema: careersSchema,
  limiter: createRateLimiter({ limit: 3, windowMs: 10 * 60 * 1000 }),
  maxFileBytes: LIMITS.cvBytes,
  normalise: (fields) => ({ ...fields, links: parseStringList(fields.links) }),
  toEmbed: (data) => ({
    title: 'New application',
    description: data.message,
    fields: [
      { name: 'Name', value: data.name, inline: true },
      { name: 'Email', value: data.email, inline: true },
      {
        name: 'Profile',
        value: data.role === 'other' ? `other (${data.customRole})` : data.role,
        inline: true,
      },
      { name: 'Links', value: data.links.join('\n') },
    ],
  }),
})
