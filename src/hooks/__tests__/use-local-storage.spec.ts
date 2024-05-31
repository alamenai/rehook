import { checkItem, getLocalStorageItems, useLocalStorage } from '../use-local-storage'
import { renderHook, waitFor } from '@testing-library/react'
import { act } from 'react'

describe('useLocalStorage', () => {
    beforeAll(() => {
        localStorage.clear()
    })

    it('should clear the local storage', () => {
        const { result } = renderHook(() => useLocalStorage())

        act(() => result.current.clearLocalStorage())

        expect(result.current.storage.length).toBe(0)
    })

    it('should return local storage items after first call', () => {
        const { result } = renderHook(() => useLocalStorage())

        expect(result.current.storage).toEqual(getLocalStorageItems())
    })

    it('should return an item or undefined', () => {
        const { result } = renderHook(() => useLocalStorage())

        const item = result.current.getValue('lib')

        if (item) {
            expect(item).toBe('rehook')
        } else {
            expect(item).toBeNull()
        }
    })

    it('should rename the old key to the new key', () => {
        const { result } = renderHook(() => useLocalStorage())

        act(() => result.current.addItem('name', 'alaeddine'))

        act(() => result.current.renameKey('name', 'firstname'))

        expect(result.current.getValue('firstname')).not.toBeNull()
    })

    it('should delete the item', () => {
        const { result } = renderHook(() => useLocalStorage())

        act(() => result.current.addItem('age', 30))

        act(() => result.current.deleteItem('age'))

        expect(localStorage.getItem('age')).toBeNull()
    })

    it('should delete the item after 2 seconds', () => {
        const { result } = renderHook(() => useLocalStorage())

        act(() => result.current.addItem('age', '30'))

        act(() => result.current.deleteItemAfterDelay('age', 2000))

        waitFor(() => expect(localStorage.getItem('age')).toBeNull())
    })

    it('should return the the exact values or undefined', () => {
        const { result } = renderHook(() => useLocalStorage())

        act(() =>
            result.current.addMultipleItems([
                { key: 'lib', value: 'rehook' },
                { key: 'creator', value: 'alaeddine' },
            ]),
        )

        const items = result.current.getMultipleValues(['lib', 'creator'])

        expect(items.length).toBe(2)

        expect(checkItem('lib')).toBe('rehook')

        expect(checkItem('creator')).toBe('alaeddine')
    })

    it('should add a new item or throws an error if it is exist', () => {
        const { result } = renderHook(() => useLocalStorage())

        const item = result.current.getValue('lib')

        if (item !== null) {
            act(() => {
                result.current.addItem('lib', 'rehook')
            })

            expect(item).toBe('rehook')
        }
    })
})
