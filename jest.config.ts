import type { Config } from 'jest'

const config: Config = {
    verbose: true,
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./jest.setup.ts'],
}

export default config
