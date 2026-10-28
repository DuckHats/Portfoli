export interface RateLimiter {
  /** Returns true if the request is allowed, false once the key exceeded its budget. */
  check(key: string, now?: number): boolean
}

/**
 * Fixed-window limiter kept in memory. It is per serverless instance, so it blunts casual
 * abuse but is not a hard guarantee; use a shared store (e.g. Redis) if that becomes necessary.
 */
export function createRateLimiter({
  limit,
  windowMs,
}: {
  limit: number
  windowMs: number
}): RateLimiter {
  const hits = new Map<string, { count: number; resetAt: number }>()
  return {
    check(key, now = Date.now()) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k)
      const entry = hits.get(key)
      if (!entry) {
        hits.set(key, { count: 1, resetAt: now + windowMs })
        return true
      }
      entry.count += 1
      return entry.count <= limit
    },
  }
}
