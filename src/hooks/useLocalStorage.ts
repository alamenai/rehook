import { useEffect, useState } from 'react'

export const useLocalStorage = (fn?: () => void) => {
    const items = getLocalStorageItems()

    const [storage, setStorage] = useState<{ [x: string]: string | null }[]>(items)

    useEffect(() => {
        if (fn && typeof fn == 'function') {
            fn()
        }
    }, [storage, fn])

    const getValue = (itemKey: string) => {
        const items = Object.values(storage)

        for (const item of items) {
            if (itemKey in item) {
                return item[itemKey]
            }
        }

        return null
    }

    const getMultipleValues = (keys: string[]) => {
        const multipleValues: string[] = []

        keys.forEach(key => {
            const value = getValue(key) as string
            multipleValues.push(value)
        })

        return multipleValues
    }

    const addItem = (key: string, value: string) => {
        const item = checkItem(key)

        if (!item) {
            localStorage.setItem(key, value)
            setStorage([...storage, { [key]: value }])
        }
    }

    const addMultipleItems = (items: { key: string; value: string }[]) => {
        for (const item of items) {
            addItem(item.key, item.value)
        }
    }

    const deleteItem = (key: string) => {
        const item = checkItem(key)
        if (!item) {
            throw new Error('This item does not exist in the local storage')
        }

        if (item) {
            localStorage.removeItem(key)
            setStorage(getLocalStorageItems())
        }
    }

    const deleteMultipleItems = (keys: string[]) => {
        keys.forEach(key => {
            deleteItem(key)
        })
    }

    return { storage, getValue, getMultipleValues, addItem, addMultipleItems, deleteItem, deleteMultipleItems }
}

export const checkItem = (key: string) => localStorage.getItem(key)

export const getLocalStorageItems = () => {
    const items: { [x: string]: string | null }[] = []

    const keys = Object.keys(localStorage)

    keys.forEach(key => {
        items.push({ [key]: localStorage.getItem(key) })
    })

    return items
}
