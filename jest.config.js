/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'src/tsconfig.json',
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
}
