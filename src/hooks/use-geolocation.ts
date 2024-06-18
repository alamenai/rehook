import { useState, useEffect, useCallback } from 'react'

type Coordinates = {
    latitude: number | null
    longitude: number | null
}

type GeolocationError = {
    code: number
    message: string
} | null

type GeolocationOptions = {
    enableHighAccuracy?: boolean
    timeout?: number
    maximumAge?: number
}

export const useGeolocation = (options?: GeolocationOptions) => {
    const [coordinates, setCoordinates] = useState<Coordinates>({
        latitude: null,
        longitude: null,
    })

    const [error, setError] = useState<GeolocationError>(null)

    const handleSuccess = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords
        setCoordinates({ latitude, longitude })
        setError(null)
    }

    const handleError = (error: GeolocationPositionError) => {
        setError({
            code: error.code,
            message: error.message,
        })
    }

    const getCurrentPosition = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options)
        } else {
            setError({
                code: 0,
                message: 'Geolocation is not supported by your browser.',
            })
        }
    }, [options])

    useEffect(() => {
        getCurrentPosition()
    }, [getCurrentPosition])

    return { coordinates, error, refresh: getCurrentPosition }
}
