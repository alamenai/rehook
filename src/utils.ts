export const deepEqual = (a: unknown, b: unknown): boolean => {
    if (a === b) {
        return true
    }
    if (!(a instanceof Object) || !(b instanceof Object)) {
        return false
    }
    if (a.constructor !== b.constructor) {
        return false
    }
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)

    if (aKeys.length !== bKeys.length || aKeys.some(key => !bKeys.includes(key))) {
        return false
    }

    return aKeys.every(key => deepEqual(a[key as keyof typeof a], b[key as keyof typeof b]))
}
