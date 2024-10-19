// ExpenseForm.test.tsx

// External Dependencies
import React from 'react'; // React version 17.0.2 - To utilize React's testing utilities for component rendering and state management.
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; // @testing-library/react version 11.2.6 - To render components and simulate user interactions in tests.
import '@testing-library/jest-dom/extend-expect'; // jest-dom for extended assertions.
import '@testing-library/jest-dom'; // jest-dom for extended assertions.
// Internal Dependencies
import ExpenseForm from '../src/components/ExpenseForm'; // To test the rendering and functionality of the ExpenseForm component.
import { postData } from '../src/utils/api'; // To mock API POST requests during testing.
import { TOKEN_KEY } from '../src/utils/auth'; // To simulate authentication token management in tests.
import { useAuthContext } from '../src/utils/contexts'; // To mock authentication context during testing.
import { API_BASE_URL } from '../src/utils/constants'; // To ensure API requests are correctly formed in tests.

// Mock Implementations
jest.mock('../src/utils/api'); // Mocking postData function.
jest.mock('../src/utils/contexts'); // Mocking useAuthContext.

// Addressed Requirements:
// - Expense Submission (Technical Specification/13.2 Expense Submission)
//   - Enable employees to efficiently capture and submit travel expenses through user-friendly mobile and web interfaces.

// Test suite for ExpenseForm component
describe('ExpenseForm Component Tests', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  /**
   * Test: testExpenseFormRendering
   * Description: Tests that the ExpenseForm component renders correctly with all necessary fields and buttons.
   * Requirements Addressed:
   * - Expense Submission (Technical Specification/13.2 Expense Submission)
   *   - TR-F002.1: Provide a mobile app for easy expense capture on-the-go.
   *   - TR-F002.5: Categorize expenses (e.g., meals, transportation, lodging).
   */
  test('renders ExpenseForm with all necessary fields and buttons', () => {
    // Render the ExpenseForm component using react-testing-library.
    render(<ExpenseForm />);

    // Check that all form fields (amount, category, receipt upload) are present.
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Receipt Upload/i)).toBeInTheDocument();

    // Verify that the submit button is rendered.
    expect(screen.getByRole('button', { name: /Submit Expense/i })).toBeInTheDocument();
  });

  /**
   * Test: testFormSubmission
   * Description: Tests the form submission process, including validation and API request handling.
   * Requirements Addressed:
   * - Expense Submission (Technical Specification/13.2 Expense Submission)
   *   - TR-F002.2: Utilize OCR technology for automatic receipt scanning and data extraction.
   *   - TR-F002.3: Support multiple currencies with real-time conversion.
   *   - TR-F002.4: Allow attachment of digital receipts or photos of physical receipts.
   */
  test('handles form submission with valid data', async () => {
    // Mock the postData function to simulate API responses.
    (postData as jest.Mock).mockResolvedValue({ success: true });

    // Render the ExpenseForm component.
    render(<ExpenseForm />);

    // Fill out the form fields with valid data.
    fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'Meals' } });
    const file = new File(['dummy content'], 'receipt.jpg', { type: 'image/jpeg' });
    fireEvent.change(screen.getByLabelText(/Receipt Upload/i), { target: { files: [file] } });

    // Submit the form.
    fireEvent.click(screen.getByRole('button', { name: /Submit Expense/i }));

    // Verify that postData is called with the correct parameters.
    await waitFor(() => {
      expect(postData).toHaveBeenCalledWith(`${API_BASE_URL}/expenses`, expect.any(FormData));
    });

    // Check that the form resets after successful submission.
    expect(screen.getByLabelText(/Amount/i)).toHaveValue('');
    expect(screen.getByLabelText(/Category/i)).toHaveValue('');
    expect(screen.getByLabelText(/Receipt Upload/i)).toHaveValue('');
  });

  /**
   * Test: testValidationErrors
   * Description: Tests that validation errors are displayed when form inputs are invalid.
   * Requirements Addressed:
   * - Expense Submission (Technical Specification/13.2 Expense Submission)
   *   - TR-F002.5: Categorize expenses (e.g., meals, transportation, lodging).
   *   - TR-F002.6: Support recurring expenses.
   *   - TR-F002.7: Implement mileage tracking with GPS integration.
   */
  test('displays validation errors with invalid inputs', async () => {
    // Render the ExpenseForm component.
    render(<ExpenseForm />);

    // Attempt to submit the form with invalid data (e.g., empty fields).
    fireEvent.click(screen.getByRole('button', { name: /Submit Expense/i }));

    // Verify that validation error messages are displayed for each invalid input.
    expect(await screen.findByText(/Amount is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Category is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Receipt is required/i)).toBeInTheDocument();
  });
});