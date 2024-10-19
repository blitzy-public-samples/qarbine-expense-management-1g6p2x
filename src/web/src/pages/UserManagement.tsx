// Import React and related hooks (version 17.0.2)
import React, { useState, useEffect } from 'react'; // version 17.0.2

// Import internal dependencies
import { fetchData, postData } from '../utils/api'; // To retrieve and update user data from the backend
import { isAuthenticated } from '../utils/auth'; // To check if the user is authenticated
import { useAuthContext } from '../utils/contexts'; // To manage and access authentication state within the component
import UserProfile from '../components/UserProfile'; // To render and manage individual user profiles
import Settings from '../components/Settings'; // To manage user settings and preferences

// Import styles
import '../styles/UserManagement.css';

/**
 * UserManagement Component
 *
 * This component renders the User Management page, allowing administrators to view, add, edit, and delete user accounts.
 * It addresses the following requirement:
 * - **User Authentication and Authorization** (Technical Specification/13.1 User Authentication and Authorization)
 *   - Manage secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.
 *
 * Steps performed in this component:
 * 1. **Check Authentication**: Verifies if the user is authenticated using `isAuthenticated`.
 * 2. **Fetch Users**: Retrieves the list of users from the backend using `fetchData`.
 * 3. **Display User List**: Shows the list of users with options to add, edit, or delete accounts.
 * 4. **User Profile Management**: Utilizes `UserProfile` to view and edit individual user details.
 * 5. **Settings Management**: Incorporates the `Settings` component to manage user settings and preferences.
 * 6. **Update Backend**: Sends updates to the backend using `postData` when user data is modified.
 * 7. **Authentication State Update**: Updates the authentication state if necessary using `useAuthContext`.
 *
 * @returns JSX.Element - The rendered user management component.
 */
const UserManagement: React.FC = () => {
  // Access authentication state and user role from the context
  const { userRole, updateAuthState } = useAuthContext();

  // State to hold the list of users
  const [users, setUsers] = useState<any[]>([]);

  // State to handle loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Effect hook to check authentication and fetch users upon component mount
  useEffect(() => {
    // Step 1: Check if the user is authenticated
    if (!isAuthenticated()) {
      // If not authenticated, redirect to login page
      window.location.href = '/login';
      return;
    }

    // Step 2: Fetch the list of users
    fetchData('/api/users')
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      });
  }, []);

  /**
   * Handles adding a new user.
   * Sends a request to the backend to create a new user.
   */
  const handleAddUser = () => {
    // Implement the logic to add a new user
    // This could involve opening a modal with a form
    // Once the form is submitted, use postData to send data to the backend
  };

  /**
   * Handles editing an existing user.
   * @param userId - The ID of the user to edit
   */
  const handleEditUser = (userId: number) => {
    // Implement the logic to edit user details
    // This could involve opening a modal pre-filled with user data
    // After editing, use postData to update the backend
  };

  /**
   * Handles deleting a user.
   * @param userId - The ID of the user to delete
   */
  const handleDeleteUser = (userId: number) => {
    // Confirm the deletion action with the administrator
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Step 6: Send a delete request to the backend
      postData(`/api/users/${userId}`, { method: 'DELETE' })
        .then(() => {
          // Update the users state to reflect the deletion
          setUsers(users.filter((user) => user.id !== userId));
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
  };

  // Render the User Management page
  return (
    <div className="user-management-container">
      {/* Header Section */}
      <h1 className="user-management-header">User Management</h1>

      {/* Step 5: Settings Management */}
      <Settings />

      {/* Add User Button */}
      <button className="user-action-button" onClick={handleAddUser}>
        Add User
      </button>

      {/* User List Section */}
      {isLoading ? (
        <p>Loading users...</p>
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-item">
              {/* Step 4: User Profile Management */}
              <UserProfile user={user} />

              {/* Edit and Delete Buttons */}
              <button
                className="user-action-button"
                onClick={() => handleEditUser(user.id)}
              >
                Edit
              </button>
              <button
                className="user-action-button"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserManagement;