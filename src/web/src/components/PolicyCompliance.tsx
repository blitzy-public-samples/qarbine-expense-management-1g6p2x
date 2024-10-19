import React, { useEffect, useState } from 'react';
// Importing fetchData utility to fetch policy data from the backend API.
// Internal Dependency: src/web/src/utils/api.ts
import { fetchData } from '../utils/api';
// Importing useAuthContext hook to access authentication context and ensure the user is authorized.
// Internal Dependency: src/web/src/utils/contexts.ts
import { useAuthContext } from '../utils/contexts';
// Importing API_BASE_URL to construct API endpoints for fetching policy data.
// Internal Dependency: src/web/src/utils/constants.ts
import { API_BASE_URL } from '../utils/constants';
// Importing CSS styles for the PolicyCompliance component.
import '../styles/PolicyCompliance.css';
// Importing React library for building the component.
// External Dependency: react v17.0.2
import { JSX } from 'react';

/**
 * PolicyCompliance Component
 * Description: A React functional component that displays a list of compliance policies for the user.
 * 
 * Requirements Addressed:
 * - Ensure all expense submissions adhere to company policies and international tax laws through configurable rules and real-time validation.
 *   - Location: Technical Specification/13.3 Policy and Compliance Engine
 * 
 * Steps:
 * 1. Use the useAuthContext hook to ensure the user is authenticated.
 * 2. Fetch the list of policies from the backend using the fetchData utility.
 * 3. Render the policies in a styled list, using CSS classes defined in PolicyCompliance.css.
 * 4. Provide visual feedback if the user is not compliant with any policies.
 */

const PolicyCompliance: React.FC = (): JSX.Element => {
  // State to hold the list of policies.
  const [policies, setPolicies] = useState<Array<Policy>>([]);
  // State to handle loading state.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State to handle errors.
  const [error, setError] = useState<string>('');
  // Access authentication context to ensure the user is authorized.
  const { user } = useAuthContext();

  // Fetch policies on component mount.
  useEffect(() => {
    // Check if the user is authenticated.
    if (user && user.isAuthenticated) {
      // Construct the API endpoint.
      const endpoint = `${API_BASE_URL}/policies`;

      // Fetch the list of policies from the backend API.
      fetchData(endpoint)
        .then((data) => {
          // Update the policies state with the fetched data.
          setPolicies(data.policies);
          setIsLoading(false);
        })
        .catch((err) => {
          // Handle any errors during the fetch.
          setError('Failed to load policies. Please try again later.');
          setIsLoading(false);
        });
    } else {
      // If the user is not authenticated, set an error message.
      setError('You must be logged in to view policy compliance information.');
      setIsLoading(false);
    }
  }, [user]);

  // Render loading state.
  if (isLoading) {
    return <div className="policy-compliance-container">Loading policies...</div>;
  }

  // Render error state.
  if (error) {
    return <div className="policy-compliance-container">{error}</div>;
  }

  // Render the list of policies.
  return (
    <div className="policy-compliance-container">
      <h2 className="policy-compliance-header">Policy Compliance</h2>
      <ul className="policy-compliance-list">
        {policies.map((policy) => (
          <li key={policy.id} className="policy-compliance-item">
            <span>{policy.name}</span>
            {/* Provide visual feedback if the user is not compliant with any policies. */}
            {!policy.isCompliant && (
              <span className="non-compliant-indicator">Non-Compliant</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Define the Policy interface for type checking.
interface Policy {
  id: number;
  name: string;
  description: string;
  isCompliant: boolean;
}

export default PolicyCompliance;