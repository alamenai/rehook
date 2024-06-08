import { useTimeout } from '../use-timeout'
import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { vitest } from 'vitest'

describe('useTimout', () => {
    afterEach(() => vitest.clearAllTimers())

    it('should not return null timeout', () => {
        const { result } = renderHook(() => useTimeout(5000))
        expect(result.current.timeout).not.toBeNull()
    })

    it('calls the function after the timeout', async () => {
        const fun = vitest.fn()

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { result } = renderHook(() => useTimeout(5000, fun))

        expect(fun).not.toHaveBeenCalled()

        await new Promise(resolve => setTimeout(resolve, 5000))

        expect(fun).toHaveBeenCalled()
    })

    it('should refreshes the timeout', async () => {
        const fun = vitest.fn()

        const { result } = renderHook(() => useTimeout(5000, fun))

        act(() => {
            result.current.refresh()
        })

        expect(fun).not.toHaveBeenCalled()

        await new Promise(resolve => setTimeout(resolve, 5000))

        expect(fun).toHaveBeenCalled()
    })

    it('cshould ancels the timeout', async () => {
        const fun = vitest.fn()

        const { result } = renderHook(() => useTimeout(5000, fun))

        act(() => {
            result.current.cancel()
        })

        await new Promise(resolve => setTimeout(resolve, 5000))

        // Ensure that the function has not been called after cancellation
        expect(fun).not.toHaveBeenCalled()
    })
})
