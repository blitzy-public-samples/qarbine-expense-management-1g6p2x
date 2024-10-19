/**
 * @file reportRoutes.ts
 * @description Defines routing logic for the Reporting and Analytics Service, mapping HTTP requests to the appropriate controller functions for handling report-related operations.
 *
 * Requirements Addressed:
 * - **Comprehensive Reporting and Analytics**
 *   - Location: Technical Specification/13.6 Reporting and Analytics
 *   - Description: Provide comprehensive reporting and analytical tools for tracking, managing, and forecasting expenses, tailored to different user roles.
 */

import express from 'express'; // express@^4.17.1

import { getReport, postInsights } from '../controllers/reportController';
import { authMiddleware } from '../middlewares/authMiddleware';

/**
 * Configures the Express router with routes for report operations, applying necessary middleware.
 *
 * @function setupRoutes
 * @returns {express.Router} The configured router.
 *
 * Steps:
 * 1. Initialize an Express router instance.
 * 2. Apply the authMiddleware to secure the routes.
 * 3. Define a GET route for '/reports' that uses the getReport controller function.
 * 4. Define a POST route for '/insights' that uses the postInsights controller function.
 * 5. Export the configured router for use in the application.
 */
export function setupRoutes(): express.Router {
  // Step 1: Initialize an Express router instance.
  const router = express.Router();

  // Step 2: Apply the authMiddleware to secure the routes.
  // This ensures that only authenticated users can access the reporting service,
  // addressing security requirements for authentication and authorization.
  // - See Technical Specification/13.1 User Authentication and Authorization
  router.use(authMiddleware);

  /**
   * Step 3: Define a GET route for '/reports' that uses the getReport controller function.
   *
   * @route GET /reports
   * @description Retrieve specific reports based on provided criteria such as employee, department, project, or cost center.
   * @access Protected
   *
   * Requirements Addressed:
   * - **TR-F006.2**: Generate detailed expense reports by employee, department, project, or cost center.
   *   - Location: Technical Specification/13.6 Reporting and Analytics
   *   - Priority: High
   */
  router.get('/reports', getReport);

  /**
   * Step 4: Define a POST route for '/insights' that uses the postInsights controller function.
   *
   * @route POST /insights
   * @description Generate insights from report data, such as trend analysis for travel spending.
   * @access Protected
   *
   * Requirements Addressed:
   * - **TR-F006.3**: Perform trend analysis for travel spending.
   *   - Location: Technical Specification/13.6 Reporting and Analytics
   *   - Priority: Medium
   */
  router.post('/insights', postInsights);

  // Step 5: Return the configured router for use in the application.
  return router;
}

// Export the configured router for use in the application.
export default setupRoutes();