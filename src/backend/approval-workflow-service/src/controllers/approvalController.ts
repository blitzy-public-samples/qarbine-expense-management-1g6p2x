/**
 * Approval Controller
 *
 * This controller manages the HTTP request handling for approval-related operations in the approval workflow service.
 * It interfaces with the approval service to create, update, and retrieve approval records, ensuring that requests are authenticated and authorized.
 *
 * Requirements Addressed:
 * - Approval Workflow (Technical Specification/13.4 Approval Workflow)
 *   - Streamline the approval process for submitted expense reports with configurable workflows, batch processing, and delegation capabilities.
 *   - Requirement ID: TR-F004.1 - Configure multi-level approval workflows
 *   - Requirement ID: TR-F004.3 - Provide in-app notifications for pending approvals
 *
 * Dependencies:
 * - ApprovalModel: Defines the schema for approval records and provides methods for interacting with the database.
 * - sendApprovalNotification: Used to send notifications to users about the status of their approvals.
 * - authenticateRequest: Middleware to ensure requests are authenticated.
 * - authorizeRequest: Middleware to ensure requests are authorized based on user roles.
 * - createApproval: Handles the creation of new approval records.
 * - updateApproval: Handles the updating of existing approval records.
 * - getApproval: Retrieves approval records by ID.
 */

import { Request, Response, NextFunction } from 'express'; // express version 4.17.1 used for creating the HTTP server and handling routing

import { Approval } from '../models/approvalModel'; // Defines the schema for approval records and provides methods for interacting with the database
import { sendApprovalNotification } from '../utils/notificationService'; // Used to send notifications to users about the status of their approvals
import { createApproval, updateApproval, getApproval } from '../services/approvalService'; // Handles approval operations
import { authenticateRequest, authorizeRequest } from '../middlewares/authMiddleware'; // Middleware to ensure requests are authenticated and authorized based on user roles

/**
 * Handles the creation of new approval records by processing incoming HTTP POST requests.
 * This function is part of the Approval Workflow (Technical Specification/13.4 Approval Workflow) and addresses:
 * - Requirement ID: TR-F004.1 - Configure multi-level approval workflows
 * - Requirement ID: TR-F004.3 - Provide in-app notifications for pending approvals
 *
 * Steps:
 * 1. Extract approval data from the request body.
 * 2. Call the createApproval service function with the extracted data.
 * 3. Send a success response with the created approval record.
 * 4. Handle any errors by sending an appropriate error response.
 *
 * @param req - The HTTP request object
 * @param res - The HTTP response object
 * @param next - The next middleware function
 */
export const createApprovalHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Step 1: Extract approval data from the request body
        const approvalData = req.body;

        // Step 2: Call the createApproval service function with the extracted data
        const approval = await createApproval(approvalData);

        // Step 3: Send a success response with the created approval record
        res.status(201).json({
            message: 'Approval record created successfully.',
            approval,
        });

        // Supporting Requirement ID: TR-F004.3 - Provide in-app notifications for pending approvals
        // Send notification about the new approval
        await sendApprovalNotification(approval);
    } catch (error) {
        // Step 4: Handle any errors by sending an appropriate error response
        next(error);
    }
};

/**
 * Handles the updating of existing approval records by processing incoming HTTP PUT requests.
 * This function is part of the Approval Workflow (Technical Specification/13.4 Approval Workflow) and addresses:
 * - Requirement ID: TR-F004.1 - Configure multi-level approval workflows
 * - Requirement ID: TR-F004.3 - Provide in-app notifications for pending approvals
 *
 * Steps:
 * 1. Extract approval ID and update data from the request.
 * 2. Call the updateApproval service function with the extracted ID and data.
 * 3. Send a success response with the updated approval record.
 * 4. Handle any errors by sending an appropriate error response.
 *
 * @param req - The HTTP request object
 * @param res - The HTTP response object
 * @param next - The next middleware function
 */
export const updateApprovalHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Step 1: Extract approval ID and update data from the request
        const approvalId = req.params.id;
        const updateData = req.body;

        // Step 2: Call the updateApproval service function with the extracted ID and data
        const updatedApproval = await updateApproval(approvalId, updateData);

        // Step 3: Send a success response with the updated approval record
        res.status(200).json({
            message: 'Approval record updated successfully.',
            approval: updatedApproval,
        });

        // Supporting Requirement ID: TR-F004.3 - Provide in-app notifications for pending approvals
        // Send notification about the approval update
        await sendApprovalNotification(updatedApproval);
    } catch (error) {
        // Step 4: Handle any errors by sending an appropriate error response
        next(error);
    }
};

/**
 * Handles the retrieval of approval records by processing incoming HTTP GET requests.
 * This function is part of the Approval Workflow (Technical Specification/13.4 Approval Workflow) and addresses:
 * - Requirement ID: TR-F004.1 - Configure multi-level approval workflows
 *
 * Steps:
 * 1. Extract approval ID from the request parameters.
 * 2. Call the getApproval service function with the extracted ID.
 * 3. Send a success response with the retrieved approval record.
 * 4. Handle any errors by sending an appropriate error response.
 *
 * @param req - The HTTP request object
 * @param res - The HTTP response object
 * @param next - The next middleware function
 */
export const getApprovalHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Step 1: Extract approval ID from the request parameters
        const approvalId = req.params.id;

        // Step 2: Call the getApproval service function with the extracted ID
        const approval = await getApproval(approvalId);

        // Step 3: Send a success response with the retrieved approval record
        res.status(200).json({
            approval,
        });
    } catch (error) {
        // Step 4: Handle any errors by sending an appropriate error response
        next(error);
    }
};