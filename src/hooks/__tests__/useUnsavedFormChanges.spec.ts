import { useUnsavedFormChanges } from '../use-unsaved-form-changes'
import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { vitest } from 'vitest'

describe('useUnsavedFormChanges', () => {
    it('should initialize with isFormChanged as false', () => {
        const { result } = renderHook(() => useUnsavedFormChanges())

        expect(result.current.isFormChanged).toBe(false)
    })

    it('should set isFormChanged to true when calling setFormChanged', () => {
        const { result } = renderHook(() => useUnsavedFormChanges())

        act(() => {
            result.current.setFormChanged(true)
        })

        expect(result.current.isFormChanged).toBe(true)
    })

    it('should add and remove event listener for beforeunload', () => {
        const addEventListenerSpy = vitest.spyOn(window, 'addEventListener')
        const removeEventListenerSpy = vitest.spyOn(window, 'removeEventListener')

        const { unmount } = renderHook(() => useUnsavedFormChanges())

        expect(addEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function))

        unmount()

        expect(removeEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function))

        addEventListenerSpy.mockRestore()
        removeEventListenerSpy.mockRestore()
    })
})
