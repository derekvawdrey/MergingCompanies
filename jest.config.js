/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts', '!src/index.ts'],
  coverageDirectory: 'coverage',
  watchman: false,
  globalSetup: '<rootDir>/src/config/tests/globalSetup.ts',
  globalTeardown: '<rootDir>/src/config/tests/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/src/config/tests/setupTests.ts'],
};
