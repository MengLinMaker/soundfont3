import type { Config } from 'jest'
const config: Config = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1'
  },
  setupFiles: ['<rootDir>/jest.setup.ts']
}
module.exports = config
