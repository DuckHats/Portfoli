import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCarousel } from './useCarousel'

const setReducedMotion = (reduce: boolean) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduce && query.includes('prefers-reduced-motion'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

describe('useCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setReducedMotion(false)
  })
  afterEach(() => vi.useRealTimers())

  it('advances on its own and wraps around', () => {
    const { result } = renderHook(() => useCarousel({ count: 3, interval: 1000 }))
    expect(result.current.index).toBe(0)
    act(() => void vi.advanceTimersByTime(1000))
    expect(result.current.index).toBe(1)
    act(() => void vi.advanceTimersByTime(2000))
    expect(result.current.index).toBe(0)
  })

  it('pauses while hovered or focused and resumes afterwards', () => {
    const { result } = renderHook(() => useCarousel({ count: 3, interval: 1000 }))
    act(() => result.current.handlers.onMouseEnter())
    act(() => void vi.advanceTimersByTime(5000))
    expect(result.current.index).toBe(0)
    act(() => result.current.handlers.onMouseLeave())
    act(() => result.current.handlers.onFocus())
    act(() => void vi.advanceTimersByTime(5000))
    expect(result.current.index).toBe(0)
    act(() => result.current.handlers.onBlur())
    act(() => void vi.advanceTimersByTime(1000))
    expect(result.current.index).toBe(1)
  })

  it('never autoplays for users who prefer reduced motion', () => {
    setReducedMotion(true)
    const { result } = renderHook(() => useCarousel({ count: 3, interval: 1000 }))
    expect(result.current.playing).toBe(false)
    act(() => void vi.advanceTimersByTime(10_000))
    expect(result.current.index).toBe(0)
  })

  it('does not play with a single slide', () => {
    const { result } = renderHook(() => useCarousel({ count: 1, interval: 1000 }))
    expect(result.current.playing).toBe(false)
  })

  it('moves manually in both directions with wrap-around', () => {
    setReducedMotion(true)
    const { result } = renderHook(() => useCarousel({ count: 3 }))
    act(() => result.current.prev())
    expect(result.current.index).toBe(2)
    act(() => result.current.next())
    expect(result.current.index).toBe(0)
    act(() => result.current.go(7))
    expect(result.current.index).toBe(1)
  })
})
