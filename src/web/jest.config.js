/**
 * Jest Configuration File for the Web Application
 *
 * This configuration sets up Jest for running automated unit and integration tests,
 * ensuring code quality and functionality as part of the CI/CD pipeline.
 *
 * Requirements Addressed:
 * - Automate unit and integration testing to ensure code reliability and quality.
 *   - Location: Technical Specification / CI/CD Pipeline / Testing
 * - Utilize Jest for testing as specified in the technology stack.
 *   - Location: Technical Specification / Technology Stack / Frameworks and Libraries / Testing
 */

/* Jest version 29.5.0 */
// Note: Jest is used for testing React components and ensuring code quality.

/** @type {import('jest').Config} */
module.exports = {
  // Indicates whether the coverage information should be collected while executing the test.
  // This supports the requirement for monitoring code coverage as part of code quality assurance.
  // Location: Technical Specification / CI/CD Pipeline / Monitoring and Feedback
  collectCoverage: true,

  // The directory where Jest should output its coverage files.
  coverageDirectory: 'coverage',

  // An array of file extensions your modules use.
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  // The test environment that will be used for testing.
  // Using jsdom simulates a browser environment for testing React components.
  // Supports cross-platform testing as per Technical Specification.
  testEnvironment: 'jsdom',

  // The glob patterns Jest uses to detect test files.
  testMatch: [
    // Match test files in the 'tests' directory with .test or .spec suffix.
    '**/tests/**/*.(spec|test).(js|jsx|ts|tsx)',
    // Match test files in any directory with .test or .spec suffix.
    '**/?(*.)+(spec|test).(js|jsx|ts|tsx)'
  ],

  // A map from regular expressions to paths to transformers.
  // Use babel-jest (version 29.5.0) to transform JavaScript and TypeScript files using Babel.
  // Location: Technical Specification / Technology Stack / Build Tools
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }]
  },

  // Setup files that will be run after the test framework has been installed.
  // Useful for configuring the testing environment and global variables.
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Mock static assets such as CSS and images during testing.
  // Necessary to prevent errors when importing these files in components.
  // Location: Technical Specification / System Design / User Interface Design / 3. Consistency and Standards
  moduleNameMapper: {
    // Mock CSS modules using identity-obj-proxy (version 3.0.0)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Mock image and asset files
    '\\.(gif|ttf|eot|svg|png|jpg)$': '<rootDir>/__mocks__/fileMock.js'
  },

  // Enable verbose output for testing.
  // Helps in detailed logging of test results for better debugging and traceability.
  // Location: Technical Specification / CI/CD Pipeline / Monitoring and Feedback
  verbose: true,

  // Collect coverage information from relevant directories.
  // Exclude node_modules and configuration files from coverage to focus on application code.
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{js,jsx,ts,tsx}'
  ],

  // Configure Jest to use custom reporters if needed.
  // This can help integrate test results with CI/CD tools.
  // Location: Technical Specification / CI/CD Pipeline / Continuous Integration
  // reporters: ['default', '<rootDir>/custom-reporter.js'],

  // Define module directories for better module resolution.
  moduleDirectories: ['node_modules', 'src'],

  // Configure test timeout to prevent tests from hanging indefinitely.
  // Helps in maintaining efficient test runs.
  testTimeout: 30000
};