import { useFetch } from '../useFetch'
import { renderHook, waitFor } from '@testing-library/react'

test('useFetch should fetch data immediately', async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts'

    const { result } = renderHook(() => useFetch(url))

    expect(result.current.data).toBe(undefined)

    expect(result.current.error).toBe('')

    await waitFor(() => expect(result.current.data).not.toBeUndefined())

    await waitFor(() => expect(result.current.error).toBe(''))

    await waitFor(() => expect(result.current.isLoading).toBe(false))
})

test('useFetch should fetch data immediately trigger is false', async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts'

    const { result } = renderHook(() => useFetch(url, false))

    expect(result.current.data).toBe(undefined)

    expect(result.current.error).toBe('')

    await waitFor(() => {
        expect(result.current.data).not.toBe(undefined)

        expect(result.current.error).toBe('')

        expect(result.current.isLoading).toBe(false)
    })
})

test('useFetch should not fetch data immediately trigger is true', async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts'

    const { result } = renderHook(() => useFetch(url, true))

    expect(result.current.data).toBeUndefined()

    expect(result.current.error).toBe('')

    expect(result.current.isLoading).toBe(false)
})

test('useFetch should handle errors', async () => {
    const url = 'https://jsonplaceholder.typicode.com/wrong'

    const { result } = renderHook(() => useFetch(url))

    expect(result.current.data).toBe(undefined)

    expect(result.current.error).toBe('')

    await waitFor(() => {
        expect(result.current.data).toBeUndefined()

        expect(result.current.error.length).toBeGreaterThan(0)

        expect(result.current.isLoading).toBe(false)
    })
})
