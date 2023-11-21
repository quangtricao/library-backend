export default {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  testMatch: ['**/test/**/*.test.ts'],
  testEnvironment: 'node',
  collectCoverageFrom: ['middlewares/**/*.ts', 'services/**/*.ts', 'controllers/**/*.ts'],
  setupFiles: ['dotenv/config', 'dotenv-expand/config'],
  testTimeout: 15000,
};
