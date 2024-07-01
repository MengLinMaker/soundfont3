import type { Config } from 'jest'
const config: Config = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1'
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
  coveragePathIgnorePatterns: ['mock.ts']
}
module.exports = config
