// src/backend/reimbursement-processing-service/src/index.ts

/**
 * Entry point for the Reimbursement Processing Service.
 *
 * This file initializes and starts the Express server for the Reimbursement Processing Service.
 *
 * Requirements Addressed:
 * - Reimbursement Processing (Technical Specification/13.5 Reimbursement Processing)
 *   - Automate the reimbursement process for approved expenses, integrating seamlessly with payroll systems and supporting multiple payment methods.
 *   - TR-F005.1: Integrate with payroll systems for direct deposit reimbursements.
 *   - TR-F005.2: Support multiple reimbursement methods (e.g., payroll, separate bank transfer).
 *   - TR-F005.3: Automatically generate expense reports for finance team review.
 */

/**
 * External Dependencies
 *
 * - dotenv (version 8.2.0): To load environment variables from a .env file into process.env.
 */
import dotenv from 'dotenv'; // dotenv version 8.2.0

// Configure environment variables
dotenv.config();

/**
 * Internal Dependencies
 *
 * - initializeApp: Function imported from app.ts to set up the Express application
 *   with all necessary middleware and routes.
 */
import { initializeApp } from './app';

/**
 * Global Variables
 *
 * - PORT: The port number on which the server will listen.
 *   Retrieves the value from the environment variable PORT or defaults to 3000.
 */
const PORT = process.env.PORT || 3000;

/**
 * Starts the Express server for the Reimbursement Processing Service.
 *
 * Steps:
 * 1. Call initializeApp to get the configured Express application instance.
 * 2. Start the Express server on the specified PORT.
 * 3. Log the server start-up message indicating the port number.
 *
 * Requirements Addressed:
 * - Ensures the Reimbursement Processing Service is running and ready to handle requests
 *   as per Technical Specification/13.5 Reimbursement Processing.
 */
function startServer(): void {
  // Step 1: Get the configured Express application instance.
  const app = initializeApp();

  // Step 2: Start the Express server on the specified PORT.
  app.listen(PORT, () => {
    // Step 3: Log the server start-up message indicating the port number.
    console.log(`Reimbursement Processing Service is running on port ${PORT}`);
  });
}

// Start the server by invoking startServer
startServer();