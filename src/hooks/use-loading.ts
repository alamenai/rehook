import { useEffect, useState } from 'react'

export const useLoading = <T>(state?: boolean, data?: T) => {
    const [loading, setLoading] = useState(state || false)

    const startLoading = () => {
        setLoading(true)
    }

    const startLoadingAfter = (timeout: number) => {
        setTimeout(() => {
            setLoading(true)
        }, timeout)
    }

    const stopLoading = () => {
        setLoading(false)
    }

    const stopLoadingAfter = (timeout: number) => {
        setTimeout(() => {
            setLoading(false)
        }, timeout)
    }

    useEffect(() => {
        if (data) {
            setLoading(false)
        }
    }, [data])

    return {
        loading,
        startLoading,
        stopLoading,
        startLoadingAfter,
        stopLoadingAfter,
    }
}
