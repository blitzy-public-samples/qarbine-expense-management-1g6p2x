/**
 * Configuration file for Knex.js, a SQL query builder for Node.js.
 *
 * Requirement Addressed: Database Configuration
 * Location: Technical Specification/Database Design
 * Description: Define and manage database connection settings to ensure secure and efficient access to the relational database.
 */

// Import the Knex module (version 0.95.6)
const knex = require('knex'); // knex version 0.95.6

// Import the database configuration
const databaseConfig = require('./database.json'); // Provides environment-specific database connection settings

/**
 * Initializes and configures Knex.js with environment-specific settings.
 *
 * Requirement Addressed: Database Configuration
 * Location: Technical Specification/Database Design
 * Description: Initializes and configures Knex.js with environment-specific settings to ensure secure and efficient access to the relational database.
 *
 * @param {string} environment - The current environment ('development', 'staging', or 'production').
 * @returns {object} - Configured Knex instance for the specified environment.
 *
 * Steps:
 * 1. Import the Knex module and the database configuration from database.json.
 * 2. Determine the current environment (development, staging, or production).
 * 3. Load the corresponding configuration settings for the determined environment.
 * 4. Initialize Knex with the loaded configuration settings.
 * 5. Return the configured Knex instance.
 */
function initializeKnex(environment) {
  // Step 2: Determine the current environment
  const env = environment || process.env.NODE_ENV || 'development';

  // Step 3: Load the corresponding configuration settings for the determined environment
  const config = databaseConfig[env];

  if (!config) {
    throw new Error(`Database configuration for environment '${env}' not found.`);
  }

  // Step 4: Initialize Knex with the loaded configuration settings
  const knexInstance = knex(config);

  // Step 5: Return the configured Knex instance
  return knexInstance;
}

// Export the configurations for different environments, required by Knex CLI
module.exports = databaseConfig;

// Export the initializeKnex function
module.exports.initializeKnex = initializeKnex;