import { useEffect, useRef } from 'react'

export const useTimeout = (t: number, fn?: () => void) => {
    const timeout = useRef<NodeJS.Timeout>()

    const refresh = () => timeout.current?.refresh()

    const cancel = () => clearTimeout(timeout.current)

    useEffect(() => {
        if (fn) {
            timeout.current = setTimeout(() => fn(), t)
        }
    }, [fn, t])

    return { timeout, refresh, cancel }
}
