import { useLocalStorage } from '../use-local-storage'
import { usePersistentState } from '../use-persistent-state'
import { renderHook, waitFor } from '@testing-library/react'

describe('usePersistentState', () => {
    beforeAll(() => {
        localStorage.clear()
    })

    it('should synchronize state with localStorage', () => {
        const { result: persistentStateResult } = renderHook(() => usePersistentState('name', 'aldinbug'))

        const { result: localStorageResult } = renderHook(() => useLocalStorage())

        waitFor(() => {
            console.log(localStorage.getItem('name'))

            expect(localStorageResult.current).toBe(persistentStateResult.current[0])
        })
    })
})
