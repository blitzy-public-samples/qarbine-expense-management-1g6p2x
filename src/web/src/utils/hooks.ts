// Import React hooks from 'react' v17.0.2
import { useState, useEffect } from 'react'; // react@17.0.2

// Internal dependencies
// To manage and access authentication state within components.
import { useAuthContext } from './contexts'; // src/web/src/utils/contexts.ts

// To perform API GET and POST requests within hooks.
import { fetchData, postData } from './api'; // src/web/src/utils/api.ts

// To manage authentication tokens within hooks.
import { TOKEN_KEY } from './auth'; // src/web/src/utils/auth.ts

// To use as the base URL for API requests within hooks.
import { API_BASE_URL } from './constants'; // src/web/src/utils/constants.ts

// To validate email inputs within hooks.
import { validateEmail } from './validation'; // src/web/src/utils/validation.ts

/**
 * Custom hook that fetches data from a specified API endpoint and manages loading and error states.
 *
 * @param endpoint - The API endpoint to fetch data from.
 * @returns An object containing the fetched data, loading state, and any error encountered.
 *
 * Addresses Requirement:
 * - Improve User Experience (Technical Specification/1.3 System Objectives)
 *   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 *   This hook simplifies data fetching and state management, promoting code reusability and cleaner component code.
 */
export const useFetchData = (endpoint: string) => {
  // Initialize state variables for data, loading, and error using useState.
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Define a function to fetch data from the API.
  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Use the fetchData utility to retrieve data from the API.
      const response = await fetchData(`${API_BASE_URL}${endpoint}`);
      setData(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Use useEffect to call fetchData when the component mounts or the endpoint changes.
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  // Return the data, loading, and error states.
  return { data, loading, error };
};

/**
 * Custom hook that provides authentication functionalities, including login, logout, and checking authentication status.
 *
 * @returns An object containing authentication state and functions for login and logout.
 *
 * Addresses Requirement:
 * - Improve User Experience (Technical Specification/1.3 System Objectives)
 *   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 *   This hook centralizes authentication logic, promoting code reusability and consistent authentication state management across components.
 */
export const useAuth = () => {
  // Use useAuthContext to access authentication state and actions.
  const { authState, setAuthState } = useAuthContext();

  // Define login function that utilizes the auth utilities.
  const login = async (email: string, password: string) => {
    // Validate email input.
    if (!validateEmail(email)) {
      throw new Error('Invalid email format.');
    }

    // Prepare credentials.
    const credentials = { email, password };

    try {
      // Perform API POST request to login endpoint.
      const response = await postData(`${API_BASE_URL}/auth/login`, credentials);
      // Assume response contains token and user data.
      const { token, user } = response;
      // Store token using TOKEN_KEY utility.
      localStorage.setItem(TOKEN_KEY, token);
      // Update auth state.
      setAuthState({ isAuthenticated: true, user });
    } catch (err) {
      throw err;
    }
  };

  // Define logout function that utilizes the auth utilities.
  const logout = () => {
    // Remove token from local storage.
    localStorage.removeItem(TOKEN_KEY);
    // Update auth state.
    setAuthState({ isAuthenticated: false, user: null });
  };

  // Return the authentication state and functions.
  return {
    authState,
    login,
    logout,
  };
};