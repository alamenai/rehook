import { useMediaQuery } from '../use-media-query'
import { renderHook } from '@testing-library/react'

describe('useMediaQuery', () => {
    it('should return 320 for xs media query', () => {
        const { result } = renderHook(() => useMediaQuery('xs'))
        expect(result.current.mediaWidth).toEqual(320)
    })

    it('should return 480 for sm media query', () => {
        const { result } = renderHook(() => useMediaQuery('sm'))
        expect(result.current.mediaWidth).toEqual(480)
    })

    it('should return 1024 for lg media query', () => {
        const { result } = renderHook(() => useMediaQuery('lg'))
        expect(result.current.mediaWidth).toEqual(1024)
    })

    it('should return 1200 for xl media query', () => {
        const { result } = renderHook(() => useMediaQuery('xl'))
        expect(result.current.mediaWidth).toEqual(1200)
    })
})
