import { useEffect, useState } from 'react'

export function useUnsavedChangesConfirmation() {
    const [isFormChanged, setIsFormChanged] = useState(false)

    const setFormChanged = (value: boolean) => {
        setIsFormChanged(value)
    }

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isFormChanged) {
                event.returnValue = 'You have unsaved changes. Are you sure you want to go?'
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [isFormChanged])

    return { isFormChanged, setFormChanged }
}
