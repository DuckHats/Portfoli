import type { IncomingMessage } from 'node:http'
import { Readable } from 'node:stream'
import { describe, expect, it } from 'vitest'
import { PayloadError, parseMultipart } from '../../api/_utils/parse'

const BOUNDARY = 'testboundary'

function multipart(parts: { name: string; value: string; filename?: string; type?: string }[]) {
  const chunks = parts.map((p) => {
    const disposition = `form-data; name="${p.name}"${p.filename ? `; filename="${p.filename}"` : ''}`
    const type = p.type ? `\r\nContent-Type: ${p.type}` : ''
    return `--${BOUNDARY}\r\nContent-Disposition: ${disposition}${type}\r\n\r\n${p.value}\r\n`
  })
  const body = Buffer.from(`${chunks.join('')}--${BOUNDARY}--\r\n`, 'latin1')
  return Object.assign(Readable.from([body]), {
    headers: {
      'content-type': `multipart/form-data; boundary=${BOUNDARY}`,
      'content-length': String(body.length),
    },
  }) as unknown as IncomingMessage
}

const MB = 1024 * 1024

describe('parseMultipart', () => {
  it('returns text fields', async () => {
    const { fields, file } = await parseMultipart(
      multipart([
        { name: 'name', value: 'Ada' },
        { name: 'email', value: 'ada@example.com' },
      ]),
      MB,
    )
    expect(fields).toEqual({ name: 'Ada', email: 'ada@example.com' })
    expect(file).toBeUndefined()
  })

  it('accepts a real PDF and sanitises its name', async () => {
    const { file } = await parseMultipart(
      multipart([
        { name: 'cv', value: '%PDF-1.4 body', filename: '../my cv.pdf', type: 'application/pdf' },
      ]),
      MB,
    )
    expect(file?.mimetype).toBe('application/pdf')
    expect(file?.filename).toBe('_my_cv.pdf')
    expect(file?.buffer.subarray(0, 5).toString()).toBe('%PDF-')
  })

  it('rejects a file that claims to be a PDF but is not', async () => {
    await expect(
      parseMultipart(
        multipart([
          { name: 'cv', value: 'MZ\x90 executable', filename: 'cv.pdf', type: 'application/pdf' },
        ]),
        MB,
      ),
    ).rejects.toBeInstanceOf(PayloadError)
  })

  it('drops files that are not declared as PDF', async () => {
    const { file } = await parseMultipart(
      multipart([{ name: 'cv', value: 'hello', filename: 'cv.txt', type: 'text/plain' }]),
      MB,
    )
    expect(file).toBeUndefined()
  })

  it('rejects files over the size limit', async () => {
    await expect(
      parseMultipart(
        multipart([
          {
            name: 'cv',
            value: `%PDF-${'x'.repeat(2000)}`,
            filename: 'cv.pdf',
            type: 'application/pdf',
          },
        ]),
        1000,
      ),
    ).rejects.toBeInstanceOf(PayloadError)
  })
})
