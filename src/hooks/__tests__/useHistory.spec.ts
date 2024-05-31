import { useHistory } from '../use-history'
import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

describe('useHistory', () => {
    it('should return the same number of pages', () => {
        const { result } = renderHook(() => useHistory())
        expect(result.current.numberOfPages).toBe(history.length)
    })

    it('should return current position equals to 2 when move to next page', () => {
        const { result } = renderHook(() => useHistory())
        act(() => result.current.push('/next'))
        expect(result.current.currentPosition).toBe(2)
    })

    it('should return current position equals to 1 when back to previous page', () => {
        const { result } = renderHook(() => useHistory())
        act(() => result.current.push('/next'))
        expect(result.current.currentPosition).toBe(3)
        act(() => result.current.back())
        expect(result.current.currentPosition).toBe(2)
    })
})
