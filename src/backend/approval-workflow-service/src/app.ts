/**
 * Main entry point for the Approval Workflow Service.
 * This file sets up the Express application, configures middleware,
 * and initializes routing for handling approval-related operations.
 *
 * Requirements Addressed:
 * - **Approval Workflow**  
 *   Location: Technical Specification/13.4 Approval Workflow  
 *   Description: Streamline the approval process for submitted expense reports with configurable workflows, batch processing, and delegation capabilities.
 */

import express from 'express'; // External Dependency: Express framework for handling HTTP requests (version 4.17.1)
import mongoose from 'mongoose'; // External Dependency: Mongoose ODM for MongoDB interaction (version 5.13.8)
import cors from 'cors'; // External Dependency: Enables Cross-Origin Resource Sharing (CORS) (version X.X.X)
import bodyParser from 'body-parser'; // External Dependency: Middleware for parsing incoming request bodies (version X.X.X)
import dotenv from 'dotenv'; // External Dependency: Loads environment variables from a .env file into process.env (version X.X.X)
import jwt from 'jsonwebtoken'; // External Dependency: JSON Web Token implementation (version 8.5.1)
import nodemailer from 'nodemailer'; // External Dependency: Module for sending emails (version 6.6.3)

// Internal Dependencies
import { ApprovalModel } from './models/approvalModel'; // Defines the schema for approval records and database interactions.
import { sendApprovalNotification } from './utils/notificationService'; // Used to send notifications about approval statuses.
import { authenticateRequest, authorizeRequest } from './middlewares/authMiddleware'; // Middleware for authentication and authorization.
import approvalRoutes from './routes/approvalRoutes'; // Defines routing for approval-related operations.

// Load environment variables from .env file
dotenv.config();

/**
 * Initializes the Express server, configures middleware, and sets up routes.
 *
 * **Steps:**
 * 1. Create an instance of the Express application.
 * 2. Configure middleware for parsing JSON and handling CORS.
 * 3. Set up authentication and authorization middleware.
 * 4. Initialize routes for approval operations using `approvalRoutes`.
 * 5. Connect to the MongoDB database using Mongoose.
 * 6. Start the server and listen on the specified port.
 *
 * **Requirements Addressed:**
 * - **Approval Workflow**  
 *   Location: Technical Specification/13.4 Approval Workflow  
 *   This function sets up the approval workflow service, enabling configurable workflows for processing expense report approvals.
 */
function initializeServer(): void {
    // Step 1: Create an instance of the Express application.
    const app = express();

    // Step 2: Configure middleware for parsing JSON and handling CORS.
    app.use(bodyParser.json()); // Parses incoming requests with JSON payloads.
    app.use(cors()); // Enables CORS for cross-origin resource sharing.

    // Step 3: Set up authentication and authorization middleware.
    app.use(authenticateRequest); // Ensures requests are authenticated.
    app.use(authorizeRequest); // Ensures requests are authorized based on user roles.

    // Step 4: Initialize routes for approval operations using `approvalRoutes`.
    app.use('/api/approvals', approvalRoutes); // Mounts approval-related routes at the '/api/approvals' path.

    // Step 5: Connect to the MongoDB database using Mongoose.
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/approvalDB';
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');

            // Step 6: Start the server and listen on the specified port.
            const port = process.env.PORT || 3000;
            app.listen(port, () => {
                console.log(`Approval Workflow Service is running on port ${port}`);
            });
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
}

// Invoke the `initializeServer` function to start the server.
initializeServer();