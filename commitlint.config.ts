import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
    extends: ['@commitlint/config-conventional'],

    rules: {
        'type-enum': [2, 'always', ['config']],
    },
};

module.exports = Configuration;
