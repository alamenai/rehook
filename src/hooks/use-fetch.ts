import { useEffect, useState } from 'react'

export const useFetch = <DataType>(url: string, trigger = true, requestOptions?: RequestInit) => {
    const [error, setError] = useState<Error | undefined>(undefined)

    const [data, setData] = useState<DataType | undefined>(undefined)

    const [isLoading, setIsLoading] = useState(!trigger || false)

    const [isTriggered, setIsTriggered] = useState(trigger)

    const startTrigger = () => setIsTriggered(true)

    const fetchData = async () => {
        try {
            setIsLoading(true)

            const response = await fetch(url, requestOptions)

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const result = await response.json()

            setData(result)

            setError(undefined)
        } catch (error) {
            if (error instanceof Error) {
                setError(error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setIsTriggered(trigger)
    }, [trigger])

    useEffect(() => {
        if (isTriggered) {
            fetchData()
        }
    }, [isTriggered])

    return { data, isLoading, error, refetch: fetchData, trigger: startTrigger }
}
