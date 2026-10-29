import { readFile } from 'node:fs/promises'
import type { IncomingMessage } from 'node:http'
import formidable from 'formidable'

export interface ParsedForm {
  fields: Record<string, string>
  file?: { buffer: Buffer; filename: string; mimetype: string }
}

export class PayloadError extends Error {}

const PDF_MAGIC = '%PDF-'

/** Parses multipart/form-data with strict limits. Only one optional PDF named `cv` is accepted. */
export async function parseMultipart(
  req: IncomingMessage,
  maxFileBytes: number,
): Promise<ParsedForm> {
  const form = formidable({
    maxFiles: 1,
    maxFields: 20,
    maxFieldsSize: 64 * 1024,
    maxFileSize: maxFileBytes,
    maxTotalFileSize: maxFileBytes,
    allowEmptyFiles: false,
    filter: ({ name, mimetype }) => name === 'cv' && mimetype === 'application/pdf',
  })

  let fields: formidable.Fields
  let files: formidable.Files
  try {
    ;[fields, files] = await form.parse(req)
  } catch {
    throw new PayloadError('Invalid multipart payload')
  }

  const flat: Record<string, string> = {}
  for (const [key, value] of Object.entries(fields)) flat[key] = value?.[0] ?? ''

  const upload = files.cv?.[0]
  if (!upload) return { fields: flat }

  const buffer = await readFile(upload.filepath)
  if (buffer.subarray(0, PDF_MAGIC.length).toString('latin1') !== PDF_MAGIC) {
    throw new PayloadError('File is not a PDF')
  }
  return {
    fields: flat,
    file: {
      buffer,
      filename: sanitiseFilename(upload.originalFilename),
      mimetype: 'application/pdf',
    },
  }
}

export const sanitiseFilename = (name: string | null) =>
  (name ?? 'cv.pdf')
    .replace(/[^\w.-]+/g, '_')
    .replace(/^\.+/, '')
    .slice(0, 80) || 'cv.pdf'

/** A list sent as one JSON-encoded multipart field (links, features); anything else is empty. */
export const parseStringList = (raw: string | undefined): string[] => {
  try {
    const parsed: unknown = JSON.parse(raw ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((l): l is string => typeof l === 'string') : []
  } catch {
    return []
  }
}
