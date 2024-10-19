/**
 * The main entry point for the authentication service.
 * Responsible for starting the server and initializing the application with the appropriate configuration and middleware.
 *
 * Requirements Addressed:
 * - User Authentication and Authorization
 *   Location: Technical Specification/13.1 User Authentication and Authorization
 *   Description: Manage secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.
 */

// Import the initializeApp function to set up the Express application with middleware and routes.
// Internal Dependency: initializeApp from './app'
import { initializeApp } from './app';

// Import the Express module.
// External Dependency: 'express' version 4.17.1 - Used for creating the Express application and handling HTTP requests.
// Version: 4.17.1
import * as express from 'express';

// Retrieve the server port from environment variables or use a default value.
// Configuration: server.port = process.env.PORT || 3000
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Initialize the Express application with middleware and routes.
const app = initializeApp();

// Start the server and listen on the specified port.
// Function: startServer
// Description: Starts the Express server on the specified port.
const server = app.listen(port, () => {
  // Log a message indicating that the server is running and listening on the port.
  console.log(`Authentication service is running on port ${port}.`);
});

// Export the server instance.
// Global Variable: server - An instance of an HTTP server created by Express.
export default server;