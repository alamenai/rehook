import { useState } from 'react'

export const useLoading = (state: boolean) => {
    const [loading, setLoading] = useState(state)

    const startLoading = () => {
        setLoading(true)
    }

    const stopLoading = () => {
        setLoading(false)
    }

    return {
        loading,
        startLoading,
        stopLoading,
    }
}
