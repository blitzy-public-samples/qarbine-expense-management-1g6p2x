/**
 * Defines the routing for receipt-related operations in the expense management service,
 * connecting HTTP requests to the appropriate controller functions.
 * 
 * Requirements addressed:
 * - Enable employees to efficiently capture and submit travel expenses through user-friendly
 *   mobile and web interfaces, incorporating automated data extraction and currency support.
 *   (Technical Specification/13.2 Expense Submission)
 */

// Import express to create a router instance
// External dependency: express (version ^4.17.1)
import express from 'express';

// Import the receiptController to handle the business logic for receipt operations
// Internal dependency: src/backend/expense-management-service/src/controllers/receiptController.ts
import receiptController from '../controllers/receiptController';

// Import the authenticate middleware to secure routes
// Internal dependency: src/backend/expense-management-service/src/middlewares/authMiddleware.ts
import authenticate from '../middlewares/authMiddleware';

// Create a new router instance
const router = express.Router();

/**
 * @route   POST /
 * @desc    Upload a receipt
 * @access  Protected (Requires authentication)
 * 
 * This route enables authenticated employees to upload receipts,
 * facilitating the efficient capture and submission of travel expenses.
 * It addresses the requirement of providing user-friendly interfaces for expense submission,
 * incorporating automated data extraction as per
 * Technical Specification/13.2 Expense Submission.
 * 
 * Middleware 'authenticate' ensures that only authorized users can access this route,
 * aligning with the security requirements specified in Technical Specification/13.1 User Authentication and Authorization.
 * 
 * The 'receiptController.uploadReceipt' handles the business logic for processing the receipt,
 * including receipt scanning and data extraction using OCR technology.
 */
router.post(
  '/',
  authenticate,
  receiptController.uploadReceipt
);

// Export the configured router for use in the application
export default router;