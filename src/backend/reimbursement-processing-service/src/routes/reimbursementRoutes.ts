/**
 * @file reimbursementRoutes.ts
 * @description Defines the HTTP routes for handling reimbursement-related operations, including creating and processing reimbursements, with appropriate authentication and authorization.
 *
 * Requirements Addressed:
 * - **Reimbursement Processing** ([Technical Specification/13.5 Reimbursement Processing](#))
 *   - Automate the reimbursement process for approved expenses, integrating seamlessly with payroll systems and supporting multiple payment methods.
 */

import express from 'express'; // Version 4.17.1 - Express framework to create and manage HTTP routes and middleware.

// Import necessary controllers and middleware from controllers and middlewares.
import { createReimbursement, processReimbursement } from '../controllers/reimbursementController';
import { authenticate, authorize } from '../middlewares/authMiddleware';

/**
 * Configures the reimbursement-related routes with the necessary middleware and handlers.
 *
 * This setup addresses the following technical requirements:
 * - **TR-F005.1**: Integrate with payroll systems for direct deposit reimbursements.
 * - **TR-F005.2**: Support multiple reimbursement methods (e.g., payroll, separate bank transfer).
 * - **TR-F005.3**: Automatically generate expense reports for finance team review.
 *
 * @param router - The Express router object to configure the routes on.
 */
export function setupRoutes(router: express.Router): void {
  // Define a POST route for '/reimbursements' to handle reimbursement creation, using authenticate middleware.
  router.post(
    '/reimbursements',
    authenticate, // Authenticates requests using JWTs.
    /**
     * Handles the creation of new reimbursement requests.
     *
     * Requirements Addressed:
     * - **TR-F005.3**: Automatically generate expense reports for finance team review.
     *
     * @see Technical Specification/13.5 Reimbursement Processing
     */
    createReimbursement
  );

  // Define a PUT route for '/reimbursements/:id/process' to handle reimbursement processing.
  router.put(
    '/reimbursements/:id/process',
    authenticate, // Authenticates requests using JWTs.
    authorize(['Finance']), // Authorizes requests based on user roles; only users with 'Finance' role can process reimbursements.
    /**
     * Processes existing reimbursement requests.
     *
     * Requirements Addressed:
     * - **TR-F005.1**: Integrate with payroll systems for direct deposit reimbursements.
     * - **TR-F005.2**: Support multiple reimbursement methods (e.g., payroll, separate bank transfer).
     *
     * @see Technical Specification/13.5 Reimbursement Processing
     */
    processReimbursement
  );
}