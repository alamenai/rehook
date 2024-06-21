import { useGeolocation } from '../use-geolocation'
import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

// Mocking the navigator.geolocation API
const mockGeolocation = {
    getCurrentPosition: vi.fn(),
}

describe('useGeolocation', () => {
    it('should get current position successfully', async () => {
        const mockPosition = {
            coords: {
                latitude: 10,
                longitude: 20,
            },
        }

        mockGeolocation.getCurrentPosition.mockImplementationOnce(success => success(mockPosition))

        const { result } = renderHook(() => useGeolocation())

        waitFor(() =>
            expect(result.current.coordinates).toEqual({
                latitude: 10,
                longitude: 20,
            }),
        )

        waitFor(() => expect(result.current.error).toBeNull())
    })

    it('should handle geolocation error', async () => {
        const mockError = {
            code: 1,
            message: 'User denied Geolocation',
        }

        mockGeolocation.getCurrentPosition.mockImplementationOnce((_, error) => error(mockError))

        const { result } = renderHook(() => useGeolocation())

        waitFor(() =>
            expect(result.current.coordinates).toEqual({
                latitude: null,
                longitude: null,
            }),
        )

        waitFor(() => expect(result.current.error).toEqual(mockError))
    })

    it('should return error if geolocation is not supported', async () => {
        const { result } = renderHook(() => useGeolocation())

        waitFor(() =>
            expect(result.current.coordinates).toEqual({
                latitude: null,
                longitude: null,
            }),
        )

        waitFor(() =>
            expect(result.current.error).toEqual({
                code: 0,
                message: 'Geolocation is not supported by your browser.',
            }),
        )
    })

    it('should refresh the position when calling refresh function', async () => {
        const mockPosition1 = {
            coords: {
                latitude: 10,
                longitude: 20,
            },
        }

        const mockPosition2 = {
            coords: {
                latitude: 30,
                longitude: 40,
            },
        }

        mockGeolocation.getCurrentPosition.mockImplementationOnce(success => success(mockPosition1))

        const { result } = renderHook(() => useGeolocation())

        waitFor(() =>
            expect(result.current.coordinates).toEqual({
                latitude: 10,
                longitude: 20,
            }),
        )

        waitFor(() => expect(result.current.error).toBeNull())

        // Update mock for the next call
        mockGeolocation.getCurrentPosition.mockImplementationOnce(success => success(mockPosition2))

        // Call the refresh function
        act(() => {
            result.current.refresh()
        })

        waitFor(() =>
            expect(result.current.coordinates).toEqual({
                latitude: 30,
                longitude: 40,
            }),
        )

        waitFor(() => expect(result.current.error).toBeNull())
    })
})
