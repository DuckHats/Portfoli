import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildPayload, escapeMarkdown, sendToDiscord, truncate } from '../../api/_utils/discord'
import { sanitiseFilename } from '../../api/_utils/parse'

describe('discord payload', () => {
  it('escapes markdown so input cannot restyle the embed', () => {
    expect(escapeMarkdown('**bold** `code` [x](http://a)')).toBe(
      '\\*\\*bold\\*\\* \\`code\\` \\[x\\]\\(http://a\\)',
    )
  })

  it('truncates to the given length', () => {
    expect(truncate('abcdef', 4)).toBe('abc…')
    expect(truncate('abc', 4)).toBe('abc')
  })

  it('never allows mentions and respects embed limits', () => {
    const payload = buildPayload({
      title: 't',
      description: '@everyone '.repeat(1000),
      fields: [{ name: 'n', value: 'v'.repeat(5000) }],
    })
    expect(payload.allowed_mentions).toEqual({ parse: [] })
    const embed = payload.embeds[0]!
    expect(embed.description!.length).toBeLessThanOrEqual(4096)
    expect(embed.fields[0]!.value.length).toBeLessThanOrEqual(1024)
  })

  it('replaces empty field values', () => {
    expect(
      buildPayload({ title: 't', fields: [{ name: 'n', value: '' }] }).embeds[0]!.fields[0]!.value,
    ).toBe('—')
  })

  it('sanitises uploaded filenames', () => {
    expect(sanitiseFilename('../../etc/pass wd.pdf')).toBe('_.._etc_pass_wd.pdf')
    expect(sanitiseFilename(null)).toBe('cv.pdf')
  })
})

describe('sendToDiscord', () => {
  const embed = { title: 't', fields: [{ name: 'n', value: 'v' }] }

  afterEach(() => vi.restoreAllMocks())

  it('posts JSON without a file', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(null, { status: 204 }))
    await sendToDiscord('https://discord.test/hook', embed)
    const [url, init] = fetchMock.mock.calls[0]!
    expect(url).toBe('https://discord.test/hook')
    expect((init as RequestInit).headers).toMatchObject({ 'Content-Type': 'application/json' })
    expect(JSON.parse((init as RequestInit).body as string).allowed_mentions).toEqual({ parse: [] })
  })

  it('posts multipart when a file is attached', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(null, { status: 204 }))
    await sendToDiscord('https://discord.test/hook', embed, {
      buffer: Buffer.from('%PDF-1'),
      filename: 'cv.pdf',
      mimetype: 'application/pdf',
    })
    const body = (fetchMock.mock.calls[0]![1] as RequestInit).body as FormData
    expect(body.get('payload_json')).toBeTypeOf('string')
    expect((body.get('file') as File).name).toBe('cv.pdf')
  })

  it('throws when Discord answers with an error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('nope', { status: 500 }))
    await expect(sendToDiscord('https://discord.test/hook', embed)).rejects.toThrow('500')
  })
})
