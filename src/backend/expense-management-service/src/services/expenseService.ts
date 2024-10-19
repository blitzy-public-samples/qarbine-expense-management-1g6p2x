// Import necessary modules and dependencies.

// External dependencies.
// mongoose version 5.13.8 is used for interacting with MongoDB.
import mongoose from 'mongoose'; // v5.13.8
import axios from 'axios'; // ^0.21.1 is used for making HTTP requests to external services if needed.

// Internal dependencies.
// Expense model defines and manipulates expense data structures.
import { Expense } from '../models/expenseModel';
// Receipt model handles receipt data associated with expenses.
import { Receipt } from '../models/receiptModel';
// convertCurrency utility converts currency amounts for expenses.
import { convertCurrency } from '../utils/currencyConverter';
// validateExpense utility validates expenses against company policies.
import { validateExpense } from '../utils/policyValidator';
// authenticate middleware authenticates requests before processing expenses.
import { authenticate } from '../middlewares/authMiddleware';
// errorHandler middleware handles errors during expense processing.
import { errorHandler } from '../middlewares/errorMiddleware';

// Service Description:
// Service for managing expense operations within the expense management service.
// This includes functionalities for creating, updating, and validating expenses,
// as well as ensuring compliance with company policies and international tax laws.

// Define interfaces for expense data if not already defined.
interface ExpenseData {
    amount: number;
    currency: string;
    category: string;
    description?: string;
    date: Date;
    receipt?: string; // URL or path to the receipt image.
    [key: string]: any; // Allows additional properties.
}

/**
 * Creates a new expense entry in the database after validating the input data.
 *
 * **Requirements Addressed:**
 * - **Expense Submission**
 *   - *Location:* Technical Specification/13.2 Expense Submission
 *   - *Description:* Enable employees to efficiently capture and submit travel expenses through user-friendly mobile and web interfaces, incorporating automated data extraction and currency support.
 * - **Policy and Compliance Engine**
 *   - *Location:* Technical Specification/13.3 Policy and Compliance Engine
 *   - *Description:* Ensure all expense submissions adhere to company policies and international tax laws through configurable rules and real-time validation.
 *
 * @param {ExpenseData} expenseData - The expense data submitted by the user.
 * @returns {Promise<Expense>} - The created expense object.
 */
export async function createExpense(expenseData: ExpenseData): Promise<Expense> {
    try {
        // Step 1: Authenticate the request using the authenticate middleware.
        // Note: Authentication is typically handled in the middleware layer before reaching this service.

        // Step 2: Validate the expense data against company policies using validateExpense.
        // This ensures compliance with company policies and international tax laws.
        const isValid = await validateExpense(expenseData);
        if (!isValid) {
            throw new Error('Expense data does not comply with company policies and international tax laws.');
        }

        // Step 3: Convert the expense amount to the base currency using convertCurrency.
        // Supports multiple currencies with real-time conversion.
        const baseCurrency = 'USD'; // Assuming USD as the base currency.
        expenseData.amountInBaseCurrency = await convertCurrency(expenseData.amount, expenseData.currency, baseCurrency);
        expenseData.baseCurrency = baseCurrency;

        // Step 4: Create a new Expense instance with the validated data.
        const newExpense = new Expense(expenseData);

        // Step 5: Save the expense to the database using mongoose.
        const savedExpense = await newExpense.save();

        // Step 6: Return the created expense object.
        return savedExpense;
    } catch (error) {
        // Handle errors during expense creation using the errorHandler.
        errorHandler(error);
        throw error;
    }
}

/**
 * Updates an existing expense entry in the database with new data.
 *
 * **Requirements Addressed:**
 * - **Expense Submission**
 *   - *Location:* Technical Specification/13.2 Expense Submission
 * - **Policy and Compliance Engine**
 *   - *Location:* Technical Specification/13.3 Policy and Compliance Engine
 * 
 * @param {string} expenseId - The ID of the expense to update.
 * @param {Partial<ExpenseData>} updateData - The new data to update the expense with.
 * @returns {Promise<Expense>} - The updated expense object.
 */
export async function updateExpense(expenseId: string, updateData: Partial<ExpenseData>): Promise<Expense> {
    try {
        // Step 1: Authenticate the request using the authenticate middleware.
        // Authentication is handled in the middleware layer.

        // Step 2: Find the existing expense by ID using mongoose.
        const expense = await Expense.findById(expenseId);
        if (!expense) {
            throw new Error('Expense not found.');
        }

        // Step 3: Validate the update data against company policies using validateExpense.
        const isValid = await validateExpense(updateData);
        if (!isValid) {
            throw new Error('Updated expense data does not comply with company policies and international tax laws.');
        }

        // Step 4: Convert the updated expense amount to the base currency using convertCurrency.
        if (updateData.amount !== undefined && updateData.currency) {
            updateData.amountInBaseCurrency = await convertCurrency(updateData.amount, updateData.currency, expense.baseCurrency || 'USD');
        }

        // Step 5: Update the expense fields with the new data.
        Object.assign(expense, updateData);

        // Step 6: Save the updated expense to the database.
        const updatedExpense = await expense.save();

        // Step 7: Return the updated expense object.
        return updatedExpense;
    } catch (error) {
        // Handle errors during expense update using the errorHandler.
        errorHandler(error);
        throw error;
    }
}

/**
 * Validates an expense and submits it for approval if it passes all checks.
 *
 * **Requirements Addressed:**
 * - **Expense Submission**
 *   - *Location:* Technical Specification/13.2 Expense Submission
 * - **Policy and Compliance Engine**
 *   - *Location:* Technical Specification/13.3 Policy and Compliance Engine
 * 
 * @param {ExpenseData} expenseData - The expense data to be validated and submitted.
 * @returns {Promise<boolean>} - True if the expense is valid and submitted, false otherwise.
 */
export async function validateAndSubmitExpense(expenseData: ExpenseData): Promise<boolean> {
    try {
        // Step 1: Authenticate the request using the authenticate middleware.
        // Authentication is handled in the middleware layer.

        // Step 2: Validate the expense data using validateExpense.
        const isValid = await validateExpense(expenseData);
        if (!isValid) {
            // If validation fails, return false.
            return false;
        }

        // Step 3: If validation passes, submit the expense for approval.
        // Set the status to 'Pending Approval'.
        expenseData.status = 'Pending Approval';

        // Convert the amount to the base currency.
        const baseCurrency = 'USD'; // Base currency is USD.
        expenseData.amountInBaseCurrency = await convertCurrency(expenseData.amount, expenseData.currency, baseCurrency);
        expenseData.baseCurrency = baseCurrency;

        // Create a new Expense instance.
        const newExpense = new Expense(expenseData);

        // Save the expense to the database.
        await newExpense.save();

        // TODO: Implement submission to approval workflow service if needed.

        // Step 4: Return true if the expense is successfully submitted.
        return true;
    } catch (error) {
        // Handle errors during expense validation and submission.
        errorHandler(error);
        return false;
    }
}