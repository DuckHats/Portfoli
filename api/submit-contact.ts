import { contactSchema } from '../src/lib/schemas.js'
import { createFormHandler } from './_utils/handler.js'
import { parseStringList } from './_utils/parse.js'
import { createRateLimiter } from './_utils/rateLimit.js'

// Multipart bodies are parsed by formidable, so Vercel's own parser must be off.
export const config = { api: { bodyParser: false } }

export default createFormHandler({
  schema: contactSchema,
  limiter: createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 }),
  maxFileBytes: 1,
  normalise: (fields) => ({ ...fields, features: parseStringList(fields.features) }),
  toEmbed: (data) => ({
    title: 'New project brief',
    description: data.goal,
    fields: [
      { name: 'Name', value: data.name, inline: true },
      { name: 'Email', value: data.email, inline: true },
      { name: 'Company', value: data.company ?? '', inline: true },
      {
        name: 'Project',
        value: data.projectType === 'other' ? `other (${data.projectTypeOther})` : data.projectType,
        inline: true,
      },
      { name: 'Starting point', value: data.stage, inline: true },
      { name: 'Current site', value: data.currentUrl ?? '', inline: true },
      { name: 'Timeline', value: data.timeline, inline: true },
      { name: 'Budget', value: data.budget, inline: true },
      { name: 'Features', value: data.features.join(', ') },
      { name: 'Message', value: data.message ?? '' },
    ],
  }),
})
