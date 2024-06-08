// This hook does not deal with caching, de-bouncing or de-duping
// I would seriously consider using TanStack Query instead of this hook
import { useCallback, useEffect, useRef, useState } from 'react'

type UseFetchResponse<T> = {
    data?: T
    loading?: boolean
    error?: Error
    refetch: (options?: RequestInit) => Promise<{ data?: T; error?: Error; aborted?: boolean }>
}
type UseFetch = {
    <T>(url: string): UseFetchResponse<T>
    <T>(url: string, trigger: boolean): UseFetchResponse<T>
    <T>(url: string, requestOptions: RequestInit): UseFetchResponse<T>
    <T>(url: string, trigger: boolean, requestOptions: RequestInit): UseFetchResponse<T>
}

const deepEqual = (a: unknown, b: unknown): boolean => {
    if (a === b) {
        return true
    }
    if (!(a instanceof Object) || !(b instanceof Object)) {
        return false
    }
    if (a.constructor !== b.constructor) {
        return false
    }
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)

    if (aKeys.length !== bKeys.length || aKeys.some(key => !bKeys.includes(key))) {
        return false
    }

    return aKeys.every(key => deepEqual(a[key as keyof typeof a], b[key as keyof typeof b]))
}

export const useFetch: UseFetch = <T = unknown>(
    url: string,
    trigger?: boolean | RequestInit,
    options?: RequestInit,
): UseFetchResponse<T> => {
    const requestOptions = typeof trigger === 'boolean' ? options : trigger || {}
    const hasTrigger = typeof trigger === 'boolean' ? trigger : false

    const abortControllerRef = useRef<AbortController>()
    const requestOptionsRef = useRef<unknown>(requestOptions)
    const requestOptionsChanged = useRef(Symbol())
    if (!deepEqual(requestOptions, requestOptionsRef.current)) {
        requestOptionsRef.current = requestOptions
        requestOptionsChanged.current = Symbol()
    }

    const [error, setError] = useState<Error>()
    const [data, setData] = useState<T>()
    const [loading, setLoading] = useState(false)

    const fetchData = useCallback(
        async (options: RequestInit = {}) => {
            setLoading(true)
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
            const abortController = new AbortController()
            abortControllerRef.current = abortController
            try {
                const response = await fetch(url, { signal: abortController.signal, ...requestOptions, ...options })

                if (abortControllerRef.current !== abortController) {
                    // this should never happen because the call should have been aborted and fallen into the error handler
                    return { aborted: true }
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const result: T = await response.json()

                setData(result)
                return { data: result }
            } catch (error) {
                if (abortControllerRef.current !== abortController) {
                    return { aborted: true }
                }
                setData(undefined)
                let normalisedError = new Error('Unknown Error')
                if (error instanceof Error) {
                    normalisedError = error
                }
                if (typeof error === 'string') {
                    normalisedError = new Error(error)
                }
                setError(normalisedError)
                return { error: normalisedError }
            } finally {
                if (abortControllerRef.current === abortController) {
                    setLoading(false)
                    abortControllerRef.current = undefined
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [url, requestOptionsChanged.current],
    )

    useEffect(() => {
        if (!hasTrigger) {
            fetchData()
        }
    }, [hasTrigger, fetchData])

    return { data, loading, error, refetch: fetchData }
}
