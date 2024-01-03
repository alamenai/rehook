import { useEffect, useState } from 'react'

export const useFetch = (url: string, trigger?: boolean, requestOptions?: RequestInit) => {
    const [error, setError] = useState('')

    const [data, setData] = useState<undefined>(undefined)

    const [isLoading, setLoading] = useState(!trigger || false)

    const [onTrigger, setTrigger] = useState(trigger)

    const fetchData = async () => {
        try {
            const response = await fetch(url, requestOptions)

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const result = await response.json()

            setData(result)

            setError('')
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setTrigger(trigger)
    }, [trigger])

    useEffect(() => {
        if (!onTrigger) {
            fetchData()
        }
    }, [onTrigger])

    return { data, isLoading, error, refetch: fetchData }
}
