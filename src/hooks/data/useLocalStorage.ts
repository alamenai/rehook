import { useEffect, useState } from 'react'

export const useLocalStorage = (fn?: () => void) => {
    const items = getLocalStorageItems()

    const [storage, setStorage] = useState<{ [x: string]: string | null }[]>(items)

    useEffect(() => {
        if (fn && typeof fn == 'function') {
            fn()
        }
    }, [storage])

    function getLocalStorageItems() {
        const items: { [x: string]: string | null }[] = []

        const keys = Object.keys(localStorage)

        keys.forEach(key => {
            items.push({ [key]: localStorage.getItem(key) })
        })

        return items
    }

    const getItem = (key: string) => {
        return localStorage.getItem(key)
    }

    const getMultipleItems = (keys: string[]) => {
        const items: string[] = []

        keys.forEach(key => {
            const item = localStorage.getItem(key)
            if (item) {
                items.push(item)
            }
        })

        return items
    }

    const addItem = (key: string, value: string) => {
        checkItem(key)

        localStorage.setItem(key, value)

        setStorage([...storage, { [key]: value }])
    }

    const addMultipleItems = (items: { key: string; value: string }[]) => {
        items.forEach(item => {
            const { key, value } = item
            localStorage.setItem(key, value)
            setStorage([...storage, { key, value }])
        })
    }

    const deleteItem = (key: string) => {
        if (!localStorage.getItem(key)) {
            throw new Error('This item does not exist in the local storage')
        }

        checkItem(key)

        localStorage.removeItem(key)

        setStorage(getLocalStorageItems())
    }

    const deleteMultipleItems = (keys: string[]) => {
        keys.forEach(key => {
            checkItem(key)
            localStorage.removeItem(key)
            setStorage(getLocalStorageItems())
        })
    }

    const checkItem = (key: string) => {
        if (!localStorage.getItem(key)) {
            throw new Error('This item does not exist in the local storage')
        }

        return true
    }

    return { storage, getItem, getMultipleItems, addItem, addMultipleItems, deleteItem, deleteMultipleItems }
}
