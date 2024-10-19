// ESLint configuration file for the Expense Management Service
// This configuration ensures code quality and consistency across the project
// Requirements Addressed:
// - 'Code Quality and Consistency'
//   Location: Technical Specification/System Design/Programming Languages
//   Description: Ensure code quality and consistency across the project using linting tools like ESLint.

// External Dependencies and Versions:
// - eslint@7.32.0: Provides linting capabilities to enforce code quality and style guidelines.
// - @typescript-eslint/parser@4.29.0: Parses TypeScript code for ESLint, enabling linting of TypeScript files.
// - @typescript-eslint/eslint-plugin@4.29.0: Contains TypeScript-specific linting rules for ESLint.
// - eslint-plugin-import@2.24.2: Ensures proper import/export syntax and order.
// - eslint-plugin-prettier@3.4.0: Integrates Prettier formatting rules with ESLint.
// - eslint-config-prettier@8.3.0: Disables ESLint rules that conflict with Prettier.

module.exports = {
  // Specifies the ESLint parser for TypeScript code
  parser: '@typescript-eslint/parser', // @typescript-eslint/parser@4.29.0

  // Parser options to support modern ECMAScript features and modules
  parserOptions: {
    ecmaVersion: 2020, // Allows parsing of ECMAScript 2020 features
    sourceType: 'module', // Allows the use of imports
    project: './tsconfig.json', // Specifies the TypeScript configuration file
  },

  // Defines environments to provide predefined global variables
  env: {
    node: true, // Enables Node.js global variables and Node.js scoping
    es6: true, // Enables ES6 features
    jest: true, // Enables Jest global variables for testing
  },

  // Extends configurations from plugins and recommended rules
  extends: [
    'eslint:recommended', // Uses the recommended ESLint rules
    'plugin:@typescript-eslint/recommended', // Uses recommended rules from @typescript-eslint/eslint-plugin@4.29.0
    'plugin:import/errors', // Uses rules from eslint-plugin-import@2.24.2 to handle import errors
    'plugin:import/warnings', // Uses rules to handle import warnings
    'plugin:import/typescript', // Adds TypeScript support to eslint-plugin-import
    'plugin:prettier/recommended', // Integrates Prettier with ESLint and displays Prettier errors as ESLint errors
  ],

  // Specifies additional plugins
  plugins: [
    '@typescript-eslint', // @typescript-eslint/eslint-plugin@4.29.0
    'import', // eslint-plugin-import@2.24.2
    'prettier', // eslint-plugin-prettier@3.4.0
  ],

  // Custom rules to enforce code style and quality
  rules: {
    // Reports Prettier formatting issues as ESLint errors
    'prettier/prettier': 'error',

    // Ensures a consistent import order and grouping
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'], // Groups imports accordingly
        'newlines-between': 'always', // Enforces new lines between import groups
      },
    ],

    // Enforces consistent indentation of 2 spaces
    indent: ['error', 2],

    // Enforces the use of single quotes for strings
    quotes: ['error', 'single'],

    // Requires semicolons at the end of statements
    semi: ['error', 'always'],

    // Warns about variables that are declared but not used
    'no-unused-vars': 'warn',
  },
};