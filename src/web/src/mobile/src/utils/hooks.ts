// Import necessary modules and hooks

// External imports
import { useState, useEffect } from 'react'; // React version 17.0.2

// Internal imports
import { useAuthContext } from './contexts'; // To manage and access authentication state within components.
import { fetchWithAuth } from './helpers'; // To fetch data from APIs within hooks.
import { validateForm } from './validation'; // To validate form data within hooks.

/**
 * Custom hook that fetches data from a specified API endpoint and manages loading and error states.
 * 
 * This hook facilitates data retrieval in components, enhancing code reusability and improving user experience.
 * 
 * Requirements Addressed:
 * - Improve User Experience
 *   - Description: Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 *   - Location: Technical Specification/1.3 System Objectives
 * 
 * @param endpoint - The API endpoint from which to fetch data.
 * @returns An object containing the fetched data, loading state, and any error encountered.
 */
export const useFetchData = (endpoint: string) => {
  // Initialize state variables for data, loading, and error using useState.
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Define a fetchData function that uses the fetchWithAuth utility to retrieve data from the API.
  const fetchData = async () => {
    try {
      setLoading(true); // Begin loading state.
      const response = await fetchWithAuth(endpoint); // Fetch data with authentication.
      setData(response); // Set the retrieved data.
    } catch (err) {
      setError(err as Error); // Set any error encountered.
    } finally {
      setLoading(false); // End loading state.
    }
  };

  // Use useEffect to call fetchData when the component mounts or the endpoint changes.
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]); // Dependency array includes endpoint.

  // Return the data, loading, and error states.
  return { data, loading, error };
};

/**
 * Custom hook that provides authentication functionalities, including login, logout, and checking authentication status.
 * 
 * This hook simplifies authentication management within components, contributing to an improved user experience.
 * 
 * Requirements Addressed:
 * - Improve User Experience
 *   - Description: Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 *   - Location: Technical Specification/1.3 System Objectives
 * 
 * @returns An object containing authentication state and functions for login and logout.
 */
export const useAuth = () => {
  // Use useAuthContext to access authentication state and actions.
  const { authState, setAuthState } = useAuthContext();

  // Define login function that utilizes the auth utilities.
  const login = async (credentials: { username: string; password: string }) => {
    // Validate form data using validateForm utility.
    const isValid = validateForm(credentials);
    if (!isValid) {
      throw new Error('Validation failed. Please check your input.'); // Handle validation errors.
    }
    try {
      // Call the login API endpoint using fetchWithAuth.
      const response = await fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      // Update authentication state upon successful login.
      setAuthState({ ...authState, isAuthenticated: true, user: response.user });
    } catch (err) {
      // Handle login errors.
      throw err;
    }
  };

  // Define logout function that utilizes the auth utilities.
  const logout = () => {
    // Clear authentication state to log out the user.
    setAuthState({ ...authState, isAuthenticated: false, user: null });
  };

  // Return the authentication state and functions.
  return {
    authState,
    login,
    logout,
  };
};