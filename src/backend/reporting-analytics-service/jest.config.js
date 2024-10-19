// jest.config.js - Jest configuration for the Reporting and Analytics Service

/**
 * This configuration file sets up the testing environment for the Reporting and Analytics Service.
 * It defines how tests are run and specifies options such as test coverage, test environment, and module resolution.
 *
 * Requirements Addressed:
 * - Automated Testing
 *   - Location: Technical Specification/Development Practices/Testing
 *   - Description: Ensure all components are thoroughly tested with unit and integration tests to maintain code quality and reliability.
 *
 * This configuration ensures that the service meets the testing standards specified in the technical documentation.
 *
 * Dependencies:
 * - Jest (v^26.6.0): Testing framework for running unit and integration tests.
 * - Supertest (v^6.0.0): Facilitates HTTP assertions for testing Express.js applications.
 *
 * Internal Dependencies:
 * - tsconfig.json: Provides TypeScript configuration for transpiling TypeScript files during tests.
 */

module.exports = {
  /**
   * Specify the test environment that will be used for testing.
   * Setting 'node' ensures that tests run in a Node.js environment, which is suitable for backend services.
   */
  testEnvironment: 'node',

  /**
   * Transform configuration for Jest to use 'ts-jest' for transpiling TypeScript files.
   * This allows Jest to understand and run tests written in TypeScript.
   *
   * Note: 'ts-jest' must be installed as a dev dependency.
   */
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
  },

  /**
   * Specify the module file extensions for importing.
   * This configuration allows importing modules without specifying the extension.
   */
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  /**
   * Configure code coverage collection and reporting.
   * This aligns with the requirement to thoroughly test all components and maintain code quality.
   */
  collectCoverage: true, // Enable code coverage collection

  /**
   * Define the output directory for coverage reports.
   * Coverage reports will be generated in the specified directory.
   */
  coverageDirectory: 'coverage',

  /**
   * Specify which files should have coverage information collected.
   * Collect coverage from all TypeScript files in the 'src' directory.
   */
  collectCoverageFrom: ['src/**/*.ts'],

  /**
   * Specify the coverage reporters to use.
   * Generates coverage reports in multiple formats for different use cases.
   */
  coverageReporters: ['json', 'lcov', 'text', 'clover'],

  /**
   * Additional configuration options can be added here to suit project-specific requirements.
   * This setup ensures compliance with enterprise testing standards.
   */
};