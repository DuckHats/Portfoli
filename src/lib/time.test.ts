import { describe, expect, it } from 'vitest'
import { catalanTime } from './time'

describe('catalanTime', () => {
  it('shows Catalan local time whatever the visitor time zone', () => {
    // 12:05 UTC in July is 14:05 in Catalonia (CEST).
    expect(catalanTime(new Date('2026-07-01T12:05:00Z'), 'ca')).toBe('14:05')
    // 12:05 UTC in January is 13:05 (CET).
    expect(catalanTime(new Date('2026-01-15T12:05:00Z'), 'en-GB')).toBe('13:05')
  })
})
