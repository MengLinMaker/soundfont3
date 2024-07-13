import type { Config } from 'jest'
const config: Config = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  coveragePathIgnorePatterns: ['tests', 'index.ts'],
}
module.exports = config
