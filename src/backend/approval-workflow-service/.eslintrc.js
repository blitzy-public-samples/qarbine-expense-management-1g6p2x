// ESLint configuration for the Approval Workflow Service
// Purpose: Ensure code quality and consistency across the service
// Requirements Addressed:
// - Code Quality and Consistency
//   - Location: Technical Specification/Development Guidelines/Code Quality
//   - Description: Ensure consistent coding standards and practices across the codebase to maintain readability and reduce errors.

module.exports = {
    // Define the environments that the code is designed to run in.
    // 'node' enables Node.js global variables and Node.js scoping.
    // 'es6' enables all ECMAScript 6 features except for modules.
    env: {
        node: true,
        es6: true
    },

    // Extend the recommended ESLint rules.
    // 'eslint:recommended' provides a set of core rules that report common problems.
    extends: 'eslint:recommended',

    // Specify the parser options for ECMAScript language features.
    parserOptions: {
        // Set ECMAScript version to 2020 to support modern JavaScript features.
        ecmaVersion: 2020,
        // Set source type to 'module' to enable the use of import/export statements.
        sourceType: 'module'
    },

    // Custom rules to enforce coding standards.
    // These rules help maintain code quality and consistency as per the requirements.
    rules: {
        // Enforce consistent indentation of 4 spaces.
        // Improves readability and maintains uniform coding style.
        // Reference: Technical Specification/Development Guidelines/Code Quality
        'indent': ['error', 4],

        // Enforce consistent linebreak style (Unix - LF).
        // Ensures code uses Unix line endings for consistency across different environments.
        'linebreak-style': ['error', 'unix'],

        // Enforce the consistent use of single quotes.
        // Promotes a uniform style for string literals.
        'quotes': ['error', 'single'],

        // Require semicolons at the end of statements.
        // Prevents potential issues in code execution due to missing semicolons.
        'semi': ['error', 'always'],

        // Warn when console statements are used.
        // Console statements should be avoided in production code.
        // Encourages developers to remove debugging statements before deployment.
        'no-console': 'warn',

        // Warn on variables that are declared but not used.
        // Excludes unused function arguments ('args': 'none') to accommodate middleware patterns.
        'no-unused-vars': ['warn', { 'args': 'none' }]
    }
};