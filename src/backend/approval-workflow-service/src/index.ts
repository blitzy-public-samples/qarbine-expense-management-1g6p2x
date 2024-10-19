/**
 * index.ts
 * Entry point for the approval workflow service.
 * 
 * This file initializes the server by importing the app configuration
 * and starting the Express server.
 * 
 * Requirements Addressed:
 * - Approval Workflow (F-004)
 *   - Location: Technical Specification/13.4 Approval Workflow
 *   - Description: Streamline the approval process for submitted expense reports
 *     with configurable workflows, batch processing, and delegation capabilities.
 *   - Technical Requirements:
 *     - TR-F004.1: Configure multi-level approval workflows (High Priority)
 *     - TR-F004.2: Enable batch approval capabilities for managers (Medium Priority)
 *     - TR-F004.3: Provide in-app notifications for pending approvals (High Priority)
 *     - TR-F004.4: Allow managers to request additional information or clarification on expenses (Medium Priority)
 *     - TR-F004.5: Support delegation of approval authority during manager absences (Medium Priority)
 */

// Importing dotenv to load environment variables from a .env file into process.env
import dotenv from 'dotenv'; // dotenv version 8.2.0

// Load environment variables using dotenv
dotenv.config();

// Define global PORT variable
const PORT = process.env.PORT || 3000;

// Import initializeServer function to set up the Express application
import initializeServer from './app';

/**
 * Starts the Express server on the specified port.
 *
 * This function initializes the approval workflow service which handles operations
 * related to the approval process, including multi-level approvals, batch processing,
 * and delegation, as specified in the technical requirements TR-F004.1 to TR-F004.5.
 *
 * Steps:
 * 1. Load environment variables using dotenv.
 * 2. Call initializeServer to set up the Express application.
 * 3. Start the server and listen on the specified PORT.
 * 4. Log a message indicating the server is running and the port number.
 */
function startServer(): void {
    // Step 1: Environment variables are already loaded using dotenv.config()
    // (Already executed above)

    // Step 2: Initialize the Express application
    const app = initializeServer();

    // Step 3: Start the server and listen on the specified PORT
    app.listen(PORT, () => {
        // Step 4: Log a message indicating the server is running and the port number
        console.log(`Approval Workflow Service is running on port ${PORT}`);
    });
}

// Start the server
startServer();