export const VITE_DEFAULT_ENV_VARS = ['BASE_URL', 'NODE', 'MODE', 'DEV', 'PROD', 'SSR']

export const NEXT_DEFAULT_ENV_VARS = ['NODE_ENV', 'TZ']

type RehookConfig = {
    framework: 'VITE' | 'NEXT'
    ignoreDefaultEnv: boolean
}

export const rehookConfig: RehookConfig = {
    framework: 'VITE',
    ignoreDefaultEnv: true,
}
