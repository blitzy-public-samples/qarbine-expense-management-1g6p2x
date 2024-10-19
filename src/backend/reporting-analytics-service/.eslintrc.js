/**
 * ESLint configuration file for the Reporting and Analytics Service.
 *
 * This configuration ensures code quality and consistency across the
 * service's TypeScript codebase.
 *
 * Requirements Addressed:
 * - **Code Quality and Consistency**
 *   - *Location:* Technical Specification/Development Standards/Code Quality
 *   - *Description:* Ensure that all code adheres to defined style guides and best practices to maintain readability and reduce errors.
 */

/* External Dependencies */

// eslint (version ^7.32.0)
// Provides linting capabilities to enforce coding standards and catch potential errors.

// eslint-plugin-import (version ^2.24.2)
// Ensures proper import/export syntax and helps avoid issues with module resolution.

// eslint-plugin-node (version ^11.1.0)
// Adds Node.js specific linting rules to ensure compatibility and best practices.

// eslint-plugin-promise (version ^4.3.1)
// Enforces best practices for working with JavaScript promises.

// eslint-plugin-jsdoc (version ^35.4.0)
// Validates JSDoc comments to ensure proper documentation of code.

module.exports = {
    // Specifies the ESLint parser for TypeScript.
    // This allows ESLint to understand TypeScript syntax.
    parser: '@typescript-eslint/parser',

    // Extends recommended configurations from ESLint and plugins.
    // These configurations enforce a set of core rules and best practices.
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:node/recommended',
        'plugin:promise/recommended',
        'plugin:jsdoc/recommended'
    ],

    // Specifies the ESLint plugins used.
    // Plugins provide additional rules and checks for specific needs.
    plugins: [
        '@typescript-eslint',
        'import',
        'node',
        'promise',
        'jsdoc'
    ],

    // Defines the environment settings.
    // This informs ESLint about the global variables that are predefined.
    env: {
        node: true, // Enables Node.js global variables and scoping.
        es6: true   // Enables ECMAScript 6 features.
    },

    // Customizes the ESLint rules.
    // Adjusts the severity and specifics of individual linting rules.
    rules: {
        // Enforces consistent indentation of 4 spaces.
        // Addresses code readability and consistency.
        // Reference: Technical Specification/Development Standards/Code Quality
        'indent': ['error', 4],

        // Enforces Unix linebreak style.
        // Ensures cross-platform compatibility.
        'linebreak-style': ['error', 'unix'],

        // Enforces the use of single quotes for strings.
        // Enhances code consistency.
        'quotes': ['error', 'single'],

        // Requires semicolons at the end of statements.
        // Helps prevent potential errors due to automatic semicolon insertion.
        'semi': ['error', 'always'],

        // Warns when console statements are used.
        // Encourages the use of proper logging mechanisms.
        'no-console': 'warn',

        // Warns about variables that are declared but not used.
        // Ignores variables that start with an underscore (commonly used for ignored parameters).
        'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],

        // JSDoc rules to enforce documentation standards.
        // Ensures proper code documentation for maintainability.
        // Reference: Technical Specification/Development Standards/Code Quality
        'jsdoc/check-alignment': 1,
        'jsdoc/check-examples': 1,
        'jsdoc/check-indentation': 1,
        'jsdoc/check-param-names': 1,
        'jsdoc/check-syntax': 1,
        'jsdoc/check-tag-names': 1,
        'jsdoc/check-types': 1,
        'jsdoc/implements-on-classes': 1,
        'jsdoc/match-description': 1,
        'jsdoc/newline-after-description': 1,
        'jsdoc/no-types': 1,
        'jsdoc/no-undefined-types': 1,
        'jsdoc/require-description': 1,
        'jsdoc/require-description-complete-sentence': 1,
        'jsdoc/require-example': 1,
        'jsdoc/require-hyphen-before-param-description': 1,
        'jsdoc/require-param': 1,
        'jsdoc/require-param-description': 1,
        'jsdoc/require-param-name': 1,
        'jsdoc/require-param-type': 1,
        'jsdoc/require-returns': 1,
        'jsdoc/require-returns-check': 1,
        'jsdoc/require-returns-description': 1,
        'jsdoc/require-returns-type': 1
    }
};