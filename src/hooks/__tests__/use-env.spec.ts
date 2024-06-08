import { useEnv } from '../use-env'
import { renderHook } from '@testing-library/react'
import { act } from 'react'

describe('use-env', () => {
    it('should return at least one variable', () => {
        const { result } = renderHook(() => useEnv())
        expect(result.current.variables).not.toBeNull()
    })

    it('should add an environment variable', () => {
        const { result } = renderHook(() => useEnv())
        act(() => result.current.addVariable('SECRET', 'SECRET'))
        expect(result.current.variables.SECRET).not.toBeUndefined()
    })

    it('should save an environment variable in local storage', () => {
        const { result } = renderHook(() => useEnv())
        act(() => result.current.saveVariable('secret', 'SECRET'))
        expect(localStorage.getItem('secret')).toEqual('SECRET')
    })

    it('should  find a saved environment variable in local storage', () => {
        const { result } = renderHook(() => useEnv())
        act(() => result.current.deleteVariable('secret'))
        expect(localStorage.getItem('secret')).toBeNull()
    })
})
