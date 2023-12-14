module.exports = {
    trailingComma: 'es5',
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    printWidth: 120,
    quoteProps: 'consistent',
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'lf',
    plugins: ['prettier-plugin-astro'],
    overrides: [
        {
            files: ['.*', '*.json', '*.md', '*.toml', '*.yml'],
            options: {
                useTabs: false,
            },
        },
    ],
};
