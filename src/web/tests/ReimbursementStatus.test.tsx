/**
 * @file ReimbursementStatus.test.tsx
 * @description This file contains unit tests for the ReimbursementStatus component,
 * ensuring that it correctly displays reimbursement statuses and handles data fetching
 * and error states appropriately.
 *
 * Requirements Addressed:
 * - **Reimbursement Processing** (Technical Specification/13.5 Reimbursement Processing)
 *   - Automate the reimbursement process for approved expenses, integrating seamlessly
 *     with payroll systems and supporting multiple payment methods.
 *
 * These tests verify that the ReimbursementStatus component functions correctly,
 * providing users with accurate and reliable information about their reimbursement statuses.
 */

import React from 'react'; // React version 17.0.2
import { render, screen, waitFor } from '@testing-library/react'; // @testing-library/react version 11.2.6
import '@testing-library/jest-dom/extend-expect'; // For extended Jest matchers
import ReimbursementStatus from '../src/components/ReimbursementStatus';
import { fetchData } from '../src/utils/api';
import { useAuthContext } from '../src/utils/contexts';

// Mock the fetchData function from api.ts
jest.mock('../src/utils/api', () => ({
  fetchData: jest.fn(),
}));

// Mock the useAuthContext hook from contexts.ts
jest.mock('../src/utils/contexts', () => ({
  useAuthContext: jest.fn(),
}));

describe('ReimbursementStatus Component', () => {
  /**
   * Test: testReimbursementStatusRendering
   * Description:
   * Tests that the ReimbursementStatus component renders correctly with mock data.
   *
   * Steps:
   * 1. Mock the fetchData function to return predefined reimbursement data.
   * 2. Render the ReimbursementStatus component using react-testing-library.
   * 3. Assert that the component displays the correct reimbursement statuses based on the mock data.
   *
   * Requirements Addressed:
   * - **Reimbursement Processing** (Technical Specification/13.5 Reimbursement Processing)
   *   - Ensures users can view the status of their reimbursements as part of automating the reimbursement process.
   */
  it('should render reimbursement statuses correctly with mock data', async () => {
    // Step 1: Mock the fetchData function to return predefined reimbursement data.
    const mockReimbursementData = [
      {
        reportId: 12345,
        status: 'Processed',
        amount: 500.0,
        paymentMethod: 'Direct Deposit',
        date: '2023-10-01',
      },
      {
        reportId: 67890,
        status: 'Pending',
        amount: 300.0,
        paymentMethod: 'Bank Transfer',
        date: '2023-10-02',
      },
    ];
    (fetchData as jest.Mock).mockResolvedValueOnce(mockReimbursementData);

    // Step 2: Mock the useAuthContext hook to provide required authentication context.
    (useAuthContext as jest.Mock).mockReturnValue({
      user: { userId: 1, name: 'John Doe' },
      isAuthenticated: true,
    });

    // Step 3: Render the ReimbursementStatus component.
    render(<ReimbursementStatus />);

    // Step 4: Assert that the component displays the correct reimbursement statuses.
    await waitFor(() => {
      // Check for the component title.
      expect(screen.getByText('Reimbursement Status')).toBeInTheDocument();

      // Verify that the reimbursement data is displayed correctly.
      mockReimbursementData.forEach((data) => {
        expect(screen.getByText(`Report ID: ${data.reportId}`)).toBeInTheDocument();
        expect(screen.getByText(`Status: ${data.status}`)).toBeInTheDocument();
        expect(screen.getByText(`Amount: $${data.amount.toFixed(2)}`)).toBeInTheDocument();
        expect(screen.getByText(`Payment Method: ${data.paymentMethod}`)).toBeInTheDocument();
        expect(screen.getByText(`Date: ${data.date}`)).toBeInTheDocument();
      });
    });
  });

  /**
   * Test: testReimbursementStatusErrorHandling
   * Description:
   * Tests that the ReimbursementStatus component handles errors during data fetching.
   *
   * Steps:
   * 1. Mock the fetchData function to throw an error.
   * 2. Render the ReimbursementStatus component using react-testing-library.
   * 3. Assert that the component displays an error message when data fetching fails.
   *
   * Requirements Addressed:
   * - **Reimbursement Processing** (Technical Specification/13.5 Reimbursement Processing)
   *   - Ensures the system gracefully handles errors, maintaining reliability in the reimbursement process.
   */
  it('should display an error message when data fetching fails', async () => {
    // Step 1: Mock the fetchData function to throw an error.
    const mockError = new Error('Failed to fetch reimbursement data');
    (fetchData as jest.Mock).mockRejectedValueOnce(mockError);

    // Step 2: Mock the useAuthContext hook to provide required authentication context.
    (useAuthContext as jest.Mock).mockReturnValue({
      user: { userId: 1, name: 'John Doe' },
      isAuthenticated: true,
    });

    // Step 3: Render the ReimbursementStatus component.
    render(<ReimbursementStatus />);

    // Step 4: Assert that the component displays an error message.
    await waitFor(() => {
      expect(screen.getByText('Reimbursement Status')).toBeInTheDocument();
      expect(
        screen.getByText('Error fetching reimbursement data. Please try again later.')
      ).toBeInTheDocument();
    });
  });
});