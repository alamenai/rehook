import { useFetch } from '../use-fetch'
import { renderHook, waitFor } from '@testing-library/react'

describe('useFetch', () => {
    it('should fetch data immmediately', () => {
        const url = 'https://jsonplaceholder.typicode.com/posts'

        const { result } = renderHook(() => useFetch(url))

        expect(result.current.data).toBe(undefined)

        expect(result.current.error).toBe(undefined)

        waitFor(() => expect(result.current.data).not.toBeUndefined())

        waitFor(() => expect(result.current.error).toBe(undefined))

        waitFor(() => expect(result.current.isLoading).toBe(false))
    })

    it('should not fetch data immmediately trigger is false', () => {
        const url = 'https://jsonplaceholder.typicode.com/posts'

        const { result } = renderHook(() => useFetch(url, false))

        expect(result.current.data).toBe(undefined)

        expect(result.current.error).toBe(undefined)
    })

    it('should fetch data immediately trigger is true', () => {
        const url = 'https://jsonplaceholder.typicode.com/posts'

        const { result } = renderHook(() => useFetch(url, true))

        waitFor(() => expect(result.current.data).not.toBeUndefined())

        waitFor(() => expect(result.current.error).toBe(undefined))

        waitFor(() => expect(result.current.isLoading).toBe(false))
    })

    it('should handle errors', () => {
        const url = 'https://jsonplaceholder.typicode.com/wrong'

        const { result } = renderHook(() => useFetch(url))

        expect(result.current.data).toBe(undefined)

        expect(result.current.error).toBe(undefined)

        waitFor(() => {
            expect(result.current.data).toBeUndefined()

            expect(result.current.error?.message.length).toBeGreaterThan(0)

            expect(result.current.isLoading).toBe(false)
        })
    })
})
