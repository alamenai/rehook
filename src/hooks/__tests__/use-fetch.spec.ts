import { useFetch } from '../use-fetch'
import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import createFetchMock from 'vitest-fetch-mock'

const fetchMock = createFetchMock(vi)

describe('useFetch', () => {
    beforeEach(() => {
        fetchMock.enableMocks()
        fetchMock.mockResponse(JSON.stringify({ data: '12345' }))
        console.log(fetch)
    })
    afterEach(() => {
        fetchMock.resetMocks()
        fetchMock.disableMocks()
    })
    test('should fetch data immediately', async () => {
        const url = 'https://jsonplaceholder.typicode.com/posts'

        const { result } = renderHook(() => useFetch(url))

        expect(result.current.data).toBe(undefined)

        expect(result.current.loading).toBe(true)

        expect(result.current.error).toBeFalsy()

        await waitFor(() => expect(result.current.data).toEqual({ data: '12345' }))

        await waitFor(() => expect(result.current.error).toBeFalsy())

        await waitFor(() => expect(result.current.loading).toBe(false))

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledWith(url, { signal: expect.any(AbortSignal) })
    })

    test('should fetch data immediately with options when trigger is not present', async () => {
        const url = 'https://jsonplaceholder.typicode.com/posts'

        const { result } = renderHook(() => useFetch(url, { method: 'POST', body: 'hello' }))

        expect(result.current.data).toBe(undefined)

        expect(result.current.loading).toBe(true)

        expect(result.current.error).toBeFalsy()

        await waitFor(() => expect(result.current.data).toEqual({ data: '12345' }))

        await waitFor(() => expect(result.current.error).toBeFalsy())

        await waitFor(() => expect(result.current.loading).toBe(false))

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledWith(url, { method: 'POST', body: 'hello', signal: expect.any(AbortSignal) })
    })

    test('should fetch data immediately when trigger is false', async () => {
        const url = 'https://jsonplaceholder.typicode.com/posts'

        const { result } = renderHook(() => useFetch(url, false))

        expect(result.current.data).toBe(undefined)

        expect(result.current.error).toBeFalsy()

        expect(result.current.loading).toBe(true)

        await waitFor(() => {
            expect(result.current.data).not.toBe(undefined)

            expect(result.current.error).toBeFalsy()

            expect(result.current.loading).toBe(false)
        })

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledWith(url, { signal: expect.any(AbortSignal) })
    })

    test('should not fetch data immediately when trigger is true', async () => {
        const url = 'https://jsonplaceholder.typicode.com/posts'

        const { result } = renderHook(() => useFetch(url, true))

        expect(result.current.data).toBeUndefined()
        expect(result.current.error).toBeFalsy()
        expect(result.current.loading).toBe(false)

        const { data, error, aborted } = await result.current.refetch({ method: 'POST' })

        expect(data).toEqual({ data: '12345' })
        expect(error).toBeFalsy()
        expect(aborted).toBeFalsy()
        await waitFor(() => expect(result.current.loading).toBe(false))
        expect(result.current.data).toEqual({ data: '12345' })
        expect(result.current.error).toBeFalsy()

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledWith(url, {
            method: 'POST',
            signal: expect.any(AbortSignal),
        })
    })

    test('should report error when trigger is true', async () => {
        const url = 'https://jsonplaceholder.typicode.com/posts'
        fetchMock.mockReject(new Error('fake error message'))

        const { result } = renderHook(() => useFetch(url, true, { method: 'POST' }))

        expect(result.current.data).toBeUndefined()
        expect(result.current.error).toBeFalsy()
        expect(result.current.loading).toBe(false)

        const { data, error, aborted } = await result.current.refetch({ body: 'hello' })

        expect(data).toBeFalsy()
        expect(error?.message).toBe('fake error message')
        expect(aborted).toBeFalsy()
        await waitFor(() => expect(result.current.loading).toBe(false))
        expect(result.current.data).toBeFalsy()
        expect(result.current.error?.message).toBe('fake error message')

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledWith(url, {
            method: 'POST',
            body: 'hello',
            signal: expect.any(AbortSignal),
        })
    })

    test('should report aborted when trigger is true', async () => {
        const url = 'https://jsonplaceholder.typicode.com/posts'
        fetchMock.mockResponseOnce(() => new Promise(resolve => setTimeout(() => resolve({ body: 'ok' }), 100)))
        fetchMock.mockResponse(JSON.stringify({ data: '12345' }))

        const { result } = renderHook(() => useFetch(url, true, { method: 'POST' }))

        expect(result.current.data).toBeUndefined()
        expect(result.current.error).toBeFalsy()
        expect(result.current.loading).toBe(false)

        const firstCallResponse = result.current.refetch({ body: 'hello' })

        const secondCallResponse = result.current.refetch({ method: 'GET' })

        await expect(firstCallResponse).resolves.toEqual({
            data: undefined,
            error: undefined,
            aborted: true,
        })

        await expect(secondCallResponse).resolves.toEqual({
            data: { data: '12345' },
            error: undefined,
            aborted: undefined,
        })

        await waitFor(() => expect(result.current.loading).toBe(false))
        expect(result.current.data).toEqual({ data: '12345' })
        expect(result.current.error).toBeFalsy()

        expect(fetchMock).toHaveBeenCalledTimes(2)
        expect(fetchMock).toHaveBeenCalledWith(url, {
            method: 'POST',
            body: 'hello',
            signal: expect.any(AbortSignal),
        })
        expect(fetchMock).toHaveBeenCalledWith(url, {
            method: 'GET',
            signal: expect.any(AbortSignal),
        })
    })

    test('should handle errors', async () => {
        const url = 'https://jsonplaceholder.typicode.com/wrong'
        fetchMock.mockReject(new Error('fake error message'))

        const { result } = renderHook(() =>
            useFetch(url, {
                method: 'POST',
                body: 'hello',
                signal: expect.any(AbortSignal),
            }),
        )

        expect(result.current.data).toBe(undefined)

        expect(result.current.error).toBeFalsy()

        await waitFor(() => {
            expect(result.current.data).toBeUndefined()

            expect(result.current.error?.message).toEqual('fake error message')

            expect(result.current.loading).toBe(false)
        })

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledWith(url, {
            method: 'POST',
            body: 'hello',
            signal: expect.any(AbortSignal),
        })
    })

    test('should handle http error responses', async () => {
        const url = 'https://jsonplaceholder.typicode.com/postie'
        fetchMock.mockResponse('Not found', {
            status: 404,
        })

        const { result } = renderHook(() => useFetch(url))

        expect(result.current.data).toBe(undefined)

        expect(result.current.error).toBeFalsy()

        await waitFor(() => {
            expect(result.current.data).toBeUndefined()

            expect(result.current.error?.message).toEqual('HTTP error! Status: 404')

            expect(result.current.loading).toBe(false)
        })

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledWith(url, { signal: expect.any(AbortSignal) })
    })

    test('should not use previous data returned after subsequent calls', async () => {
        const url = 'https://jsonplaceholder.typicode.com/'
        let firstCallResolved = false
        let firstCallResolve
        let secondCallResolve
        fetchMock.mockResponse(request => {
            if (request.url.endsWith('1')) {
                return new Promise(resolve => {
                    firstCallResolve = () => resolve(JSON.stringify({ data: '12345' }))
                    firstCallResolved = true
                })
            } else {
                return new Promise(resolve => {
                    secondCallResolve = () => resolve(JSON.stringify({ data: '67890' }))
                })
            }
        })

        const initialProps = `${url}1`
        const { result, rerender } = renderHook((hookUrl: string) => useFetch(hookUrl), {
            initialProps,
        })

        expect(result.current.data).toBeUndefined()

        expect(result.current.error).toBeFalsy()

        expect(result.current.loading).toBe(true)

        rerender(`${url}2`)
        firstCallResolve!()

        await waitFor(() => {
            expect(firstCallResolved).toBeTruthy()
        })

        expect(result.current.data).toBeUndefined()
        expect(result.current.error).toBeFalsy()
        expect(result.current.loading).toBe(true)

        secondCallResolve!()

        await waitFor(() => {
            expect(result.current.loading).toBe(false)
        })
        expect(result.current.data).toEqual({ data: '67890' })
        expect(result.current.error).toBeFalsy()

        expect(fetchMock).toHaveBeenCalledTimes(2)
        expect(fetchMock).toHaveBeenCalledWith(url + 1, { signal: expect.any(AbortSignal) })
        expect(fetchMock).toHaveBeenCalledWith(url + 2, { signal: expect.any(AbortSignal) })
    })

    test('should rerender when url changes', async () => {
        const url1 = 'https://jsonplaceholder.typicode.com/posts/1'
        const url2 = 'https://jsonplaceholder.typicode.com/posts/2'

        const { rerender } = renderHook(hookUrl => useFetch(hookUrl), {
            initialProps: url1,
        })

        rerender(url2)

        expect(fetchMock).toHaveBeenCalledTimes(2)
        expect(fetchMock).toHaveBeenCalledWith(url1, { signal: expect.any(AbortSignal) })
        expect(fetchMock).toHaveBeenCalledWith(url2, { signal: expect.any(AbortSignal) })
    })

    test('should rerender when options change', async () => {
        const url = 'https://jsonplaceholder.typicode.com/'

        const initialProps = {
            method: 'POST',
        }
        const { rerender } = renderHook((options: RequestInit) => useFetch(url, options), {
            initialProps,
        })

        rerender({
            method: 'POST',
            body: 'hello',
        })

        expect(fetchMock).toHaveBeenCalledTimes(2)
        expect(fetchMock).toHaveBeenCalledWith(url, { signal: expect.any(AbortSignal), method: 'POST' })
        expect(fetchMock).toHaveBeenCalledWith(url, { signal: expect.any(AbortSignal), method: 'POST', body: 'hello' })
    })

    test('should not rerender when options do not change', async () => {
        const url = 'https://jsonplaceholder.typicode.com/'

        const { rerender } = renderHook((options: RequestInit) => useFetch(url, options), {
            initialProps: {
                method: 'POST',
            },
        })

        rerender({
            method: 'POST',
        })

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(fetchMock).toHaveBeenCalledWith(url, { signal: expect.any(AbortSignal), method: 'POST' })
    })
})
