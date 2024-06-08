import { useUrl } from '../use-url'
import { renderHook } from '@testing-library/react'

const OLD_LOCATION = window.location

beforeEach(() => {
    Object.defineProperty(window, 'location', {
        value: new URL('http://localhost:5173/search?id=1&name=alaeddine'),
        writable: true,
    })
})

afterAll(() => {
    Object.defineProperty(window, 'location', {
        value: OLD_LOCATION,
        writable: true,
    })
})

test('should return the correct url, port and query params', () => {
    const { result } = renderHook(() => useUrl())

    expect(result.current.url).toBe(window.location.href)

    expect(result.current.getPort()).toBe(window.location.port)

    expect(result.current.getQueryParams()).toStrictEqual({ id: '1', name: 'alaeddine' })
})

test('should return the correct root pathname', () => {
    const { result } = renderHook(() => useUrl())

    expect(result.current.getRootPath()).toBe(window.location.pathname.split('/')[1])
})
