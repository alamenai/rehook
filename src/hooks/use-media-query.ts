import { useEffect, useState } from 'react'

type MediaQuery = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const initWidth = (type: MediaQuery): number => {
    switch (type) {
        case 'xs': {
            return 320
        }

        case 'sm': {
            return 480
        }
        case 'md': {
            return 768
        }

        case 'lg': {
            return 1024
        }

        case 'xl': {
            return 1200
        }

        default: {
            return 1200
        }
    }
}

export const useMediaQuery = (type: MediaQuery) => {
    const initialMediaWidth = initWidth(type)

    const [mediaWidth, setMediaWidth] = useState<number>(initialMediaWidth)

    const resize = (type: MediaQuery) => {
        switch (type) {
            case 'xs': {
                setMediaWidth(320)
                return mediaWidth
            }

            case 'sm': {
                setMediaWidth(480)
                break
            }
            case 'md': {
                setMediaWidth(768)
                break
            }

            case 'lg': {
                setMediaWidth(1024)
                break
            }

            case 'xl': {
                setMediaWidth(1200)
                break
            }

            default: {
                setMediaWidth(1200)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('resize', () => setMediaWidth(innerWidth))
    }, [])

    return { mediaWidth, resize }
}
