// UserProfile.tsx
// This component renders the user profile page, allowing users to view and edit their personal information.
// It integrates with authentication and API utilities to manage user data and ensure secure access.
// Requirements Addressed:
// - Improve User Experience (Technical Specification/1.3 System Objectives)
//   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.

// Import React and necessary hooks (React version 17.0.2)
import React, { useState, useEffect } from 'react'; // React library v17.0.2

// Import internal dependencies
import { fetchData, postData } from '../utils/api'; // To retrieve and update user data from/to the backend
import { isAuthenticated } from '../utils/auth'; // To check if the user is authenticated before accessing the profile page
import { useAuthContext } from '../utils/contexts'; // To manage and access authentication state within the component
import { validateEmail } from '../utils/validation'; // To validate the email input in the user profile form

// Import styles for this component
import '../styles/UserProfile.css'; // Styles defined in UserProfile.css

// Define the UserProfile functional component
const UserProfile: React.FC = () => {
  // Use the authentication context to manage authentication state
  const { authState, setAuthState } = useAuthContext();

  // State variables to hold user data
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    // Additional fields can be added here
  });

  // State variable for form errors
  const [errors, setErrors] = useState({
    email: '',
    // Additional error fields can be added here
  });

  // Effect hook to check authentication and fetch user data
  useEffect(() => {
    // Step: Check if the user is authenticated using isAuthenticated.
    if (!isAuthenticated()) {
      // Handle unauthenticated access, e.g., redirect to login page
      console.warn('User is not authenticated.');
      // TODO: Implement redirection to login page
    } else {
      // Step: Fetch the user's current data using fetchData.
      fetchUserData();
    }
  }, []);

  // Function to fetch user data from the backend
  const fetchUserData = async () => {
    try {
      const data = await fetchData('/user/profile'); // API endpoint to get user profile data
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // TODO: Implement error handling (e.g., show notification to the user)
    }
  };

  // Handler for input changes in the form fields
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Step: Validate the email input using validateEmail when the form is submitted.
    const emailError = validateEmail(userData.email);
    if (emailError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: emailError,
      }));
      return;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: '',
      }));
    }

    try {
      // Step: Send the updated user data to the backend using postData.
      const updatedData = await postData('/user/profile', userData);
      setUserData(updatedData);

      // Step: Update the authentication state if necessary using useAuthContext.
      setAuthState({ ...authState, user: updatedData });

      // TODO: Implement user feedback (e.g., success notification)
    } catch (error) {
      console.error('Error updating user data:', error);
      // TODO: Implement error handling (e.g., show notification to the user)
    }
  };

  // Render the user's information in a form with editable fields
  return (
    <div className="user-profile-container">
      <h2 className="user-profile-header">User Profile</h2>
      <form className="user-profile-details" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="user-profile-input"
          value={userData.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          type="email"
          name="email"
          className="user-profile-input"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <div className="error">{errors.email}</div>}

        {/* Additional fields can be added here */}

        <button type="submit" className="user-profile-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;