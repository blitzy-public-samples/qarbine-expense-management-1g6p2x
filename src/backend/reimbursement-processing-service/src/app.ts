// src/backend/reimbursement-processing-service/src/app.ts

// Entry point for the reimbursement processing service
// Sets up the Express application, configures middleware, and defines routes for handling reimbursement-related operations

// Requirements Addressed:
// - Reimbursement Processing (Technical Specification/13.5 Reimbursement Processing)
//   - TR-F005.1: Integrate with payroll systems for direct deposit reimbursements
//   - TR-F005.2: Support multiple reimbursement methods (e.g., payroll, separate bank transfer)
//   - TR-F005.3: Automatically generate expense reports for finance team review
//   - TR-F005.4: Allow splitting of expenses between personal and corporate cards

// Import necessary external modules
import express from 'express'; // Version: 4.17.1 - Express framework for creating and managing HTTP servers
import mongoose from 'mongoose'; // Version: 5.13.8 - Mongoose library to interact with MongoDB using schemas and models
import Stripe from 'stripe'; // Version: 8.174.0 - Stripe API for processing payments and financial transactions
import jwt from 'jsonwebtoken'; // Version: 8.5.1 - JSON Web Token for authentication and authorization

// Import internal modules
import reimbursementRoutes from './routes/reimbursementRoutes'; // Routes for reimbursement operations
import authMiddleware from './middlewares/authMiddleware'; // Middleware to ensure secure access
import paymentProcessor from './utils/paymentProcessor'; // Utility to handle payment processing
import reimbursementService from './services/reimbursementService'; // Core logic for processing reimbursements
import payrollIntegrationService from './services/payrollIntegrationService'; // Integration with payroll systems

// Import environment variables and configurations
import dotenv from 'dotenv';
dotenv.config();

// Initialize Stripe with API Key from environment variables
const stripeApiKey = process.env.STRIPE_API_KEY || 'Your Stripe API Key';
const stripe = new Stripe(stripeApiKey, { apiVersion: '2020-08-27' });

// Function: initializeApp
/**
 * Initializes the Express application, setting up middleware and routes for the reimbursement processing service.
 * 
 * Steps:
 * 1. Import necessary modules and configurations.
 * 2. Create an Express application instance.
 * 3. Configure middleware for JSON parsing, logging, and authentication.
 * 4. Set up reimbursement-related routes using the reimbursementRoutes module.
 * 5. Connect to the MongoDB database using mongoose.
 * 6. Start the Express server on the specified port.
 * 7. Log server start-up details for monitoring.
 * 
 * @returns {express.Application} The configured Express application instance.
 */
function initializeApp(): express.Application {
    // Step 2: Create an Express application instance.
    const app = express();

    // Step 3: Configure middleware for JSON parsing, logging, and authentication.

    // Middleware for parsing JSON bodies in HTTP requests
    app.use(express.json());

    // (Optional) Middleware for logging HTTP requests (e.g., morgan)
    // import morgan from 'morgan'; // Version: 1.10.0
    // app.use(morgan('combined'));

    // Middleware for authentication using JWT tokens
    // Ensures secure access to the reimbursement processing service by verifying user identity
    // Addresses Requirement: TR-F001.1 Implement secure login process with multi-factor authentication (MFA)
    // Location: Technical Specification/13.1 User Authentication and Authorization
    app.use(authMiddleware);

    // Step 4: Set up reimbursement-related routes using the reimbursementRoutes module.
    // Defines HTTP routes for reimbursement operations
    // Addresses Requirements:
    // - TR-F005.1 Integrate with payroll systems for direct deposit reimbursements
    // - TR-F005.2 Support multiple reimbursement methods
    // Location: Technical Specification/13.5 Reimbursement Processing
    app.use('/api/reimbursements', reimbursementRoutes);

    // Step 5: Connect to the MongoDB database using mongoose.
    // Establishes a connection to MongoDB to store and retrieve reimbursement data
    // Addresses data persistence needs for reimbursement processing
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/reimbursementDB';
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            // Step 7: Log database connection details for monitoring.
            console.log('Connected to MongoDB database');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });

    // Step 6: Start the Express server on the specified port.
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        // Step 7: Log server start-up details for monitoring.
        console.log(`Reimbursement Processing Service is running on port ${port}`);
    });

    return app;
}

// Initialize the application by calling the initializeApp function
initializeApp();