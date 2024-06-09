import { NEXT_DEFAULT_ENV_VARS, VITE_DEFAULT_ENV_VARS, rehookConfig } from '../../rehook.config'
import { useEffect, useState } from 'react'

const { ignoreDefaultEnv, framework } = rehookConfig

const isFrameworkVite = framework === 'VITE' // Otherwise it is NEXTJS

export const useEnv = () => {
    const envVars = isFrameworkVite ? import.meta.env : process.env

    const [variables, setVariables] = useState(envVars)

    const ignoreDefaultVariables = () => {
        let ignoredVariables: { [key: string]: string }

        if (ignoreDefaultEnv) {
            ignoredVariables = {}
            for (const key in variables) {
                if (isFrameworkVite ? !VITE_DEFAULT_ENV_VARS.includes(key) : !NEXT_DEFAULT_ENV_VARS.includes(key)) {
                    ignoredVariables[key] = variables[key]
                }
            }
            setVariables(ignoredVariables)
        }
    }

    const addVariable = (variable: string, value: string) => {
        setVariables(prevVars => ({ ...prevVars, [variable]: value }))
    }

    const renameVariable = (oldVar: string, newVar: string) => {
        if (Object.prototype.hasOwnProperty.call(variables, oldVar)) {
            const updatedEnv = { ...variables }
            updatedEnv[newVar] = updatedEnv[oldVar]
            delete updatedEnv[oldVar]
            setVariables(updatedEnv)
        }
    }

    const updateVariable = (currentVarVar: string, newValue: string) => {
        if (Object.prototype.hasOwnProperty.call(variables, currentVarVar)) {
            setVariables(prevEnv => ({
                ...prevEnv,
                [currentVarVar]: newValue,
            }))
        }
    }

    const removeVariable = (currentVar: string) => {
        if (Object.prototype.hasOwnProperty.call(variables, currentVar)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [currentVar]: _, ...updatedVariables } = variables
            setVariables(updatedVariables)
        }
    }

    const saveVariable = (variable: string, value: string) => {
        localStorage.setItem(variable, value)
    }

    const deleteVariable = (variable: string) => {
        if (localStorage.getItem(variable)) {
            localStorage.removeItem(variable)
        }
    }

    useEffect(() => {
        ignoreDefaultVariables()
    }, [])

    return { variables, addVariable, renameVariable, updateVariable, saveVariable, removeVariable, deleteVariable }
}
