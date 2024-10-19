/**
 * Jest configuration file for the Approval Workflow Service.
 *
 * This configuration ensures that all components of the Approval Workflow Service are thoroughly tested to maintain high quality and reliability.
 *
 * Requirements Addressed:
 * - **Testing and Quality Assurance**
 *   - *Location:* Technical Specification/Development Guidelines/Testing
 *   - *Description:* Ensure that all components of the approval workflow service are thoroughly tested to maintain high quality and reliability.
 *
 * External Dependencies:
 * - **jest** (version 26.6.3): Testing framework used for running unit and integration tests.
 */

module.exports = {
  /**
   * Use the 'ts-jest' preset to transpile TypeScript files.
   * This allows Jest to understand TypeScript syntax during testing.
   */
  preset: 'ts-jest',

  /**
   * Specify the test environment for Node.js.
   * Aligns with the backend service environment.
   */
  testEnvironment: 'node',

  /**
   * Define the directory where Jest should output coverage files.
   * Facilitates tracking of code coverage over time.
   */
  coverageDirectory: 'coverage',

  /**
   * Include all TypeScript files in the 'src' directory for coverage collection.
   * Ensures comprehensive test coverage across the service.
   */
  collectCoverageFrom: ['src/**/*.ts'],

  /**
   * Set global coverage thresholds.
   * Enforces minimum coverage percentages to maintain code quality.
   * 
   * Coverage Thresholds:
   * - Branches: 80%
   * - Functions: 85%
   * - Lines: 90%
   * - Statements: 85%
   * 
   * This directly supports the requirement for thorough testing:
   * - *Location:* Technical Specification/Development Guidelines/Testing
   * - *Description:* Ensure that all components of the approval workflow service are thoroughly tested to maintain high quality and reliability.
   */
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 90,
      statements: 85,
    },
  },

  /**
   * Map module paths using regular expressions.
   * Simplifies import statements by allowing aliases.
   * 
   * Example:
   * - Importing '@/utils' maps to '<rootDir>/src/utils'.
   */
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  /**
   * Specify scripts to run after the test framework is installed.
   * Allows for custom setup configurations.
   * 
   * Setup Files:
   * - `<rootDir>/jest.setup.js`: Contains setup code executed before tests run.
   */
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  /**
   * Global configuration options for Jest.
   * Includes settings specific to 'ts-jest'.
   */
  globals: {
    'ts-jest': {
      /**
       * Additional ts-jest configurations can be added here if necessary.
       */
    },
  },
};