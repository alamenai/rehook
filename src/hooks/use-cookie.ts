import { useCallback, useState } from 'react'

// Original implementation
// https://github.com/tylerwolff/useCookie
type CookieOptions = {
    days?: number
    path?: string
    domain?: string
    SameSite?: 'None' | 'Lax' | 'Strict'
    Secure?: boolean
    HttpOnly?: boolean
}

export const useCookie = (key: string, initialValue: string) => {
    const [item, setItem] = useState(() => {
        return getCookie(key, initialValue)
    })

    const updateItem = useCallback(
        (value: string, options: CookieOptions) => {
            setItem(value)
            setCookie(key, value, options)
        },
        [key],
    )

    return [item, updateItem]
}

export const stringifyOptions = (options: { [key: string]: boolean | number | string | undefined }) => {
    return Object.keys(options).reduce((acc, key) => {
        if (key === 'days') {
            return acc
        } else {
            if (options[key] === false) {
                return acc
            } else if (options[key] === true) {
                return `${acc}; ${key}`
            } else {
                return `${acc}; ${key}=${options[key]}`
            }
        }
    }, '')
}

export const setCookie = (key: string, value: string, options: CookieOptions) => {
    const optionsWithDefaults = {
        days: 7,
        path: '/',
        ...options,
    }

    const expires = new Date(Date.now() + optionsWithDefaults.days * 864e5).toUTCString()

    document.cookie =
        key + '=' + encodeURIComponent(value) + '; expires=' + expires + stringifyOptions(optionsWithDefaults)
}

export const getCookie = (name: string, initialValue = '') => {
    return (
        document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=')
            return parts[0] === name ? decodeURIComponent(parts[1]) : r
        }, '') || initialValue
    )
}
