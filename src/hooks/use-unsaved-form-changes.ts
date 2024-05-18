import { useEffect, useState } from 'react'

export function useUnsavedFormChanges() {
    const [isFormChanged, setIsFormChanged] = useState(false)

    const setFormChanged = (value: boolean) => {
        setIsFormChanged(value)
    }

    useEffect(() => {
        const handleBeforeUnload = (event: { returnValue: string }) => {
            if (isFormChanged) {
                const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?'
                event.returnValue = confirmationMessage
                return confirmationMessage
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [isFormChanged])

    return { isFormChanged, setFormChanged }
}
