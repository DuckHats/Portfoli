import { describe, expect, it } from 'vitest'
import { createRateLimiter } from '../../api/_utils/rateLimit'

describe('createRateLimiter', () => {
  it('allows up to the limit, then blocks', () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000 })
    expect([limiter.check('a', 0), limiter.check('a', 1), limiter.check('a', 2)]).toEqual([
      true,
      true,
      false,
    ])
  })

  it('tracks keys independently', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 })
    expect(limiter.check('a', 0)).toBe(true)
    expect(limiter.check('b', 0)).toBe(true)
    expect(limiter.check('a', 1)).toBe(false)
  })

  it('resets after the window', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 })
    limiter.check('a', 0)
    expect(limiter.check('a', 500)).toBe(false)
    expect(limiter.check('a', 1001)).toBe(true)
  })
})
