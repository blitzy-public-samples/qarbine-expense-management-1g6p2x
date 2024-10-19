// External imports
import React, { useEffect, useState } from 'react'; // React version 17.0.2

// Internal imports
import { fetchData, postData } from '../utils/api'; // Utilities for API calls
import { useAuthContext } from '../utils/contexts'; // To access authentication state and permissions
import ApprovalList from '../components/ApprovalList'; // To display the list of pending approvals
import Notifications from '../components/Notifications'; // To display notifications related to approval actions
import Sidebar from '../components/Sidebar'; // Navigation options within the dashboard
import Header from '../components/Header'; // Top navigation bar with branding and user actions

// Styles
import '../styles/ApprovalDashboard.css';

/**
 * ApprovalDashboard component
 *
 * Renders the ApprovalDashboard page, integrating various components to manage pending expense approvals.
 *
 * Requirements Addressed:
 * - **Approval Workflow** (Technical Specification/13.4 Approval Workflow)
 *   - Streamlines the approval process for submitted expense reports.
 *   - Implements multi-level approval workflows and batch processing capabilities.
 * - **Authentication and Authorization** (Technical Specification/13.1 User Authentication and Authorization)
 *   - Ensures that only users with the Manager role can access the approval dashboard.
 *   - Uses role-based access control (RBAC) for permissions.
 *
 * @returns {JSX.Element} A JSX element representing the approval dashboard interface.
 */
const ApprovalDashboard: React.FC = () => {
  // Access authentication state and user information
  const { user, authLoading } = useAuthContext();

  // State for the list of pending approvals
  const [approvals, setApprovals] = useState([]);

  // State for loading status
  const [isLoading, setIsLoading] = useState(true);

  // State for notifications related to approval actions
  const [notifications, setNotifications] = useState([]);

  /**
   * Fetches the list of pending approvals from the backend.
   * Utilizes the fetchData utility from src/web/src/utils/api.ts.
   *
   * Corresponds to:
   * - **Fetch the list of pending approvals** (JSON Specification > functions > steps)
   * - **TR-F004.3** Provide in-app notifications for pending approvals (Technical Specification/13.4 Approval Workflow)
   */
  const fetchPendingApprovals = async () => {
    try {
      setIsLoading(true);
      const response = await fetchData('/api/approvals');
      setApprovals(response.data);
    } catch (error) {
      console.error('Error fetching pending approvals:', error);
      setNotifications((prev) => [
        ...prev,
        { message: 'Failed to load pending approvals.', type: 'error' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles approval and rejection actions by sending the respective requests to the backend.
   * Utilizes the postData utility from src/web/src/utils/api.ts.
   *
   * Corresponds to:
   * - **Handle approval and rejection actions** (JSON Specification > functions > steps)
   * - **TR-F004.1** Configure multi-level approval workflows (Technical Specification/13.4 Approval Workflow)
   *
   * @param {string} approvalId - The ID of the approval to process.
   * @param {string} decision - The decision made ('Approved' or 'Rejected').
   */
  const handleApprovalAction = async (approvalId: string, decision: string) => {
    try {
      await postData(`/api/approvals/${approvalId}`, { decision });
      // Update the list of approvals based on the action taken
      setApprovals((prev) => prev.filter((approval) => approval.id !== approvalId));
      setNotifications((prev) => [
        ...prev,
        { message: `Expense report ${decision.toLowerCase()} successfully.`, type: 'success' },
      ]);
    } catch (error) {
      console.error(`Error processing approval (${decision}):`, error);
      setNotifications((prev) => [
        ...prev,
        { message: `Failed to ${decision.toLowerCase()} expense report.`, type: 'error' },
      ]);
    }
  };

  // Fetch pending approvals when the component mounts and when the user is authenticated
  useEffect(() => {
    if (!authLoading && user && user.role === 'Manager') {
      fetchPendingApprovals();
    }
  }, [authLoading, user]);

  // If authentication is loading, display a loading indicator
  if (authLoading) {
    return <div>Loading...</div>;
  }

  // Ensure the user has the necessary permissions (Manager role)
  if (!user || user.role !== 'Manager') {
    return <div>Access denied. You do not have permission to view this page.</div>;
  }

  return (
    <div className="approval-dashboard">
      {/* Header section */}
      <div className="approval-dashboard-header">
        {/* Renders the Header component at the top of the page */}
        <Header />
      </div>

      {/* Renders the Sidebar component for navigation options */}
      <Sidebar />

      {/* Main content area */}
      <div className="approval-dashboard-content">
        {/* Renders notifications related to approval actions */}
        <Notifications notifications={notifications} />

        {/* Displays loading status or the list of pending approvals */}
        {isLoading ? (
          <div>Loading pending approvals...</div>
        ) : (
          /* Renders the ApprovalList component to display pending approvals */
          <ApprovalList approvals={approvals} onAction={handleApprovalAction} />
        )}
      </div>
    </div>
  );
};

export default ApprovalDashboard;