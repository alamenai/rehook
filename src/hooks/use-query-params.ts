import { useHistory } from './use-history'

export const useQueryParams = () => {
    const history = useHistory()

    const urlParams = new URLSearchParams(window.location.search)

    const get = (param: string) => {
        for (const [key, value] of urlParams) {
            if (param === key) {
                return value
            }
        }
    }

    const getAll = () => {
        const keys = new Map()

        for (const [key, value] of urlParams) {
            keys.set(key, value)
        }

        return keys
    }

    const set = (key: string, value: string | number) => {
        const isFound = getAll().has(key)

        if (isFound) {
            urlParams.set(key, value as string)
        } else {
            urlParams.append(key, value as string)
        }

        const newRelativePathQuery = window.location.pathname + '?' + urlParams.toString()

        history.push(newRelativePathQuery)
    }

    const setEncoded = (obj: { [s: string]: string | number } | ArrayLike<string>) => {
        const encodedParams = new URLSearchParams()

        for (const [key, value] of Object.entries(obj)) {
            encodedParams.append(key, value as string)
        }

        const newRelativePathQuery = window.location.pathname + '?' + encodedParams.toString()

        history.push(newRelativePathQuery)
    }

    return { urlParams: getAll(), get, set, setEncoded }
}
