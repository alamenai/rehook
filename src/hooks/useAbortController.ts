import { useRef } from 'react'

export const useAbortController = (controller: AbortController) => {
    if (!controller) {
        throw new Error('AbortController instance is required. Make sure to provide a valid AbortController.')
    }

    const controllerRef = useRef(controller)

    const abort = () => {
        controllerRef.current.abort()
    }

    const abortAfter = (time: number) => {
        setTimeout(() => {
            controllerRef.current.abort()
        }, time)
    }

    const getSignal = () => {
        return controllerRef.current.signal
    }

    return {
        getSignal,
        abort,
        abortAfter,
    }
}
