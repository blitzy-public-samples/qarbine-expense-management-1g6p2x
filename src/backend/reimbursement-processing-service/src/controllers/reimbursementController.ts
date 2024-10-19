// Importing required interfaces from Express.js (version 4.17.1)
import { Request, Response, NextFunction } from 'express';

// Importing internal dependencies
import { Reimbursement } from '../models/reimbursementModel'; // To access and manipulate reimbursement data.
import { processPayment } from '../utils/paymentProcessor'; // To handle financial transactions for reimbursements.
import { initiateReimbursement } from '../services/reimbursementService'; // To initiate the reimbursement process for a given reimbursement record.

// Importing authentication and authorization middlewares
import { authenticate, authorize } from '../middlewares/authMiddleware'; // To authenticate requests using JWTs and authorize based on user roles.

/**
 * Controller for handling reimbursement-related HTTP requests.
 * 
 * Requirements Addressed:
 * - Reimbursement Processing (Technical Specification/13.5 Reimbursement Processing): Automate the reimbursement process for approved expenses, integrating seamlessly with payroll systems and supporting multiple payment methods.
 */

/**
 * Handles the creation of new reimbursement requests, validating input data and storing it in the database.
 * 
 * @param req - Express Request object containing the reimbursement details.
 * @param res - Express Response object used to send responses to the client.
 * @param next - Express NextFunction callback for passing control to the next middleware.
 */
export const createReimbursement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Step 1: Authenticate the request using the authenticate middleware.
    // (Note: Authentication middleware should be applied at the route level.)

    try {
        // Step 2: Extract reimbursement details from the request body.
        const reimbursementData = req.body;

        // Step 3: Validate the reimbursement data using the Reimbursement model's validate function.
        const reimbursement = new Reimbursement(reimbursementData);
        const validationError = reimbursement.validateSync();

        if (validationError) {
            // Step 6: If validation fails, send an error response indicating the validation issues.
            res.status(400).json({
                message: 'Validation error',
                errors: validationError.errors,
            });
            return;
        }

        // Step 4: If validation passes, save the reimbursement record to the database.
        const savedReimbursement = await reimbursement.save();

        // Step 5: Send a success response to the client with the created reimbursement details.
        res.status(201).json({
            message: 'Reimbursement request created successfully.',
            data: savedReimbursement,
        });
    } catch (error) {
        // Handling unexpected errors.
        next(error);
    }
};

/**
 * Processes existing reimbursement requests by executing financial transactions and updating their status.
 * 
 * @param req - Express Request object containing the reimbursement ID.
 * @param res - Express Response object used to send responses to the client.
 * @param next - Express NextFunction callback for passing control to the next middleware.
 */
export const processReimbursement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Step 1: Authenticate the request using the authenticate middleware.
    // Step 2: Authorize the request to ensure the user has the necessary permissions.
    // (Note: Authentication and authorization middlewares should be applied at the route level.)

    try {
        // Step 3: Retrieve the reimbursement record from the database using the provided ID.
        const reimbursementId = req.params.id;
        const reimbursement = await Reimbursement.findById(reimbursementId);

        if (!reimbursement) {
            res.status(404).json({
                message: 'Reimbursement not found.',
            });
            return;
        }

        // Step 4: Initiate the reimbursement process using the initiateReimbursement service function.
        const paymentResult = await initiateReimbursement(reimbursement);

        if (paymentResult.success) {
            // Step 5: If the process is successful, update the reimbursement status to 'Processed'.
            reimbursement.status = 'Processed';
            await reimbursement.save();

            // Step 6: Send a success response to the client with the updated reimbursement details.
            res.status(200).json({
                message: 'Reimbursement processed successfully.',
                data: reimbursement,
            });
        } else {
            // Step 7: If the process fails, send an error response indicating the failure reason.
            res.status(500).json({
                message: 'Failed to process reimbursement.',
                error: paymentResult.error,
            });
        }
    } catch (error) {
        // Handling unexpected errors.
        next(error);
    }
};