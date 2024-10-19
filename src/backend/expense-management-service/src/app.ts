// Entry point for the Expense Management Service application.
// This file initializes the Express application, sets up middleware, and configures routes for handling expense and receipt operations.

import express from 'express'; // Express framework for creating HTTP servers. Version ^4.17.1
import dotenv from 'dotenv'; // Loads environment variables from a .env file into process.env. Version 8.2.0

dotenv.config(); // Load environment variables using dotenv.

import expenseRoutes from './routes/expenseRoutes'; // Defines routes for handling expense-related HTTP requests.
import receiptRoutes from './routes/receiptRoutes'; // Defines routes for handling receipt-related HTTP requests.
import { authenticate } from './middlewares/authMiddleware'; // Middleware to authenticate requests using JWTs.
import { errorHandler } from './middlewares/errorMiddleware'; // Middleware for handling errors during request processing.

/**
 * Initializes the Express application with middleware and routes.
 * Addresses requirements:
 * - 'Expense Submission' - Technical Specification/13.2 Expense Submission
 * - 'User Authentication and Authorization' - Technical Specification/13.1 User Authentication and Authorization
 * @returns {express.Application} The initialized Express application.
 */
function initializeApp(): express.Application {
    // Create an Express application instance.
    const app = express();

    // Middleware for parsing JSON request bodies.
    // Enables the app to accept JSON payloads from clients.
    // Addresses requirement: 'Expense Submission' (Technical Specification/13.2 Expense Submission)
    app.use(express.json());

    // Middleware for parsing URL-encoded data.
    // Allows the app to handle form submissions and URL-encoded payloads.
    // Addresses requirement: 'Expense Submission' (Technical Specification/13.2 Expense Submission)
    app.use(express.urlencoded({ extended: true }));

    // Authentication middleware to secure routes.
    // Ensures that only authenticated users can access protected routes based on their roles.
    // Addresses requirement: 'User Authentication and Authorization' (Technical Specification/13.1 User Authentication and Authorization)
    app.use(authenticate);

    // Configure routes for expense operations.
    // Handles expense-related HTTP requests such as submitting and retrieving expenses.
    // Addresses requirement: 'Expense Submission' (Technical Specification/13.2 Expense Submission)
    app.use('/api/expenses', expenseRoutes);

    // Configure routes for receipt operations.
    // Handles receipt-related HTTP requests such as uploading and processing receipts.
    // Addresses requirement: 'Expense Submission' (Technical Specification/13.2 Expense Submission)
    app.use('/api/receipts', receiptRoutes);

    // Error handling middleware to manage errors consistently.
    // Catches errors during request processing and sends appropriate responses.
    app.use(errorHandler);

    // Return the initialized Express application.
    return app;
}

// Initialize the app by calling initializeApp function.
const app = initializeApp();

// Export the app for use in other modules (e.g., server entry point).
export default app;