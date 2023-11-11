import { useEffect, useState } from 'react'

export const useUrl = (fn?: () => void) => {
    const [url] = useState(window.location.href)

    useEffect(() => {
        if (fn && typeof fn === 'function') {
            fn()
        }
    }, [url, fn])

    const getPort = () => {
        return window.location.port
    }

    const getRootPath = () => {
        const pathArray = window.location.pathname.split('/')
        return pathArray[1] || ''
    }

    const getQueryParams = () => {
        const searchParams = new URLSearchParams(window.location.search)
        const queryParams: { [key: string]: string } = {}

        for (const [key, value] of searchParams.entries()) {
            queryParams[key] = value
        }

        return queryParams
    }

    return {
        url,
        getRootPath,
        getQueryParams,
        getPort,
    }
}
