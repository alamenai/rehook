import type { UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
    extends: ['@commitlint/config-conventional'],

    rules: {
        'type-enum': [
            2,
            'always',
            [
                'config',
                'feat',
                'test',
                'del',
                'refactor',
                'style',
                'deprecate',
                'chore',
                'ci',
                'build',
                'update',
                'doc',
            ],
        ],
    },
}

module.exports = Configuration
