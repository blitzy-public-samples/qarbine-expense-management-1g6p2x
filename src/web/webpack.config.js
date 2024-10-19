// src/web/webpack.config.js

// Webpack configuration file for the web application
// This configuration is responsible for bundling JavaScript and other assets,
// defining entry points, output settings, module rules, plugins, and development server configurations
// to optimize the build process, addressing the objective to "Enhance Efficiency" as per
// Technical Specification/1.3 System Objectives (Section 1.3 System Objectives)
// Requirement Addressed: Reduce processing time and minimize errors in expense reporting and reimbursement workflows

// Importing necessary modules and dependencies

const path = require('path'); // Node.js path module for handling file paths
const webpack = require('webpack'); // Webpack module (version 5.38.1) for access to built-in plugins

// Importing internal constants to use during the build process
// Internal Dependency: constants.ts (src/web/src/utils/constants.ts)
const constants = require('./src/utils/constants');

// Global variables setup
// Using NODE_ENV global variable, defaulting to 'development' as specified in globals
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  // Setting the mode based on NODE_ENV to optimize the build accordingly
  mode: NODE_ENV, // 'development' or 'production'

  // Entry point of the application
  // Defines where Webpack starts the bundling process
  entry: './src/index.tsx', // As per configuration in the JSON specification

  // Output configuration
  // Specifies the output file name and path for the bundled files
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory path (./dist)
  },

  // Resolve configuration
  // Helps Webpack understand how to resolve imports and exports
  resolve: {
    // Extensions to resolve so that import statements don't need to include extensions
    extensions: ['.tsx', '.ts', '.js'],
    // Aliases for directories to simplify import paths
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },

  // Module rules
  // Defines how different types of modules (files) within the project should be handled
  module: {
    rules: [
      {
        // Rule for handling TypeScript files
        // Transpiles .ts and .tsx files using ts-loader (version 9.2.3)
        test: /\.tsx?$/, // Matches .ts and .tsx files
        exclude: /node_modules/, // Excludes node_modules directory
        use: 'ts-loader', // External Dependency: ts-loader@9.2.3
      },
      {
        // Rule for handling JavaScript and JSX files
        // Transpiles .js and .jsx files using Babel loader with specified presets
        test: /\.jsx?$/, // Matches .js and .jsx files
        exclude: /node_modules/, // Excludes node_modules directory
        use: {
          loader: 'babel-loader', // Needs to be installed alongside presets
          options: {
            // Specifies presets for Babel to transpile code
            presets: [
              '@babel/preset-env', // @babel/preset-env@7.14.5 for modern JS features
              '@babel/preset-react', // @babel/preset-react@7.14.5 for JSX syntax
              '@babel/preset-typescript', // @babel/preset-typescript@7.14.5 for TypeScript
            ],
          },
        },
      },
      // Additional loaders (e.g., for CSS, images) can be added here
    ],
  },

  // Development server configuration
  // Configures webpack-dev-server for local development with live reloading
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Directory to serve files from
    hot: true, // Enables Hot Module Replacement for faster development
  },

  // Plugins used during the build process
  plugins: [
    // Enables Hot Module Replacement globally
    // Plugin provided by Webpack (version 5.38.1)
    new webpack.HotModuleReplacementPlugin(),
    // Additional plugins (e.g., HTMLWebpackPlugin) can be added here
  ],

  // Optimization settings can be configured here if needed
};

// Note:
// - This configuration utilizes internal configurations from tsconfig.json, .babelrc, .eslintrc.js, and .prettierrc
//   to ensure consistent code quality and formatting across the project.
// - By defining module aliases and resolving extensions, we simplify import statements, reducing potential errors
//   and enhancing developer efficiency.
// - The use of loaders and plugins as specified aligns with the project's goal to "Enhance Efficiency"
//   by optimizing the build process and reducing processing time, directly supporting the requirement in
//   Technical Specification/1.3 System Objectives: Reduce processing time and minimize errors in expense reporting and reimbursement workflows.