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

    const getParams = () => {
        const keys = []

        for (const [key] of urlParams) {
            keys.push(key)
        }

        return keys
    }

    const set = (name: string, value: string) => {
        const isFound = getParams().some(key => key === name)

        if (isFound) {
            urlParams.set(name, value)
        } else {
            urlParams.append(name, value)
        }

        const newRelativePathQuery = window.location.pathname + '?' + urlParams.toString()

        history.push(newRelativePathQuery)
    }

    return { urlParams, get, getParams, set }
}
