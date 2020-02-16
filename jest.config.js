// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  verbose: true,
  coverageDirectory: 'coverage',
  testMatch: [
    '**/__tests__/**/*.test.[jt]s?(x)',
  ],
};
