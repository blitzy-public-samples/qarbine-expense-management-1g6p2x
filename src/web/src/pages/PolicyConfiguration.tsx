import React, { useState, useEffect } from 'react'; // React v17.0.2
import { useAuthContext } from '../utils/contexts'; // Internal utility for authorization context
import { fetchData, postData } from '../utils/api'; // Internal utilities for API calls
import { API_BASE_URL } from '../utils/constants'; // API base URL constant
import PolicyCompliance from '../components/PolicyCompliance'; // Component to display policy compliance status
import '../styles/PolicyConfiguration.css'; // Styles specific to the Policy Configuration page

const PolicyConfiguration: React.FC = () => {
  // Ensure the user has administrative privileges
  // Reference: Technical Specification/13.1 User Authentication and Authorization
  // Requirement: TR-F001.3 - Role-based access control for employees, managers, finance team, and administrators (Priority: High)
  const { user } = useAuthContext();

  if (user.role !== 'admin') {
    // Display unauthorized access message if user is not an administrator
    return <div>You are not authorized to access this page.</div>;
  }

  // State variables for policies and form inputs
  const [policies, setPolicies] = useState<any[]>([]);
  const [policyName, setPolicyName] = useState('');
  const [policyDescription, setPolicyDescription] = useState('');
  const [policyRules, setPolicyRules] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPolicyId, setCurrentPolicyId] = useState<string | null>(null);

  // Fetch existing policies from the backend API
  // Reference: Technical Specification/13.3 Policy and Compliance Engine
  // Requirement: TR-F003.1 - Configure expense policies based on employee level, department, and travel destination (Priority: High)
  useEffect(() => {
    fetchData(`${API_BASE_URL}/policies`)
      .then((data) => {
        setPolicies(data);
      })
      .catch((error) => {
        console.error('Error fetching policies:', error);
      });
  }, []);

  // Handle form submission for creating or updating policies
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const policy = {
      name: policyName,
      description: policyDescription,
      rules: policyRules,
    };

    let url = `${API_BASE_URL}/policies`;
    let method = 'POST';

    if (isEditing && currentPolicyId) {
      // Update existing policy if in edit mode
      url = `${API_BASE_URL}/policies/${currentPolicyId}`;
      method = 'PUT';
    }

    // Use postData utility to submit new or updated policy data to the backend API
    // Reference: Internal Dependencies from src/web/src/utils/api.ts
    postData(url, policy, method)
      .then(() => {
        // Refresh policies list after successful submission
        fetchData(`${API_BASE_URL}/policies`)
          .then((data) => {
            setPolicies(data);
          })
          .catch((error) => {
            console.error('Error fetching policies:', error);
          });

        // Reset form fields
        setPolicyName('');
        setPolicyDescription('');
        setPolicyRules('');
        setIsEditing(false);
        setCurrentPolicyId(null);
      })
      .catch((error) => {
        console.error('Error submitting policy:', error);
      });
  };

  // Populate form fields for editing a policy
  const handleEdit = (policy: any) => {
    setPolicyName(policy.name);
    setPolicyDescription(policy.description);
    setPolicyRules(policy.rules);
    setIsEditing(true);
    setCurrentPolicyId(policy.id);
  };

  // Delete a policy with confirmation prompt to prevent accidental deletions
  // Reference: Technical Specification/13.3 Policy and Compliance Engine
  // Requirement: TR-F003.5 - Flag expenses that exceed policy limits or require additional approval (Priority: High)
  const handleDelete = (policyId: string) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      postData(`${API_BASE_URL}/policies/${policyId}`, null, 'DELETE')
        .then(() => {
          // Update policies state after deletion
          setPolicies(policies.filter((policy) => policy.id !== policyId));
        })
        .catch((error) => {
          console.error('Error deleting policy:', error);
        });
    }
  };

  return (
    <div className="policy-config-container">
      {/* Header section for the Policy Configuration page */}
      {/* Reference: Technical Specification/13.3 Policy and Compliance Engine */}
      <h2 className="policy-config-header">Policy Configuration</h2>

      {/* Form for creating and editing policies */}
      {/* Addresses the requirement to render a form with fields for policy name, description, and rules */}
      <form className="policy-config-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Policy Name"
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
          required
        />
        <textarea
          placeholder="Policy Description"
          value={policyDescription}
          onChange={(e) => setPolicyDescription(e.target.value)}
          required
        />
        <textarea
          placeholder="Policy Rules"
          value={policyRules}
          onChange={(e) => setPolicyRules(e.target.value)}
          required
        />
        <button type="submit" className="policy-config-button">
          {isEditing ? 'Update Policy' : 'Create Policy'}
        </button>
      </form>

      {/* Display the list of existing policies */}
      {/* Includes options to edit and delete policies */}
      <h3 className="policy-config-subheader">Existing Policies</h3>
      <ul>
        {policies.map((policy) => (
          <li key={policy.id} className="policy-item">
            <strong>{policy.name}</strong>
            <p>{policy.description}</p>
            <p>{policy.rules}</p>
            <button
              onClick={() => handleEdit(policy)}
              className="policy-config-button"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(policy.id)}
              className="policy-config-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Display the PolicyCompliance component to show current compliance status */}
      {/* Reference: Technical Specification/13.3 Policy and Compliance Engine */}
      {/* Requirement: TR-F003.2 - Perform real-time policy checks during expense submission (Priority: High) */}
      <PolicyCompliance />
    </div>
  );
};

export default PolicyConfiguration;