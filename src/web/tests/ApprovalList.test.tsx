// src/web/tests/ApprovalList.test.tsx

// External dependencies
import React from 'react'; // react@17.0.2
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; // react-testing-library@11.2.6
import '@testing-library/jest-dom/extend-expect';
import jest from 'jest'; // jest@26.6.3

// Internal dependencies
import ApprovalList from '../src/components/ApprovalList'; // To test the rendering and functionality of the ApprovalList component.
import { fetchData, postData } from '../src/utils/api'; // To mock API calls for fetching approval data and sending approval or rejection actions.
import { useAuthContext } from '../src/utils/contexts'; // To mock authentication context for testing user permissions.
import { API_BASE_URL } from '../src/utils/constants'; // To use in constructing mock API endpoints.
import { TOKEN_KEY } from '../src/utils/auth'; // To mock authentication token management.

// Mocking internal modules
jest.mock('../src/utils/api');
jest.mock('../src/utils/contexts');

describe('ApprovalList Component Tests', () => {
  // Tests that the ApprovalList component renders correctly with a list of pending approvals.
  // Requirements Addressed:
  // - Approval Workflow (Technical Specification/13.4 Approval Workflow)
  test('testApprovalListRendering', async () => {
    // Mock the fetchData function to return a list of pending approvals.
    const mockApprovals = [
      {
        id: 1,
        employeeName: 'Alice Johnson',
        amount: 250.0,
        submissionDate: '2023-10-05',
      },
      {
        id: 2,
        employeeName: 'Bob Smith',
        amount: 150.0,
        submissionDate: '2023-10-06',
      },
    ];
    fetchData.mockResolvedValueOnce(mockApprovals);

    // Render the ApprovalList component using react-testing-library.
    render(<ApprovalList />);

    // Assert that the component displays the correct number of approval items.
    await waitFor(() => {
      // Verify that fetchData was called correctly.
      expect(fetchData).toHaveBeenCalledWith(
        `${API_BASE_URL}/approvals`,
        TOKEN_KEY
      );

      // Check if the approval items are displayed.
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();

      // Check the number of approval items rendered.
      const approvalItems = screen.getAllByTestId('approval-item');
      expect(approvalItems.length).toBe(2);
    });
  });

  // Tests that the ApprovalList component correctly handles approval actions.
  // Requirements Addressed:
  // - Approval Workflow (Technical Specification/13.4 Approval Workflow)
  test('testApprovalAction', async () => {
    // Mock the postData function to simulate a successful approval action.
    postData.mockResolvedValueOnce({ success: true });

    // Mock the fetchData function to return an approval item.
    const mockApprovals = [
      {
        id: 3,
        employeeName: 'Charlie Davis',
        amount: 300.0,
        submissionDate: '2023-10-07',
      },
    ];
    fetchData.mockResolvedValueOnce(mockApprovals);

    // Render the ApprovalList component.
    render(<ApprovalList />);

    // Simulate a user clicking the approve button.
    const approveButton = await screen.findByTestId('approve-button-3');
    fireEvent.click(approveButton);

    // Assert that the postData function is called with the correct parameters.
    expect(postData).toHaveBeenCalledWith(
      `${API_BASE_URL}/approvals/3/approve`,
      {},
      TOKEN_KEY
    );

    // Mock the fetchData function to return an empty list after approval.
    fetchData.mockResolvedValueOnce([]);

    // Assert that the approval item is removed from the list after approval.
    await waitFor(() => {
      const approvalItems = screen.queryAllByTestId('approval-item');
      expect(approvalItems.length).toBe(0);
    });
  });
});