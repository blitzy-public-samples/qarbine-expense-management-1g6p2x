/**
 * ESLint configuration file for the web application.
 *
 * This configuration enforces code quality and consistency across the project.
 * It includes settings for parsing, environment settings, and specific rules tailored to the project's coding standards.
 *
 * Requirements Addressed:
 * - **Enhance Efficiency** (Technical Specification/1.3 System Objectives)
 *   - Reduce processing time and minimize errors in expense reporting and reimbursement workflows.
 *     - By enforcing consistent code quality, we minimize errors in the application, enhancing overall efficiency.
 */

module.exports = {
  /**
   * Define the environment in which the code runs.
   * - Enables browser global variables like `window` and `document`.
   * - Supports ES2021 features for modern JavaScript syntax.
   */
  env: {
    browser: true,
    es2021: true,
  },
  /**
   * Specifies the parser for ESLint to understand TypeScript syntax.
   * - Using `@typescript-eslint/parser` for parsing TypeScript code.
   */
  parser: '@typescript-eslint/parser', // @typescript-eslint/parser@latest
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Enable parsing of JSX, as we're using React.
    },
    ecmaVersion: 12, // Allows for parsing modern ECMAScript features.
    sourceType: 'module', // Allows for the use of imports.
  },
  /**
   * Plugins extend ESLint's capabilities with additional rules and checks.
   * - Each plugin includes version information as a comment.
   */
  plugins: [
    /**
     * `eslint-plugin-react` to enforce React-specific linting rules.
     * Version: 7.24.0
     */
    'react',
    /**
     * `eslint-plugin-jsx-a11y` to enforce accessibility best practices in JSX.
     * Version: 6.4.1
     */
    'jsx-a11y',
    /**
     * `eslint-plugin-import` to ensure proper import/export syntax and order.
     * Version: 2.23.4
     */
    'import',
    /**
     * `@typescript-eslint` plugin for TypeScript linting.
     * Version: latest
     */
    '@typescript-eslint',
  ],
  /**
   * Extends configurations from recommended ESLint rules and plugins.
   */
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // Recommended rules from `eslint-plugin-react`
    'plugin:jsx-a11y/recommended', // Recommended rules from `eslint-plugin-jsx-a11y`
    'plugin:import/errors', // Import error rules from `eslint-plugin-import`
    'plugin:import/warnings', // Import warning rules from `eslint-plugin-import`
    'plugin:@typescript-eslint/recommended', // Recommended rules from `@typescript-eslint`
  ],
  /**
   * Define global variables to prevent ESLint from flagging them as undefined.
   * - `React` is read-only to prevent reassignment.
   */
  globals: {
    React: 'readonly',
  },
  /**
   * Custom rules to enforce coding standards specific to the project.
   * - Addresses potential errors and improves code consistency.
   */
  rules: {
    /**
     * Disallow declaration of variables that are not used in the code.
     * - Rule: `no-unused-vars`
     * - Severity: `warn`
     * - Helps in identifying unused variables, reducing clutter and potential errors.
     * - Related to enhancing efficiency by minimizing errors.
     */
    'no-unused-vars': 'warn',
    /**
     * Prevent React from being incorrectly marked as unused.
     * - Rule: `react/jsx-uses-react`
     * - Severity: `error`
     * - Ensures that React is recognized in files using JSX.
     */
    'react/jsx-uses-react': 'error',
    /**
     * Prevent variables used in JSX from being incorrectly marked as unused.
     * - Rule: `react/jsx-uses-vars`
     * - Severity: `error`
     * - Ensures that all variables used in JSX are correctly identified.
     */
    'react/jsx-uses-vars': 'error',
    /**
     * Enforce a convention in module import order.
     * - Rule: `import/order`
     * - Severity: `warn`
     * - Promotes organized imports, enhancing readability and maintainability.
     */
    'import/order': 'warn',
    /**
     * Enforce valid anchor elements to improve accessibility.
     * - Rule: `jsx-a11y/anchor-is-valid`
     * - Severity: `warn`
     * - Addresses accessibility best practices as per the project's standards.
     */
    'jsx-a11y/anchor-is-valid': 'warn',
  },
  /**
   * Settings for React plugin.
   * - Automatically detects the React version.
   */
  settings: {
    react: {
      version: 'detect',
    },
  },
};