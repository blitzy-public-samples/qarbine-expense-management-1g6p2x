// Jest configuration for the Authentication Service
// This configuration file sets up Jest for testing the Authentication Service,
// ensuring compliance with testing requirements specified in the technical documentation,
// particularly related to authentication and authorization functionalities.

// Importing the ts-jest preset for TypeScript support in Jest
// ts-jest version: 27.0.7
module.exports = {
  // Indicates whether each individual test should be reported during the run
  // Helps in detailed logging of test results for better debugging
  // (Ref: System Design/API Design/Testing Strategy)
  verbose: true,

  // The root directory that Jest should scan for tests and modules within
  // Keeps the testing scope within the src directory of the service
  rootDir: './src',

  // Preset configuration for ts-jest to handle TypeScript files
  // Ensures that TypeScript code is correctly compiled during testing
  // (Ref: Technology Stack/Backend)
  preset: 'ts-jest',

  // The test environment that will be used for testing
  // Uses Node.js environment to match the backend runtime
  // (Ref: System Components/API Layer/Authentication Service)
  testEnvironment: 'node',

  // Transform settings to process TypeScript files using ts-jest
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  // Module file extensions for importing in tests
  // Supports importing of TypeScript and JavaScript modules
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // Pattern to detect test files
  // Jest will look for files ending with .test.ts or .spec.ts
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',

  // Collect coverage information while running tests
  // Ensures critical code paths are tested (Ref: System Design/Testing)
  collectCoverage: true,

  // Directory where Jest should output its coverage files
  coverageDirectory: '../coverage',

  // An array of regexp pattern strings that are matched against all test paths
  // Tests in node_modules and dist directories are ignored
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // Setup files that will be run before each test file
  // Used to configure the testing environment for features like MFA and SSO
  // (Ref: Technical Requirements/TR-F001.1 and TR-F001.2 in Section 13.1 User Authentication and Authorization)
  setupFilesAfterEnv: ['../tests/setup/setupTests.js'],

  // Global setup module that exports an asynchronous function
  // Initializes test databases and other global configurations
  // Supports testing of authentication flows
  globalSetup: '../tests/setup/globalSetup.js',

  // Global teardown module that exports an asynchronous function
  // Cleans up resources initialized in globalSetup
  globalTeardown: '../tests/setup/globalTeardown.js',
};