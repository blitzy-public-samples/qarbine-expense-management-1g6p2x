// Importing external dependencies
import express from 'express'; // ^4.17.1 - Provides the framework for building HTTP servers and APIs.
import dotenv from 'dotenv'; // 8.2.0 - Loads environment variables from a .env file into process.env.

// Importing internal dependencies
import { setupRoutes as setupExpenseRoutes } from './routes/expenseRoutes'; // Configures routes for handling expense-related HTTP requests.
import { setupRoutes as setupReceiptRoutes } from './routes/receiptRoutes'; // Configures routes for handling receipt-related HTTP requests.
import { authenticate } from './middlewares/authMiddleware'; // Authenticates requests to ensure secure access.
import { errorHandler } from './middlewares/errorMiddleware'; // Handles errors during request processing.

// Step 1: Load environment variables using dotenv.
dotenv.config();

// Step 2: Create an Express application instance.
const app = express();

// Global variables
const PORT = process.env.PORT || 3000; // The port on which the server will listen.

// Function to initialize the server
function initializeServer(): void {
    /**
     * Initializes the Express server, sets up middleware, and configures routes.
     * 
     * Requirements Addressed:
     * - Expense Management Service Initialization
     *   - Location: Technical Specification/System Architecture/API Layer/Expense Management Service
     *   - Description: Initializes the server and configures middleware and routes for managing expense submissions, receipt processing, and policy enforcement.
     */

    // Step 3: Set up middleware for request parsing and authentication.
    app.use(express.json()); // Parses incoming JSON requests.
    app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data.
    app.use(authenticate); // Authenticates requests to ensure secure access.

    // Step 4: Configure routes for expense and receipt operations.
    setupExpenseRoutes(app); // Sets up routes for handling expense-related HTTP requests.
    setupReceiptRoutes(app); // Sets up routes for handling receipt-related HTTP requests.

    // Step 5: Set up error handling middleware.
    app.use(errorHandler); // Handles errors during request processing.

    // Step 6: Start the server and listen on the specified PORT.
    app.listen(PORT, () => {
        console.log(`Expense Management Service is running on port ${PORT}`);
    });
}

// Initialize the server
initializeServer();