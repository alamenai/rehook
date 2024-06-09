'use server'

import { NEXT_DEFAULT_ENV_VARS, VITE_DEFAULT_ENV_VARS, rehookConfig } from '../../rehook.config'

const { ignoreDefaultEnv, framework } = rehookConfig

const isFrameworkVite = framework === 'VITE' // Otherwise it is NEXTJS

export const getEnv = async () => {
    const variables = isFrameworkVite ? import.meta.env : process.env

    if (ignoreDefaultEnv) {
        const filteredVariables = variables.filter((variable: string) =>
            isFrameworkVite ? !VITE_DEFAULT_ENV_VARS.includes(variable) : !NEXT_DEFAULT_ENV_VARS.includes(variable),
        )
        return filteredVariables
    }

    return variables
}
