import { renderHook, act } from '@testing-library/react'
import { useInterval } from '../use-interval'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should call the callback function at the specified interval', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useInterval(callback, 1000))

    expect(callback).not.toBeCalled()

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should stop and start the interval', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useInterval(callback, 1000))

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.stopInterval()
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.startInterval()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should update the delay when updateDelay is called', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useInterval(callback, 1000))

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(callback).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.updateDelay(500)
    })

    act(() => {
      vi.advanceTimersByTime(500)
    })
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it('should provide correct isRunning and delay values', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useInterval(callback, 1000))

    expect(result.current.isRunning).toBe(true)
    expect(result.current.delay).toBe(1000)

    act(() => {
      result.current.stopInterval()
    })
    expect(result.current.isRunning).toBe(false)

    act(() => {
      result.current.updateDelay(2000)
    })
    expect(result.current.delay).toBe(2000)

    act(() => {
      result.current.startInterval()
    })
    expect(result.current.isRunning).toBe(true)
  })
})