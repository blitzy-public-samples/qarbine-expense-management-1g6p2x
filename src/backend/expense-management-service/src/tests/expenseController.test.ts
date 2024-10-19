/**
 * Test suite for the ExpenseController in the expense management service.
 * Ensures that all endpoints for managing expenses function correctly and adhere to business rules and policies.
 *
 * Requirements Addressed:
 * - **Expense Submission**
 *   - Location: Technical Specification/13.2 Expense Submission
 *   - Description: Enable employees to efficiently capture and submit travel expenses through user-friendly interfaces, incorporating automated data extraction and currency support.
 * - **Policy and Compliance Engine**
 *   - Location: Technical Specification/13.3 Policy and Compliance Engine
 *   - Description: Ensure all expense submissions adhere to company policies and international tax laws through configurable rules and real-time validation.
 */

// External dependencies
import request from 'supertest'; // supertest@^6.1.3 is used for testing HTTP endpoints
import { jest } from '@jest/globals'; // jest@^27.0.0 is used for running unit and integration tests

// Internal dependencies
import app from '../app'; // Express application instance
import * as expenseService from '../services/expenseService'; // Service methods for expense operations
import { authenticate } from '../middlewares/authMiddleware'; // Middleware to authenticate requests before processing expenses

// Utilities
import * as currencyConverter from '../utils/currencyConverter'; // To convert currency amounts for expenses
import * as policyValidator from '../utils/policyValidator'; // To validate expenses against company policies

// Mock data for testing
const mockExpenseData = {
  amount: 100,
  currency: 'USD',
  category: 'Meals',
  date: '2023-10-10',
  receiptImage: 'receipt.jpg',
  userId: 'user123',
};

describe('ExpenseController Tests', () => {
  // Before all tests, mock the authenticate middleware to allow requests to proceed without actual authentication
  beforeAll(() => {
    jest.spyOn(authenticate, 'authenticate').mockImplementation((req, res, next) => next());
  });

  // Clear all mocks after each test to prevent interference between tests
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test: testCreateExpense
   * Description: Tests the creation of a new expense entry through the ExpenseController.
   * Requirements Addressed:
   * - Expense Submission (Requirement IDs: TR-F002.1, TR-F002.2, TR-F002.3)
   *   - Location: Technical Specification/13.2 Expense Submission
   *   - Description: Enable employees to efficiently capture and submit travel expenses through user-friendly interfaces.
   * Steps:
   * 1. Mock the createExpense service to simulate database interaction.
   * 2. Send a POST request to the create expense endpoint with valid expense data.
   * 3. Assert that the response status is 201 (Created).
   * 4. Verify that the response body contains the created expense object.
   * 5. Ensure that the createExpense service was called with the correct parameters.
   */
  it('testCreateExpense', async () => {
    // Step 1: Mock the createExpense service method
    const createExpenseMock = jest.spyOn(expenseService, 'createExpense').mockResolvedValue({
      id: 'expense123',
      ...mockExpenseData,
    });

    // Step 2: Send a POST request to the create expense endpoint
    const response = await request(app)
      .post('/api/expenses')
      .send(mockExpenseData)
      .set('Accept', 'application/json');

    // Step 3: Assert that the response status is 201 (Created)
    expect(response.status).toBe(201);

    // Step 4: Verify that the response body contains the created expense object
    expect(response.body).toEqual({
      id: 'expense123',
      ...mockExpenseData,
    });

    // Step 5: Ensure that the createExpense service was called with the correct parameters
    expect(createExpenseMock).toHaveBeenCalledWith(mockExpenseData);
  });

  /**
   * Test: testUpdateExpense
   * Description: Tests the updating of an existing expense entry through the ExpenseController.
   * Requirements Addressed:
   * - Expense Submission (Requirement IDs: TR-F002.5)
   *   - Location: Technical Specification/13.2 Expense Submission
   *   - Description: Allow categorization of expenses.
   * Steps:
   * 1. Mock the updateExpense service to simulate database interaction.
   * 2. Send a PUT request to the update expense endpoint with valid update data.
   * 3. Assert that the response status is 200 (OK).
   * 4. Verify that the response body contains the updated expense object.
   * 5. Ensure that the updateExpense service was called with the correct parameters.
   */
  it('testUpdateExpense', async () => {
    // Mock data for updating the expense
    const updateData = {
      amount: 120,
      category: 'Transportation',
    };

    // Step 1: Mock the updateExpense service method
    const updateExpenseMock = jest.spyOn(expenseService, 'updateExpense').mockResolvedValue({
      id: 'expense123',
      ...mockExpenseData,
      ...updateData,
    });

    // Step 2: Send a PUT request to the update expense endpoint
    const response = await request(app)
      .put('/api/expenses/expense123')
      .send(updateData)
      .set('Accept', 'application/json');

    // Step 3: Assert that the response status is 200 (OK)
    expect(response.status).toBe(200);

    // Step 4: Verify that the response body contains the updated expense object
    expect(response.body).toEqual({
      id: 'expense123',
      ...mockExpenseData,
      ...updateData,
    });

    // Step 5: Ensure that the updateExpense service was called with the correct parameters
    expect(updateExpenseMock).toHaveBeenCalledWith('expense123', updateData);
  });

  /**
   * Test: testSubmitExpense
   * Description: Tests the submission of an expense for approval through the ExpenseController.
   * Requirements Addressed:
   * - Policy and Compliance Engine (Requirement IDs: TR-F003.2, TR-F003.5)
   *   - Location: Technical Specification/13.3 Policy and Compliance Engine
   *   - Description: Perform real-time policy checks during expense submission.
   * Steps:
   * 1. Mock the validateAndSubmitExpense service to simulate approval process.
   * 2. Send a POST request to the submit expense endpoint.
   * 3. Assert that the response status is 200 (OK).
   * 4. Verify that the response body indicates successful submission.
   * 5. Ensure that the validateAndSubmitExpense service was called with the correct parameters.
   */
  it('testSubmitExpense', async () => {
    // Step 1: Mock the validateAndSubmitExpense service method
    const validateAndSubmitExpenseMock = jest.spyOn(expenseService, 'validateAndSubmitExpense').mockResolvedValue({
      id: 'expense123',
      ...mockExpenseData,
      status: 'Submitted',
    });

    // Step 2: Send a POST request to the submit expense endpoint
    const response = await request(app)
      .post('/api/expenses/expense123/submit')
      .set('Accept', 'application/json');

    // Step 3: Assert that the response status is 200 (OK)
    expect(response.status).toBe(200);

    // Step 4: Verify that the response body indicates successful submission
    expect(response.body).toEqual({
      id: 'expense123',
      ...mockExpenseData,
      status: 'Submitted',
    });

    // Step 5: Ensure that the validateAndSubmitExpense service was called with the correct parameters
    expect(validateAndSubmitExpenseMock).toHaveBeenCalledWith('expense123');
  });
});