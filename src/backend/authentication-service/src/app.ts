// Import Express application framework (Express version 4.17.1)
import express from 'express';

// Import the setupRoutes function to configure authentication routes
import setupRoutes from './routes/authRoutes';

// Import authenticate middleware to secure routes
import authenticate from './middlewares/authMiddleware';

/**
 * Initializes the Express application with middleware and routes.
 *
 * Addresses:
 * - Requirement: User Authentication and Authorization
 * - Location: Technical Specification/13.1 User Authentication and Authorization
 *
 * @returns {object} The configured Express application instance.
 */
function initializeApp() {
    // Create an instance of an Express application
    const app = express();

    // Configure middleware for parsing JSON and URL-encoded data
    app.use(express.json()); // Parse JSON bodies
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

    // Set up authentication routes using the setupRoutes function
    setupRoutes(app);

    // Apply the authenticate middleware to secure routes
    app.use(authenticate);

    // Return the configured Express application instance
    return app;
}

// Export the initializeApp function
export default initializeApp;