import { rehookConfig } from '../rehook.config'
import { useEffect, useState } from 'react'

const VITE_DEFAULT_ENV_VARS = ['BASE_URL', 'NODE', 'MODE', 'DEV', 'PROD', 'SSR']

const { ignoreDefaultEnv, framework } = rehookConfig

export const useEnv = () => {
    const envVars = Object.keys(import.meta.env)

    const [variables, setVariables] = useState<string[]>(envVars)

    const ignoreDefaultVariables = () => {
        if (ignoreDefaultEnv) {
            if (framework === 'VITE') {
                const ignoredVariables = variables.filter(variable => !VITE_DEFAULT_ENV_VARS.includes(variable))
                setVariables(ignoredVariables)
            }
        }
    }

    const renameVariable = (oldVar: string, newVar: string) => {
        const index = variables.indexOf(oldVar)
        if (index !== -1) {
            const updatedEnv = [...variables]
            updatedEnv[index] = newVar
            setVariables(updatedEnv)
        }
    }

    const updateVariable = (currentVarVar: string, newValue: string) => {
        if (variables.includes(currentVarVar)) {
            setVariables(prevEnv => ({
                ...prevEnv,
                [currentVarVar]: newValue,
            }))
        }
    }

    const removeVariable = (currentVar: string) => {
        if (variables.includes(currentVar)) {
            const filteredVars = variables.filter(value => value !== currentVar)
            setVariables(filteredVars)
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

    return { variables, renameVariable, updateVariable, saveVariable, removeVariable, deleteVariable }
}
