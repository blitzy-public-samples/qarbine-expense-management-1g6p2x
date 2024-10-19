/**
 * contexts.ts
 *
 * This file defines and manages React context providers for the web application, facilitating state management and sharing of data across components.
 * It includes contexts for authentication and theme settings.
 *
 * Requirements Addressed:
 * - Improve User Experience (Technical Specification/1.3 System Objectives)
 *   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 */

import React, { createContext, useState, ReactNode } from 'react'; // react version 17.0.2

// Internal dependencies
import { useAuthContext } from './hooks'; // To provide authentication-related functionalities using the authentication context.
import { TOKEN_KEY } from './auth'; // To manage authentication tokens within the context.
import { API_BASE_URL } from './constants'; // To use as the base URL for API requests within the context.

/** 
 * Type definition for the Authentication Context.
 */
type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

/**
 * Creates a Context for Authentication.
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthContextProvider
 *
 * Provides authentication context to its children components, managing authentication state and actions.
 *
 * Requirements Addressed:
 * - Improve User Experience (Technical Specification/1.3 System Objectives)
 *   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 *
 * @param {ReactNode} children - The child components that will have access to the authentication context.
 * @returns {JSX.Element} A provider component that wraps its children with authentication context.
 */
export const AuthContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  // Initialize authentication state using useState.
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Define login function to update authentication state.
  const login = (token: string) => {
    // Store the authentication token using TOKEN_KEY.
    localStorage.setItem(TOKEN_KEY, token);
    // Update the authentication state.
    setIsAuthenticated(true);
    // Additional logic can be added here to fetch user data or permissions using API_BASE_URL.
  };

  // Define logout function to update authentication state.
  const logout = () => {
    // Remove the authentication token.
    localStorage.removeItem(TOKEN_KEY);
    // Update the authentication state.
    setIsAuthenticated(false);
    // Additional cleanup actions can be performed here.
  };

  // Provide the authentication state and functions via the context provider.
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/** 
 * Type definition for the Theme Context.
 */
type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

/**
 * Creates a Context for Theme management.
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeContextProvider
 *
 * Provides theme context to its children components, allowing them to access and modify theme settings.
 *
 * Requirements Addressed:
 * - Improve User Experience (Technical Specification/1.3 System Objectives)
 *   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 *
 * @param {ReactNode} children - The child components that will have access to the theme context.
 * @returns {JSX.Element} A provider component that wraps its children with theme context.
 */
export const ThemeContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  // Initialize theme state using useState.
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Define a function to toggle the theme between light and dark modes.
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    // Additional logic can be added here to persist the theme selection.
  };

  // Provide the theme state and toggle function via the context provider.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};