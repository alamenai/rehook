import { Item, useLocalStorage } from './use-local-storage'
import { useEffect, useState } from 'react'

export const usePersistentState = <PesistentState>(
    key: string,
    initialState: PesistentState,
): [PesistentState, React.Dispatch<React.SetStateAction<PesistentState>>] => {
    const gettItem = () => {
        const item = localStorage.getItem(key)

        if (item) {
            if (parseFloat(item)) {
                return parseFloat(item) as PesistentState
            }

            return item as PesistentState
        }

        return initialState
    }

    const [state, setState] = useState(gettItem())

    const { addItem } = useLocalStorage()

    useEffect(() => {
        addItem(key ?? 'persistent-state', state as Item)
    }, [state, key])

    return [state, setState]
}
