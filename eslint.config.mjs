import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    globalIgnores(['src/components/ui/*']),
    {
        rules: {
            'react/jsx-sort-props': [
                'warn',
                {
                    callbacksLast: true,
                    shorthandLast: true,
                    reservedFirst: ['key', 'ref'],
                },
            ],
        },
    },
];
