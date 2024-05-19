import { checkItem, getLocalStorageItems, useLocalStorage } from '../useLocalStorage'
import { renderHook } from '@testing-library/react'
import { act } from 'react'

test('useLocalStorage should return local storage items after first call', () => {
    const { result } = renderHook(() => useLocalStorage())

    expect(result.current.storage).toEqual(getLocalStorageItems())
})

test('getValue should return an item or undefined', () => {
    const { result } = renderHook(() => useLocalStorage())

    const item = result.current.getValue('lib')

    if (item) {
        expect(item).toBe('rehook')
    } else {
        expect(item).toBeNull()
    }
})

test('getMultipleValues should return the the exact values or undefined', () => {
    const { result } = renderHook(() => useLocalStorage())

    act(() => {
        result.current.addMultipleItems([
            { key: 'lib', value: 'rehook' },
            { key: 'creator', value: 'alaeddine' },
        ])
    })

    const items = result.current.getMultipleValues(['lib', 'creator'])

    expect(items.length).toBe(2)

    expect(checkItem('lib')).toBe('rehook')

    expect(checkItem('creator')).toBe('alaeddine')
})

test('addItem should add a new item or throws an error if it is exist', () => {
    const { result } = renderHook(() => useLocalStorage())

    const item = result.current.getValue('lib')

    if (item !== null) {
        act(() => {
            result.current.addItem('lib', 'rehook')
        })

        expect(item).toBe('rehook')
    }
})
