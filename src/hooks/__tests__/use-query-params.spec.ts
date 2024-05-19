import { useQueryParams } from '../use-query-params'
import { renderHook } from '@testing-library/react'
import { act } from 'react'

describe('useHistory', () => {
    it('should return the exact added query parameter', () => {
        const { result } = renderHook(() => useQueryParams())
        act(() => result.current.set('name', 'alaeddine'))
        expect(result.current.urlParams.get('name')).toBe('alaeddine')
    })

    it('should add the object as query parameters to the url', () => {
        const { result } = renderHook(() => useQueryParams())
        act(() => result.current.setEncoded({ name: 'alaeddine', age: 30 }))
        expect(result.current.urlParams.get('name')).toBe('alaeddine')
        expect(result.current.urlParams.get('age')).toBe('30')
    })
})
