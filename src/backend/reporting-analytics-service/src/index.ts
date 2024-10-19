// index.ts
//
// This file serves as the main entry point for the Reporting and Analytics Service.
// It initializes the application by configuring the environment, setting up the server, and starting the service.
//
// Requirements Addressed:
// - Comprehensive Reporting and Analytics (Technical Specification/13.6 Reporting and Analytics)
//   Provide comprehensive reporting and analytical tools for tracking, managing, and forecasting expenses, tailored to different user roles.
//   Location: Technical Specification/13.6 Reporting and Analytics
//
// This entry point ensures that the Reporting and Analytics Service is properly initialized and ready to handle incoming requests,
// providing critical functionality for comprehensive expense reporting and analytics.

// External Dependencies
// Importing dotenv to load environment variables from a .env file into process.env (dotenv version ^8.2.0)
import dotenv from 'dotenv';

// Internal Dependencies
// Importing initializeServer to set up and start the Express server with all necessary configurations and routes
import { initializeServer } from './app';
// Importing setupRoutes to configure the Express router with routes for report operations, applying necessary middleware
import { setupRoutes } from './routes/reportRoutes';

// Determine the current environment (development, production, etc.)
const environment = process.env.NODE_ENV || 'development';

// Main function to initialize the Reporting and Analytics Service.
// Addresses Requirement:
// - Comprehensive Reporting and Analytics (Technical Specification/13.6 Reporting and Analytics)
//   This function sets up and starts the service, making it ready to handle incoming requests for generating reports and analytics,
//   providing critical functionality for tracking, managing, and forecasting expenses tailored to different user roles.
function main(): void {
    // Step 1: Load environment variables using dotenv
    // Loads environment variables from a .env file into process.env
    dotenv.config();

    // Step 2: Log the current environment
    // Helps in debugging and ensuring that the correct environment configurations are loaded
    console.log(`Starting Reporting and Analytics Service in ${environment} mode...`);

    // Step 3: Initialize the Express application
    // initializeServer sets up the Express server with all necessary middleware and configurations
    const app = initializeServer();

    // Step 4: Set up routes for report operations
    // setupRoutes configures the router with routes for report operations, applying necessary middleware
    setupRoutes(app);

    // Step 5: Start the server and listen for incoming requests
    const PORT = process.env.PORT || 3000; // Default port is 3000 if not specified in environment variables

    app.listen(PORT, () => {
        console.log(`Reporting and Analytics Service is running on port ${PORT}`);
    });
}

// Call the main function to start the service
main();