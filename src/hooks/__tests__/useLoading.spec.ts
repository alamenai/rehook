import { useLoading } from '../useLoading'
import { renderHook } from '@testing-library/react'
import { act } from 'react'

describe('useLoading', () => {
    it('should return false when it called first time', () => {
        const { result } = renderHook(() => useLoading(false))
        expect(result.current.loading).toBeFalsy()
    })

    it('should return true when loading starts', () => {
        const { result } = renderHook(() => useLoading(false))
        act(() => result.current.startLoading())
        expect(result.current.loading).toBeTruthy()
    })

    it('should return false when loading stops', () => {
        const { result } = renderHook(() => useLoading(false))
        act(() => result.current.stopLoading())
        expect(result.current.loading).toBeFalsy()
    })
})
