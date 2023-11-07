type LocalStorageItem = {
    key: string
    value: string
}
export const useLocalStorage = () => {
    const addItem = ({ key, value }: LocalStorageItem) => {
        localStorage.setItem(key, value)
    }

    const addMultipleItems = (items: LocalStorageItem[]) => {
        items.forEach(item => {
            const { key, value } = item
            localStorage.setItem(key, value)
        })
    }
    const deleteItem = (key: string) => {
        localStorage.removeItem(key)
    }

    const deleteMultipleItems = (keys: string[]) => {
        keys.forEach(key => {
            localStorage.removeItem(key)
        })
    }

    return { addItem, addMultipleItems, deleteItem, deleteMultipleItems }
}
