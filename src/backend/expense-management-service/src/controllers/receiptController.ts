// External dependencies
import express, { Request, Response, NextFunction } from 'express'; // express version ^4.17.1
// 'express' is used to create and manage HTTP request handlers for receipt operations.

// Internal dependencies
import { Receipt } from '../models/receiptModel'; // Represents and manages receipt data associated with expenses.
// Location: src/backend/expense-management-service/src/models/receiptModel.ts

import { processReceipt } from '../services/receiptService'; // Handles processing of receipts, including OCR scanning and validation.
// Location: src/backend/expense-management-service/src/services/receiptService.ts

import { authenticate } from '../middlewares/authMiddleware'; // Authenticates requests before processing receipts.
// Location: src/backend/expense-management-service/src/middlewares/authMiddleware.ts

// Create an instance of express Router to define routes for receipt-related operations
const router = express.Router();

/**
 * @route       POST /receipts/upload
 * @description Handles the uploading and processing of receipt images.
 *              Utilizes the receipt service to perform OCR and validate receipt data.
 *
 * @requirements_addressed
 * - Expense Submission (Technical Specification/13.2 Expense Submission)
 *   - TR-F002.1: Provide a mobile app for easy expense capture on-the-go.
 *   - TR-F002.2: Utilize OCR technology for automatic receipt scanning and data extraction.
 *   - TR-F002.4: Allow attachment of digital receipts or photos of physical receipts.
 *
 * @param       {Request} req - Express Request object containing the uploaded receipt image.
 * @param       {Response} res - Express Response object used to send back the response to the client.
 * @param       {NextFunction} next - NextFunction callback used for error handling.
 *
 * @returns     {void} Sends a response back to the client with the result of the receipt processing.
 */
router.post('/upload', authenticate, uploadReceipt);

async function uploadReceipt(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        // Step 1: Extract the receipt image from the request.
        // Assumes 'multer' middleware is used for handling file uploads (multipart/form-data).
        const receiptImage = req.file;

        // Validate that a file was uploaded.
        if (!receiptImage) {
            // Requirement Addressed:
            // - TR-F002.8: Provide an offline mode for expense entry when internet connection is unavailable.
            //   - Here, we ensure users are informed if no receipt image is uploaded, enhancing user experience.
            res.status(400).json({ error: 'No receipt image uploaded.' });
            return;
        }

        // Step 2: Call the processReceipt function from the receipt service to handle OCR and validation.
        // This function processes the image, performs OCR to extract data, and validates it against company policies.
        const processedData = await processReceipt(receiptImage);

        // Step 3: If processing is successful, send a success response with the processed data.
        // Requirement Addressed:
        // - TR-F002.3: Support multiple currencies with real-time conversion.
        // - TR-F002.5: Categorize expenses (e.g., meals, transportation, lodging).
        res.status(200).json({
            message: 'Receipt processed successfully.',
            data: processedData,
        });
    } catch (error) {
        // Step 4: If processing fails, handle the error and send an appropriate error response.
        // Requirement Addressed:
        // - Provide meaningful error messages to assist users in correcting issues.
        next(error);
    }
}

// Export the router to be used in the main app.
export default router;