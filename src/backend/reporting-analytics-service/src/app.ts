// Import external dependencies
import express from 'express'; // express version ^4.17.1
import mongoose from 'mongoose'; // mongoose version ^5.10.9

// Note: 'jsonwebtoken' is used by 'authMiddleware' for verifying JWT tokens
// jsonwebtoken version ^8.5.1

// Import internal dependencies
import { setupRoutes } from './routes/reportRoutes'; // Configures the Express router with report-related routes
import { authMiddleware } from './middlewares/authMiddleware'; // Ensures secure access by enforcing authentication and authorization

// Initialize the Express application instance
const app = express();

/**
 * Initializes the Express server, configures middleware, and sets up routes.
 *
 * Requirements Addressed:
 * - Comprehensive Reporting and Analytics
 *   - Location: Technical Specification/13.6 Reporting and Analytics
 *   - Description: Provide comprehensive reporting and analytical tools for tracking, managing, and forecasting expenses, tailored to different user roles.
 *
 * This function sets up the server to handle report-related operations, ensuring that the service is ready to provide comprehensive reporting and analytics functionalities as specified in the technical requirements.
 */
function initializeServer(): void {
  // Step 1: Create an instance of the Express application
  // The 'app' variable holds our Express application instance
  // This initializes the server that will handle incoming HTTP requests

  // Step 2: Connect to the MongoDB database using Mongoose
  // Establish a connection to the MongoDB database where report data is stored
  // This is essential for fetching and storing aggregated report data
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/reporting_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB database');
    })
    .catch((error) => {
      console.error('Database connection error:', error);
    });

  // Step 3: Apply global middleware for JSON parsing and authentication
  // Use Express JSON middleware to parse incoming JSON requests
  app.use(express.json());

  // Use authentication middleware to protect routes and enforce authorization
  // Ensures secure access to the reporting service
  // Requirements Addressed:
  // - User Authentication and Authorization
  //   - Location: Technical Specification/13.1 User Authentication and Authorization
  //   - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators
  app.use(authMiddleware);

  // Step 4: Set up the application routes using the setupRoutes function
  // Initialize routes for handling report-related operations
  // These routes provide endpoints for report generation and analytics functionality
  // Requirements Addressed:
  // - Comprehensive Reporting and Analytics
  //   - Location: Technical Specification/13.6 Reporting and Analytics
  setupRoutes(app);

  // Step 5: Start the server on the specified port and log the status
  // Listen on the specified port and output a message to confirm the service is running
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Reporting and Analytics Service is running on port ${PORT}`);
  });
}

// Call the initializeServer function to start the server
initializeServer();