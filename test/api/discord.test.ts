import { describe, expect, it } from 'vitest'
import { buildPayload, escapeMarkdown, truncate } from '../../api/_utils/discord'
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
