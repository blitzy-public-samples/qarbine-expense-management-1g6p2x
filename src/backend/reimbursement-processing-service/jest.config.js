/**
 * Jest configuration file for the Reimbursement Processing Service.
 *
 * This configuration sets up the testing environment, specifies test file patterns,
 * and configures necessary modules for testing the reimbursement processing functionalities.
 *
 * Requirements Addressed:
 * - **Reimbursement Processing**
 *   - Location: Technical Specification/13.5 Reimbursement Processing
 *   - Description: Automate the reimbursement process for approved expenses, integrating seamlessly
 *     with payroll systems and supporting multiple payment methods.
 *
 * By properly configuring Jest, we ensure that all functionalities related to reimbursement processing
 * are thoroughly tested, verifying that the service meets the requirements specified in the technical documentation.
 */

module.exports = {
  /**
   * Specifies the test environment for Jest to simulate.
   * Using 'node' to mirror the backend Node.js environment.
   *
   * Related Requirement:
   * - Ensures testing environment aligns with the backend service implementation for accurate testing.
   */
  testEnvironment: 'node',

  /**
   * Defines the file extensions Jest will process.
   * Includes TypeScript ('ts') and JavaScript ('js') files.
   *
   * Related Requirement:
   * - Supports TypeScript testing to cover all service components written in TypeScript.
   */
  moduleFileExtensions: ['ts', 'js'],

  /**
   * Transforms files before testing them.
   * Uses 'ts-jest' to transpile TypeScript files.
   *
   * External Dependency:
   * - 'ts-jest' (compatible with Jest ^26.6.3)
   *   - Purpose: Allows Jest to understand TypeScript syntax.
   */
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  /**
   * Patterns Jest uses to detect test files.
   * Includes:
   * - Files in '__tests__' directories with a '.ts' extension.
   * - Files ending with '.spec.ts' or '.test.ts'.
   *
   * Internal Dependency:
   * - 'reimbursementController.test.ts'
   *   - Location: src/tests/reimbursementController.test.ts
   *   - Purpose: Contains unit tests for reimbursement operations to ensure correct functionality.
   *
   * Related Requirement:
   * - Ensures all test cases for reimbursement processing are discovered and executed.
   */
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts',
  ],

  /**
   * Modules to run some code to configure or set up the testing framework before each test.
   * Runs after the test framework has been installed in the environment.
   *
   * Related Requirement:
   * - Allows for any necessary setup (e.g., mocks, global variables) required by reimbursement tests.
   */
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  /**
   * Directory where Jest should output its coverage files.
   * Sets the output to the 'coverage' directory at the root level.
   *
   * Related Requirement:
   * - Facilitates monitoring of test coverage to ensure all reimbursement processing code is tested.
   */
  coverageDirectory: '<rootDir>/coverage',

  /**
   * Specifies which files Jest should collect coverage information from.
   * Includes all '.ts' files in 'src' except for declaration files.
   *
   * Related Requirement:
   * - Ensures that all relevant TypeScript source files related to reimbursement processing are included in coverage reports.
   */
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
};

/**
 * External Dependencies:
 * - 'jest' (version ^26.6.3)
 *   - Purpose: Testing framework for running unit tests and ensuring code reliability.
 *     Essential for verifying that reimbursement processing functions as intended.
 *
 * Internal Dependencies:
 * - 'reimbursementController.test.ts'
 *   - Location: src/tests/reimbursementController.test.ts
 *   - Purpose: Contains unit tests for the reimbursementController, ensuring correct functionality
 *     of reimbursement operations as per Technical Specification/13.5 Reimbursement Processing.
 */