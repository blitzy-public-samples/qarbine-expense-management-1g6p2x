// Import necessary modules and components

// External Dependencies
import React, { useEffect, useState } from 'react'; // React version 17.0.2

// Internal Dependencies
import { fetchData, postData } from '../utils/api'; // Utilities for API interactions
import { useAuthContext } from '../utils/contexts'; // Context for authentication state
import { API_BASE_URL } from '../utils/constants'; // Base URL for API endpoints
import { TOKEN_KEY } from '../utils/auth'; // Key for accessing the authentication token

// Import styles specific to ApprovalList component
import '../styles/ApprovalList.css';

/**
 * ApprovalList Component
 *
 * This component is responsible for displaying a list of pending expense approvals for managers.
 * It allows managers to review, approve, or reject expense reports submitted by employees.
 *
 * Addresses Requirement:
 * - **Approval Workflow**
 *   - *Location*: Technical Specification/13.4 Approval Workflow
 *   - *Description*: Streamline the approval process for submitted expense reports with configurable workflows, batch processing, and delegation capabilities.
 *
 * Steps Implemented:
 * 1. Use the useAuthContext hook to ensure the user is authenticated and has the necessary permissions.
 * 2. Fetch the list of pending approvals from the backend using the fetchData utility.
 * 3. Render each approval item with options to approve or reject.
 * 4. Handle approval and rejection actions by sending the respective requests to the backend using postData.
 * 5. Update the list of approvals based on the actions taken.
 */
const ApprovalList: React.FC = () => {
  // Step 1: Ensure user is authenticated and has manager permissions
  const { user, isAuthenticated } = useAuthContext();
  
  // State to store pending approvals
  const [approvals, setApprovals] = useState<any[]>([]);
  
  // State to handle loading and error states
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // Fetch pending approvals on component mount
  useEffect(() => {
    const fetchApprovals = async () => {
      if (isAuthenticated && user?.role === 'Manager') {
        try {
          // Step 2: Fetch pending approvals from the backend
          const data = await fetchData(`${API_BASE_URL}/approvals/pending`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            },
          });
          setApprovals(data);
        } catch (err) {
          setError('Failed to fetch pending approvals. Please try again later.');
          console.error('Error fetching approvals:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setError('You do not have permission to view this content.');
        setLoading(false);
      }
    };

    fetchApprovals();
  }, [isAuthenticated, user]);

  // Step 4: Handle approval action
  const handleApprove = async (reportId: number) => {
    try {
      await postData(`${API_BASE_URL}/approvals/approve`, { reportId }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      });
      // Step 5: Update approvals list
      setApprovals(prev => prev.filter(approval => approval.id !== reportId));
    } catch (err) {
      console.error('Error approving report:', err);
      alert('Failed to approve the report. Please try again.');
    }
  };

  // Step 4: Handle rejection action
  const handleReject = async (reportId: number) => {
    try {
      await postData(`${API_BASE_URL}/approvals/reject`, { reportId }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      });
      // Step 5: Update approvals list
      setApprovals(prev => prev.filter(approval => approval.id !== reportId));
    } catch (err) {
      console.error('Error rejecting report:', err);
      alert('Failed to reject the report. Please try again.');
    }
  };

  // Step 3: Render approval items with approve and reject options
  return (
    <div className="approval-list">
      <h1>Pending Expense Approvals</h1>
      {loading ? (
        <p>Loading pending approvals...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : approvals.length === 0 ? (
        <p>No pending approvals at this time.</p>
      ) : (
        approvals.map(approval => (
          <div key={approval.id} className="approval-item">
            <div>
              <p><strong>Report ID:</strong> {approval.id}</p>
              <p><strong>Employee Name:</strong> {approval.employeeName}</p>
              <p><strong>Submission Date:</strong> {new Date(approval.submissionDate).toLocaleDateString()}</p>
              <p><strong>Total Amount:</strong> ${approval.totalAmount.toFixed(2)}</p>
            </div>
            <div className="approval-buttons">
              <button
                className="approval-button approve"
                onClick={() => handleApprove(approval.id)}
              >
                Approve
              </button>
              <button
                className="approval-button reject"
                onClick={() => handleReject(approval.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ApprovalList;