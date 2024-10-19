/**
 * contexts.ts
 * 
 * This file defines and manages React context providers for the mobile application, facilitating state management and sharing of data across components.
 * It includes contexts for authentication and user settings, ensuring consistent access to these states throughout the mobile app.
 * 
 * Requirements Addressed:
 * - Improve User Experience; Technical Specification/1.3 System Objectives
 *   Description: Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 */

// Importing React and necessary hooks (React v17.0.2)
import React, { createContext, useState, ReactNode } from 'react';

// Importing internal dependencies
import { useAuthContext } from './hooks'; // Provides authentication-related functionalities using the authentication context, located at src/web/src/mobile/src/utils/hooks.ts
import { API_BASE_URL } from '../../../utils/constants'; // Base URL for API requests within the context, located at src/web/src/utils/constants.ts

/**
 * Interface representing a User.
 * 
 * Defines the structure of the user object used in the authentication context.
 */
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as necessary
}

/**
 * Interface defining the shape of the authentication context state.
 * This includes the authentication state, the user object, and authentication actions.
 * 
 * Requirements Addressed:
 * - Improve User Experience; Technical Specification/1.3 System Objectives
 *   Description: Ensuring consistent access to authentication state across components enhances user experience by providing seamless navigation and functionality.
 */
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

/**
 * Creating the authentication context.
 * 
 * Initializes the AuthContext with undefined to enforce context usage within a provider.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthContextProvider component.
 * 
 * Provides authentication context to its children components, managing authentication state and actions.
 * 
 * Parameters:
 * - children: ReactNode - The child components that will have access to the authentication context.
 * 
 * Returns:
 * - JSX.Element: A provider component that wraps its children with authentication context.
 * 
 * Steps:
 * 1. Initialize authentication state using useState.
 * 2. Define login and logout functions to update authentication state.
 * 3. Provide the authentication state and functions via the context provider.
 * 4. Return the context provider wrapping the children components.
 * 
 * Requirements Addressed:
 * - Improve User Experience; Technical Specification/1.3 System Objectives
 *   Description: By managing authentication state globally, the application provides a seamless and intuitive experience for users.
 */
const AuthContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  // Step 1: Initialize authentication state using useState.
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Step 2: Define login and logout functions to update authentication state.

  /**
   * login function
   * 
   * Authenticates the user with the given credentials and updates the authentication state.
   * 
   * @param username - The username of the user.
   * @param password - The password of the user.
   */
  const login = async (username: string, password: string): Promise<void> => {
    try {
      // Perform login API request
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: username, password })
      });

      if (response.ok) {
        const data = await response.json();
        // Update the authentication state
        setIsAuthenticated(true);
        setUser(data.user);
        // Possibly store tokens or session info in secure storage
      } else {
        // Handle login failure
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle error appropriately, possibly set error state
    }
  };

  /**
   * logout function
   * 
   * Logs out the user and updates the authentication state.
   */
  const logout = (): void => {
    // Perform logout actions
    setIsAuthenticated(false);
    setUser(null);
    // Possibly remove tokens or session info from secure storage
  };

  // Step 3: Provide the authentication state and functions via the context provider.
  const authContextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout
  };

  // Step 4: Return the context provider wrapping the children components.
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Exporting AuthContext and AuthContextProvider for use in other components.
export { AuthContext, AuthContextProvider };