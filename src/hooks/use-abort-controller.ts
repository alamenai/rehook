import { useRef, useState } from 'react'

export const useAbortController = (controller: AbortController) => {
    if (!controller) {
        throw new Error('AbortController instance is required. Make sure to provide a valid AbortController.')
    }

    const [isAborted, setIsAborted] = useState(false)

    const controllerRef = useRef(controller)

    const getSignal = () => {
        return controllerRef.current.signal
    }

    const abort = () => {
        controllerRef.current.abort()
        setIsAborted(true)
    }

    const abortAfter = (time: number) => {
        setTimeout(() => {
            abort()
        }, time)
    }

    const abortIf = (fn: (arg?: unknown) => unknown) => {
        if (fn()) {
            abort()
        }
    }

    const abortIfAfter = (fn: (arg?: unknown) => unknown, time: number) => {
        if (fn()) {
            abortAfter(time)
        }
    }

    return {
        getSignal,
        abort,
        abortAfter,
        abortIf,
        abortIfAfter,
        isAborted,
    }
}
