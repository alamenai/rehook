import { useEffect, useState, useCallback } from 'react'

type Event = 'mouseenter' | 'mouseleave' | 'mouseover' | 'mousemove' | 'mouseout' | 'click'

type MousePosition = {
    x: number | undefined
    y: number | undefined
}

export const useMouse = (mouseEvent: Event, fn?: (event: MouseEvent) => void): MousePosition => {
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: undefined, y: undefined })

    const handleMouseEvent = useCallback(
        (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY })

            if (fn) {
                fn(event)
            }
        },
        [fn],
    )

    useEffect(() => {
        window.addEventListener(mouseEvent, handleMouseEvent)

        return () => {
            window.removeEventListener(mouseEvent, handleMouseEvent)
        }
    }, [mouseEvent, handleMouseEvent])

    return mousePosition
}
