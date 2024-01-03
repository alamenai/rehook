import { useEffect, useState } from 'react'

export function useUnsavedFormChanges() {
    const [isFormChanged, setIsFormChanged] = useState(false)

    const setFormChanged = (value: boolean) => {
        setIsFormChanged(value)
    }

    const confirmExit = () => {
        return 'You have unsaved changes. Are you sure you want to leave?'
    }

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (isFormChanged) {
                window.onbeforeunload = confirmExit
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [isFormChanged])

    return { isFormChanged, setFormChanged }
}
