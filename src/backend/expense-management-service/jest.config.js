/**
 * Jest Configuration File for the Expense Management Service
 * Location: Technical Specification -> System Architecture -> API Layer -> Expense Management Service
 *
 * This configuration sets up Jest to run unit and integration tests for the Expense Management Service,
 * ensuring code quality and functionality as per the requirements described in:
 * - Requirement Name: Testing Configuration
 * - Documentation Location: Technical Specification/System Architecture/API Layer/Expense Management Service
 *
 * External Dependencies:
 * - jest (version ^27.0.0) - Runs unit and integration tests.
 * - supertest (version ^6.1.3) - Tests HTTP endpoints.
 *
 * Internal Dependencies:
 * - TypeScript configuration from 'tsconfig.json' to handle TypeScript files.
 */

// Export the Jest configuration
module.exports = {
  /**
   * Set the test environment to Node.js.
   * This corresponds to the requirement to run tests in a Node.js environment, aligning with the backend services,
   * as specified in the Technical Specification under System Architecture -> API Layer -> Expense Management Service.
   */
  testEnvironment: 'node',

  /**
   * Use 'ts-jest' to transform TypeScript files.
   * This allows Jest to transpile TypeScript to JavaScript using 'ts-jest', enabling testing of TypeScript code.
   * This configuration addresses the need to support TypeScript in tests, as per the internal dependency on TypeScript.
   * Location: Technical Specification -> System Components -> Programming Languages -> Backend
   */
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // ts-jest version is specified in package.json dependencies
  },

  /**
   * Specify module file extensions Jest should recognize.
   * Includes both TypeScript and JavaScript file extensions, supporting the various file types used in the project.
   * This ensures that Jest can properly resolve and handle different modules during testing.
   */
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  /**
   * Collect coverage information from the 'src' directory.
   * This enhances code quality by providing insights into test coverage, ensuring that critical parts of the codebase are tested.
   * Location: Technical Specification -> CI/CD Pipeline -> Testing
   */
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],

  /**
   * Define test match patterns to locate test files.
   * Helps Jest identify test files following the project's naming conventions.
   */
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js)'],

  /**
   * Setup testing utilities before tests run.
   * Include any global setup required for tests, such as initializing databases or mocking modules.
   * Uncomment and configure 'setupFilesAfterEnv' if needed.
   */
  // setupFilesAfterEnv: ['./jest.setup.js'],

  /**
   * Use verbose output during test runs.
   * Provides detailed information about each test executed, aiding in debugging and understanding test results.
   */
  verbose: true,

  /**
   * Module name mapper for path aliases based on 'tsconfig.json'.
   * Ensures Jest can resolve module aliases defined in TypeScript configuration.
   * Internal Dependency: TypeScript configuration
   */
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  /**
   * Global setup and teardown scripts.
   * Configure if tests require setup before running and cleanup afterward.
   * Uncomment and set paths to the appropriate scripts if needed.
   */
  // globalSetup: '<rootDir>/test/globalSetup.js',
  // globalTeardown: '<rootDir>/test/globalTeardown.js',

  /**
   * Configure Jest to use custom reporters if necessary.
   * Enhances test reporting to integrate with CI/CD pipelines and other tools.
   */
  // reporters: ['default', '<rootDir>/custom-reporter.js'],

  /**
   * Configure test coverage thresholds.
   * Enforces minimum coverage percentages to maintain code quality standards.
   */
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 90,
      statements: 90,
    },
  },
};

/**
 * Note:
 * - The 'setupFilesAfterEnv', 'globalSetup', and 'globalTeardown' configurations are commented out.
 *   Uncomment and specify the appropriate script paths if test setup or teardown is required.
 * - Ensure that all dependencies are installed with the specified versions:
 *   - jest@^27.0.0
 *   - supertest@^6.1.3
 * - Refer to the Expense Management Service's 'tsconfig.json' for TypeScript configurations.
 * - This configuration aligns with the requirements for Testing Configuration in the Expense Management Service.
 */