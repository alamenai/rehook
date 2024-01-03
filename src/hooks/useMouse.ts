import { useEffect, useState } from 'react'

type Event = 'mouseenter' | 'mouseleave' | 'mouseover' | 'mousemove' | 'mouseout' | 'click'

export const useMouse = (mouseEvent: Event, fn?: () => void) => {
    const [mousePoisition, setMousePosition] = useState<{ x: number | undefined; y: number | undefined }>({
        x: undefined,
        y: undefined,
    })

    useEffect(() => {
        const handleMouseEvent = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY })

            if (fn) {
                fn()
            }
        }

        window.addEventListener(mouseEvent, handleMouseEvent)

        return () => {
            window.removeEventListener(mouseEvent, handleMouseEvent)
        }
    }, [mousePoisition, fn, mouseEvent])

    return mousePoisition
}
