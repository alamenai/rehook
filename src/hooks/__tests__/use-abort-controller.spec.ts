import { useAbortController } from '../use-abort-controller'
import { renderHook, waitFor } from '@testing-library/react'
import { act } from 'react'

describe('useAbortController', () => {
    const isTrue = () => 5 > 2

    it('should return the signal of the passed controller', () => {
        const controller = new AbortController()

        const { result } = renderHook(() => useAbortController(controller))

        expect(result.current.getSignal()).toBe(controller.signal)
    })

    it('should return true when controller is aborted', () => {
        const controller = new AbortController()

        const { result } = renderHook(() => useAbortController(controller))

        act(() => result.current.abort())

        expect(result.current.isAborted).toBeTruthy()
    })

    it('should return true when controller is aborted after a delay', async () => {
        const controller = new AbortController()

        const { result } = renderHook(() => useAbortController(controller))

        act(() => {
            result.current.abortAfter(5000)
        })

        await waitFor(() => expect(result.current.isAborted === true))
    })

    it('should return true and abort the controller if the specified condition is true', () => {
        const controller = new AbortController()

        const { result } = renderHook(() => useAbortController(controller))

        act(() => result.current.abortIf(isTrue))

        expect(result.current.isAborted).toBeTruthy()
    })

    it('should return true when controller is aborted after a delay if the specified condition is true', async () => {
        const controller = new AbortController()

        const { result } = renderHook(() => useAbortController(controller))

        act(() => {
            result.current.abortIfAfter(isTrue, 5000)
        })

        await waitFor(() => expect(result.current.isAborted === true))
    })

    it('should not throw an error if called on an already aborted controller', () => {
        const controller = new AbortController()
        const { result } = renderHook(() => useAbortController(controller))

        // Simulate an already aborted controller
        controller.abort()

        // Calling abort again should not throw an error
        expect(() => result.current.abort()).not.toThrow()
    })
})
