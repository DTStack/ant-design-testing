module.exports = {
    extends: [require.resolve('ko-lint-config/.eslintrc')],
    rules: {
        '@typescript-eslint/no-non-null-assertion': 2,
    },
    plugins: ['jsdoc'],
    overrides: [
        {
            files: ['**/__tests__/*.tsx'],
            rules: {
                '@typescript-eslint/no-non-null-assertion': 0,
                '@typescript-eslint/ban-ts-comment': 0,
                'jsdoc/no-undefined-types': 0,
            },
        },
    ],
};
