/**
 * approvalRoutes.ts
 * 
 * Defines the routing for approval-related operations in the approval workflow service.
 * Sets up the endpoints for creating, updating, and retrieving approval records.
 * Applies necessary middleware for authentication and authorization.
 * 
 * Addressed Requirements:
 * - Approval Workflow (Technical Specification/13.4 Approval Workflow)
 *   - Description: Streamline the approval process for submitted expense reports with configurable workflows, batch processing, and delegation capabilities.
 *   - TR-F004.1: Configure multi-level approval workflows.
 * 
 * Dependencies:
 * - External:
 *   - express (version 4.17.1): Used for creating the HTTP server and handling routing.
 * - Internal:
 *   - createApprovalHandler, updateApprovalHandler, getApprovalHandler from '../controllers/approvalController': Handles creation, updating, and retrieval of approval records.
 *   - authenticateRequest, authorizeRequest from '../middlewares/authMiddleware': Middleware to ensure requests are authenticated and authorized.
 */

// Import external dependencies
import express from 'express'; // express version 4.17.1

// Import internal dependencies
import { createApprovalHandler, updateApprovalHandler, getApprovalHandler } from '../controllers/approvalController';
import { authenticateRequest, authorizeRequest } from '../middlewares/authMiddleware';

// Create an instance of express Router
const router = express.Router();

/**
 * @route POST /approvals
 * @description Endpoint to create a new approval record.
 * Applies authentication and authorization middleware.
 * 
 * Addressed Requirements:
 * - Approval Workflow (Technical Specification/13.4 Approval Workflow)
 *   - TR-F004.1: Configure multi-level approval workflows.
 * 
 * Middleware:
 * - authenticateRequest: Ensures the request is authenticated.
 * - authorizeRequest: Ensures the user has the necessary permissions based on their role.
 * 
 * Handler:
 * - createApprovalHandler: Handles the creation of new approval records.
 */
router.post('/approvals', authenticateRequest, authorizeRequest, createApprovalHandler);

/**
 * @route PUT /approvals/:id
 * @description Endpoint to update an existing approval record.
 * Applies authentication and authorization middleware.
 * 
 * Addressed Requirements:
 * - Approval Workflow (Technical Specification/13.4 Approval Workflow)
 *   - TR-F004.1: Configure multi-level approval workflows.
 * 
 * Middleware:
 * - authenticateRequest: Ensures the request is authenticated.
 * - authorizeRequest: Ensures the user has the necessary permissions based on their role.
 * 
 * Handler:
 * - updateApprovalHandler: Handles the updating of existing approval records.
 */
router.put('/approvals/:id', authenticateRequest, authorizeRequest, updateApprovalHandler);

/**
 * @route GET /approvals/:id
 * @description Endpoint to retrieve an approval record by ID.
 * Applies authentication and authorization middleware.
 * 
 * Addressed Requirements:
 * - Approval Workflow (Technical Specification/13.4 Approval Workflow)
 *   - TR-F004.1: Configure multi-level approval workflows.
 * 
 * Middleware:
 * - authenticateRequest: Ensures the request is authenticated.
 * - authorizeRequest: Ensures the user has the necessary permissions based on their role.
 * 
 * Handler:
 * - getApprovalHandler: Handles the retrieval of approval records.
 */
router.get('/approvals/:id', authenticateRequest, authorizeRequest, getApprovalHandler);

// Export the router to be used in the main application
export default router;