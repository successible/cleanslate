module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
    },
    // Bypass some issues with CommonJS vs ESM mode
    transformIgnorePatterns: [
        'node_modules/.pnpm/(?!(uuid@|lodash-es@))',
      ],
}
