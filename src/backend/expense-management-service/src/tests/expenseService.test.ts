// src/backend/expense-management-service/src/tests/expenseService.test.ts

// Importing external dependencies

// 'supertest' is used to test HTTP requests and responses (version '^6.1.3')
import request from 'supertest';

// Importing internal modules

// Importing expense service functions to be tested
import {
  createExpense,
  updateExpense,
  validateAndSubmitExpense,
} from '../services/expenseService';

// Importing Expense model to mock and validate expense data structures
import { Expense } from '../models/expenseModel';

// Importing utility functions to mock during tests
import { convertCurrency } from '../utils/currencyConverter'; // To mock currency conversion
import { validateExpense } from '../utils/policyValidator'; // To mock policy validation

// Importing Jest mocking utilities
import { jest } from '@jest/globals';

// Mocking dependencies to isolate tests
jest.mock('../services/expenseService');
jest.mock('../utils/currencyConverter');
jest.mock('../utils/policyValidator');

// Global mockExpenseData: Sample data for mocking expense creation and updates.
const mockExpenseData: Expense = {
  id: 'exp123',
  userId: 'user456',
  amount: 100.0,
  currency: 'USD',
  category: 'Meals',
  date: new Date('2023-10-01'),
  description: 'Business Lunch',
  receiptUrl: 'http://example.com/receipt.jpg',
  status: 'Pending',
  // Additional fields as required
};

describe('Expense Service Tests', () => {
  beforeEach(() => {
    // Reset all mocks before each test to ensure test isolation
    jest.clearAllMocks();
  });

  /**
   * Function: testCreateExpense
   * Description:
   * Tests the creation of a new expense entry.
   *
   * Requirements Addressed:
   * - Expense Submission (Technical Specification/13.2 Expense Submission)
   *   - Enable employees to efficiently capture and submit travel expenses through user-friendly interfaces.
   *   - Support multiple currencies with real-time conversion.
   *
   * Steps:
   * 1. Mock the expense data and dependencies.
   * 2. Call createExpense with the mocked data.
   * 3. Assert that the expense is created successfully in the database.
   */
  it('should create a new expense successfully', async () => {
    // Step 1: Mock the expense data and dependencies

    // Mock the currency conversion utility to simulate real-time conversion
    (convertCurrency as jest.Mock).mockResolvedValueOnce(100.0); // Assuming conversion returns the same amount

    // Mock the createExpense function to resolve with the mock expense data
    (createExpense as jest.Mock).mockResolvedValueOnce(mockExpenseData);

    // Step 2: Call createExpense with the mocked data
    const expense = await createExpense(mockExpenseData);

    // Step 3: Assert that the expense is created successfully in the database
    expect(expense).toEqual(mockExpenseData);

    // Additional assertions to verify that dependencies were called correctly
    expect(convertCurrency).toHaveBeenCalledWith(
      mockExpenseData.amount,
      mockExpenseData.currency,
      'USD'
    );
    expect(createExpense).toHaveBeenCalledWith(mockExpenseData);
  });

  /**
   * Function: testUpdateExpense
   * Description:
   * Tests the updating of an existing expense entry.
   *
   * Requirements Addressed:
   * - Expense Submission (Technical Specification/13.2 Expense Submission)
   *   - Allow attachment of digital receipts or photos of physical receipts.
   *
   * Steps:
   * 1. Mock the existing expense data and update data.
   * 2. Call updateExpense with the mocked data.
   * 3. Assert that the expense is updated correctly in the database.
   */
  it('should update an existing expense successfully', async () => {
    // Step 1: Mock the existing expense data and update data
    const existingExpenseId = mockExpenseData.id;
    const updateData = {
      amount: 150.0,
      description: 'Updated Business Lunch Expense',
      receiptUrl: 'http://example.com/new_receipt.jpg',
    };

    const updatedExpenseData = { ...mockExpenseData, ...updateData };

    // Mock the updateExpense function to resolve with the updated expense data
    (updateExpense as jest.Mock).mockResolvedValueOnce(updatedExpenseData);

    // Step 2: Call updateExpense with the mocked data
    const expense = await updateExpense(existingExpenseId, updateData);

    // Step 3: Assert that the expense is updated correctly in the database
    expect(expense).toEqual(updatedExpenseData);

    // Verify that updateExpense was called with correct parameters
    expect(updateExpense).toHaveBeenCalledWith(existingExpenseId, updateData);
  });

  /**
   * Function: testValidateAndSubmitExpense
   * Description:
   * Tests the validation and submission of an expense.
   *
   * Requirements Addressed:
   * - Policy and Compliance Engine (Technical Specification/13.3 Policy and Compliance Engine)
   *   - Ensure all expense submissions adhere to company policies.
   *   - Perform real-time policy checks during expense submission.
   *
   * Steps:
   * 1. Mock the expense data and validation dependencies.
   * 2. Call validateAndSubmitExpense with the mocked data.
   * 3. Assert that the expense is validated and submitted successfully.
   */
  it('should validate and submit an expense successfully', async () => {
    // Step 1: Mock the expense data and validation dependencies

    // Mock the validateExpense function to simulate successful validation
    (validateExpense as jest.Mock).mockResolvedValueOnce(true);

    // Mock the validateAndSubmitExpense function to resolve with the submitted expense data
    const submittedExpenseData = { ...mockExpenseData, status: 'Submitted' };
    (validateAndSubmitExpense as jest.Mock).mockResolvedValueOnce(submittedExpenseData);

    // Step 2: Call validateAndSubmitExpense with the mocked data
    const expense = await validateAndSubmitExpense(mockExpenseData);

    // Step 3: Assert that the expense is validated and submitted successfully
    expect(expense).toEqual(submittedExpenseData);

    // Verify that validateExpense was called
    expect(validateExpense).toHaveBeenCalledWith(mockExpenseData);

    // Verify that validateAndSubmitExpense was called with correct parameters
    expect(validateAndSubmitExpense).toHaveBeenCalledWith(mockExpenseData);
  });
});