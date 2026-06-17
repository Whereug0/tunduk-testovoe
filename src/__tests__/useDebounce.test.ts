import { act, renderHook } from '@testing-library/react'
import { useDebounce } from '../hooks/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300))
    expect(result.current).toBe('initial')
  })

  it('does not update before the delay has elapsed', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'ab' })
    act(() => {
      jest.advanceTimersByTime(200)
    })

    expect(result.current).toBe('a')
  })

  it('updates to the latest value once the delay has elapsed', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'ab' })
    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(result.current).toBe('ab')
  })

  it('only emits the final value when changed rapidly (no intermediate renders)', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'ab' })
    act(() => {
      jest.advanceTimersByTime(100)
    })
    rerender({ value: 'abc' })
    act(() => {
      jest.advanceTimersByTime(100)
    })
    rerender({ value: 'abcd' })
    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(result.current).toBe('abcd')
  })
})
