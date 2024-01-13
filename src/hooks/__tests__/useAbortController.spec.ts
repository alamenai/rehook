import { useAbortController } from '../useAbortController'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

describe('useAbortController', () => {
    it('should return the signal of the passed controller', () => {
        const controller = new AbortController()
        const { result } = renderHook(() => useAbortController(controller))
        expect(result.current.getSignal()).toBe(controller.signal)
    })

    it('should return true when controller is aborted', () => {
        const controller = new AbortController()
        const { result } = renderHook(() => useAbortController(controller))
        act(() => result.current.abort())
        expect(result.current.getSignal().aborted).toBeTruthy()
    })

    it('should return true when controller is aborted', () => {
        const controller = new AbortController()
        const { result } = renderHook(() => useAbortController(controller))
        act(() => result.current.abortAfter(5000))
        expect(result.current.getSignal().aborted).toBeFalsy()
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
