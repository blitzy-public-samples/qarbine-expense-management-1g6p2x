// Import React and necessary hooks for component state and lifecycle management
import React, { useEffect, useState } from 'react'; // react version 17.0.2

// Import internal dependencies
// fetchData utility to fetch reimbursement status data from the backend API
import { fetchData } from '../utils/api';
// useAuthContext to access the authentication context and ensure the user is authenticated
import { useAuthContext } from '../utils/contexts';
// API_BASE_URL to construct the API endpoint for fetching reimbursement data
import { API_BASE_URL } from '../utils/constants';

// Import external dependencies
// normalize.css to ensure cross-browser consistency in default styling
import 'normalize.css'; // normalize.css version 8.0.1

// Import styles specific to this component
import '../styles/ReimbursementStatus.css';

/**
 * Interface representing a reimbursement record
 */
interface Reimbursement {
  id: number;
  amount: number;
  currency: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submissionDate: string;
  processedDate?: string;
}

/**
 * ReimbursementStatus Component
 *
 * This React functional component displays the reimbursement status for the logged-in user.
 *
 * Requirements Addressed:
 * - **Reimbursement Processing**
 *   - Location: Technical Specification/13.5 Reimbursement Processing
 *   - Description: Automates the reimbursement process for approved expenses, integrating with payroll systems and supporting multiple payment methods.
 *
 * The component ensures that users can view the status of their reimbursements, which aligns with automating and providing transparency in the reimbursement process.
 */
const ReimbursementStatus: React.FC = () => {
  // Access authenticated user information
  const { user } = useAuthContext();

  // State variables for reimbursement data, loading status, and error handling
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reimbursement data when the component mounts
  useEffect(() => {
    // Ensure the user is authenticated before fetching data
    if (!user) return;

    /**
     * Fetch reimbursement data from the backend API
     * Steps:
     * 1. Construct the API endpoint using API_BASE_URL
     * 2. Use fetchData utility to fetch data
     * 3. Manage loading and error states
     */
    const fetchReimbursements = async () => {
      try {
        // Construct API endpoint for fetching reimbursement data
        const endpoint = `${API_BASE_URL}/api/reimbursements/user/${user.id}`;

        // Fetch data using the fetchData utility function
        const data = await fetchData<Reimbursement[]>(endpoint, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        // Update state with fetched data
        setReimbursements(data);
      } catch (err) {
        // Handle any errors during the fetch operation
        setError('Failed to load reimbursement data.');
      } finally {
        // Set loading to false after the fetch operation completes
        setLoading(false);
      }
    };

    fetchReimbursements();
  }, [user]);

  // Render loading state
  if (loading) {
    return <div className="reimbursement-status">Loading reimbursement statuses...</div>;
  }

  // Render error state if there's an error
  if (error) {
    return <div className="reimbursement-status error">{error}</div>;
  }

  // Render the reimbursement status table
  return (
    <div className="reimbursement-status">
      <h2>Reimbursement Status</h2>
      {reimbursements.length === 0 ? (
        <p>No reimbursements found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="status-label">ID</th>
              <th className="status-label">Amount</th>
              <th className="status-label">Currency</th>
              <th className="status-label">Status</th>
              <th className="status-label">Submitted On</th>
              <th className="status-label">Processed On</th>
            </tr>
          </thead>
          <tbody>
            {reimbursements.map((reimbursement) => (
              <tr key={reimbursement.id}>
                <td>{reimbursement.id}</td>
                <td>{reimbursement.amount.toFixed(2)}</td>
                <td>{reimbursement.currency}</td>
                <td>{reimbursement.status}</td>
                <td>
                  {new Date(reimbursement.submissionDate).toLocaleDateString()}
                </td>
                <td>
                  {reimbursement.processedDate
                    ? new Date(reimbursement.processedDate).toLocaleDateString()
                    : 'Pending'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReimbursementStatus;