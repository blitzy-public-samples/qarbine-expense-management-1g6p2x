// ESLint configuration for the Authentication Service
// Purpose: Ensure consistent code style and quality across the authentication service by enforcing linting rules.
// Requirements Addressed:
// - Code Quality and Consistency (Technical Specification/13.1 User Authentication and Authorization)
//   Description: Ensure consistent code style and quality across the authentication service by enforcing linting rules.

module.exports = {
  // Define the environment to enable global variables and scoping for Node.js and ES6.
  env: {
    node: true, // Enable Node.js global variables and Node.js scoping.
    es6: true,  // Enable ECMAScript 6 features.
  },
  // Extend base configurations to include recommended rules from ESLint and TypeScript ESLint Plugin.
  // External dependencies:
  // - eslint@7.32.0: Provides linting capabilities to enforce code quality and style guidelines.
  // - @typescript-eslint/eslint-plugin@4.29.0: Contains TypeScript-specific linting rules for ESLint.
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  // Specify the parser to be used by ESLint.
  // External dependency:
  // - @typescript-eslint/parser@4.29.0: Parses TypeScript code for ESLint, enabling linting of TypeScript files.
  parser: '@typescript-eslint/parser',
  // Set parser options to define ECMAScript features and module type.
  parserOptions: {
    ecmaVersion: 2020, // Support parsing of modern ECMAScript features up to ES2020.
    sourceType: 'module', // Allow the use of imports and exports.
  },
  // Custom rules to enforce code style and quality.
  rules: {
    // Enforce consistent indentation of 2 spaces.
    // Helps maintain readability and consistency across the codebase.
    indent: ['error', 2],
    // Enforce the consistent use of single quotes.
    // Ensures uniform string syntax in the project.
    quotes: ['error', 'single'],
    // Require semicolons at the end of statements.
    // Prevents potential issues due to automatic semicolon insertion.
    semi: ['error', 'always'],
    // Warn on variables that are declared but not used.
    // Helps in identifying and removing unnecessary code.
    'no-unused-vars': 'warn',
    // Warn on unused variables in TypeScript files.
    // Extends the base rule for better TypeScript support.
    '@typescript-eslint/no-unused-vars': ['warn'],
    // Disable the rule requiring explicit return types on functions.
    // Allows for cleaner code when return types can be inferred.
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};