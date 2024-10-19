// Import express and create a new router instance (express version ^4.17.1)
import express from 'express'; // Provides the framework for building HTTP servers and APIs.
const router = express.Router();

// Import the expenseController to handle route logic.
import expenseController from '../controllers/expenseController'; // Handles the business logic for expense operations.

// Import the authenticate middleware to secure routes.
import authenticate from '../middlewares/authMiddleware'; // Authenticates requests to ensure secure access.

/**
 * @route   POST /expenses
 * @desc    Create a new expense.
 * @access  Protected
 * 
 * This route enables employees to capture and submit travel expenses through the web interface,
 * addressing the requirements:
 * - "Expense Submission" (Technical Specification/13.2 Expense Submission)
 *   - TR-F002.2 Utilize OCR technology for automatic receipt scanning and data extraction.
 *   - TR-F002.3 Support multiple currencies with real-time conversion.
 *   - TR-F002.4 Allow attachment of digital receipts or photos of physical receipts.
 *   - TR-F002.5 Categorize expenses (e.g., meals, transportation, lodging).
 * 
 * Middleware:
 * - authenticate: Ensures that only authenticated users can access this route.
 * 
 * Controller:
 * - expenseController.createExpense: Handles the creation of a new expense record.
 */
router.post('/expenses', authenticate, expenseController.createExpense);

/**
 * @route   PUT /expenses/:id
 * @desc    Update an existing expense.
 * @access  Protected
 * 
 * This route allows employees to edit submitted expenses, enabling corrections or updates,
 * supporting the requirements:
 * - "Expense Submission" (Technical Specification/13.2 Expense Submission)
 *   - TR-F002.5 Categorize expenses (e.g., meals, transportation, lodging).
 *   - TR-F002.6 Support recurring expenses.
 * 
 * Middleware:
 * - authenticate: Ensures that only authenticated users can access this route.
 * 
 * Controller:
 * - expenseController.updateExpense: Handles updating the expense with the specified ID.
 */
router.put('/expenses/:id', authenticate, expenseController.updateExpense);

/**
 * @route   POST /expenses/submit
 * @desc    Submit expenses for approval.
 * @access  Protected
 * 
 * This route allows employees to submit their saved expenses for approval,
 * addressing the requirements:
 * - "Expense Submission" (Technical Specification/13.2 Expense Submission)
 *   - TR-F002.1 Provide a mobile app for easy expense capture on-the-go.
 *   - TR-F002.8 Provide an offline mode for expense entry when internet connection is unavailable.
 * 
 * Middleware:
 * - authenticate: Ensures that only authenticated users can access this route.
 * 
 * Controller:
 * - expenseController.submitExpense: Handles submitting expenses to the approval workflow.
 */
router.post('/expenses/submit', authenticate, expenseController.submitExpense);

// Export the configured router for use in the application.
export default router;