// expenseController.ts
// Controller for handling HTTP requests related to expense operations within the expense management service.
// It manages the creation, updating, validation, and submission of expenses, ensuring compliance with company policies and international tax laws.

// Requirements addressed:
// - Expense Submission (Technical Specification/13.2 Expense Submission)
//   Description: Enable employees to efficiently capture and submit travel expenses through user-friendly mobile and web interfaces, incorporating automated data extraction and currency support.
// - Policy and Compliance Engine (Technical Specification/13.3 Policy and Compliance Engine)
//   Description: Ensure all expense submissions adhere to company policies and international tax laws through configurable rules and real-time validation.

// Importing necessary modules and types.

// Internal dependencies:
import { Expense } from '../models/expenseModel';
import { Receipt } from '../models/receiptModel';
import { convertCurrency } from '../utils/currencyConverter';
import { validateExpense } from '../utils/policyValidator';
import {
  createExpense as createExpenseService,
  updateExpense as updateExpenseService,
  validateAndSubmitExpense,
} from '../services/expenseService';
// import { processReceipt } from '../services/receiptService'; // Not used in this controller

// Middleware for authentication and error handling:
import { authenticate } from '../middlewares/authMiddleware';
import { errorHandler } from '../middlewares/errorMiddleware';

// External dependencies:
import { Request, Response, NextFunction } from 'express';
// express version ^4.17.1
// To create and manage HTTP request handlers for expense operations.

/**
 * Handles the creation of a new expense entry by validating input data and saving it to the database.
 *
 * Requirements addressed:
 * - Expense Submission (Technical Specification/13.2 Expense Submission)
 *   - TR-F002.2: Utilize OCR technology for automatic receipt scanning and data extraction.
 *   - TR-F002.3: Support multiple currencies with real-time conversion.
 * - Policy and Compliance Engine (Technical Specification/13.3 Policy and Compliance Engine)
 *   - TR-F003.2: Perform real-time policy checks during expense submission.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const createExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Step 1: Authenticate the request using the authenticate middleware.
    // Note: Authentication is assumed to be handled by the middleware applied at the route level.

    // Step 2: Extract expense data from the request body.
    const expenseData = req.body;

    // Step 3: Validate the expense data against company policies using validateExpense.
    // Ensures compliance with company policies and international tax laws (TR-F003.2).
    const validationResult = await validateExpense(expenseData);
    if (!validationResult.isValid) {
      // If validation fails, respond with an error message.
      return res.status(400).json({
        message: 'Expense data is invalid according to company policies.',
        errors: validationResult.errors,
      });
    }

    // Step 4: Convert the expense amount to the base currency using convertCurrency.
    // Supports multiple currencies with real-time conversion (TR-F002.3).
    const amountInBaseCurrency = await convertCurrency(
      expenseData.amount,
      expenseData.currency,
      'USD' // Assuming 'USD' is the base currency.
    );
    // Update the expense data with the converted amount.
    expenseData.amountInBaseCurrency = amountInBaseCurrency;

    // Step 5: Call createExpense service to save the expense to the database.
    // This utilizes the Expense model to interact with the database.
    const newExpense = await createExpenseService(expenseData);

    // Step 6: Send a response with the created expense object.
    res.status(201).json(newExpense);
  } catch (error) {
    // Step 7: Handle any errors using the errorHandler middleware.
    next(error);
  }
};

/**
 * Handles the updating of an existing expense entry by validating new data and updating the database record.
 *
 * Requirements addressed:
 * - Expense Submission (Technical Specification/13.2 Expense Submission)
 *   - TR-F002.2: Utilize OCR technology for automatic receipt scanning and data extraction.
 *   - TR-F002.3: Support multiple currencies with real-time conversion.
 * - Policy and Compliance Engine (Technical Specification/13.3 Policy and Compliance Engine)
 *   - TR-F003.2: Perform real-time policy checks during expense submission.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Step 1: Authenticate the request using the authenticate middleware.
    // Note: Authentication is assumed to be handled by the middleware applied at the route level.

    // Step 2: Extract expense ID and update data from the request.
    const expenseId = req.params.id;
    const updateData = req.body;

    // Step 3: Validate the update data against company policies using validateExpense.
    const validationResult = await validateExpense(updateData);
    if (!validationResult.isValid) {
      // If validation fails, respond with an error message.
      return res.status(400).json({
        message: 'Updated expense data is invalid according to company policies.',
        errors: validationResult.errors,
      });
    }

    // Step 4: Convert the updated expense amount to the base currency using convertCurrency.
    const amountInBaseCurrency = await convertCurrency(
      updateData.amount,
      updateData.currency,
      'USD' // Assuming 'USD' is the base currency.
    );
    // Update the expense data with the converted amount.
    updateData.amountInBaseCurrency = amountInBaseCurrency;

    // Step 5: Call updateExpense service to update the expense in the database.
    const updatedExpense = await updateExpenseService(expenseId, updateData);

    // Step 6: Send a response with the updated expense object.
    res.status(200).json(updatedExpense);
  } catch (error) {
    // Step 7: Handle any errors using the errorHandler middleware.
    next(error);
  }
};

/**
 * Validates and submits an expense for approval if it passes all checks.
 *
 * Requirements addressed:
 * - Expense Submission (Technical Specification/13.2 Expense Submission)
 * - Policy and Compliance Engine (Technical Specification/13.3 Policy and Compliance Engine)
 *   - TR-F003.2: Perform real-time policy checks during expense submission.
 *   - TR-F003.5: Flag expenses that exceed policy limits or require additional approval.
 *
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction for error handling.
 */
export const submitExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Step 1: Authenticate the request using the authenticate middleware.
    // Note: Authentication is assumed to be handled by the middleware applied at the route level.

    // Step 2: Extract expense data from the request body.
    const expenseData = req.body;

    // Step 3: Validate the expense data using validateExpense.
    const validationResult = await validateExpense(expenseData);
    if (!validationResult.isValid) {
      // If validation fails, respond with an error message.
      return res.status(400).json({
        message: 'Expense data is invalid according to company policies.',
        errors: validationResult.errors,
      });
    }

    // Step 4: If validation passes, call validateAndSubmitExpense service to submit the expense for approval.
    // This may involve additional checks and forwarding the expense to the approval workflow.
    const submissionResult = await validateAndSubmitExpense(expenseData);

    // Step 5: Send a response indicating the submission status.
    res.status(200).json({
      message: 'Expense submitted for approval successfully.',
      result: submissionResult,
    });
  } catch (error) {
    // Step 6: Handle any errors using the errorHandler middleware.
    next(error);
  }
};