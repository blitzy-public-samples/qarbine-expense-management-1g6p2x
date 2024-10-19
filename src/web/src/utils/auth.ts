// This file provides authentication utilities for the web application, including functions for managing authentication tokens, checking user authentication status, and handling login and logout processes.

// Import internal dependencies
import { TOKEN_KEY } from './constants'; // To store the key used for saving authentication tokens in local storage.
import { fetchData, postData } from './api'; // To make API requests for authentication-related operations.
import { useAuthContext } from './contexts'; // To access and manage authentication state within the application.

// Import external dependencies
import jwt_decode from 'jwt-decode'; // Version 3.1.2 - To decode JSON Web Tokens for extracting user information.

/**
 * Handles user login by sending credentials to the server and storing the received authentication token.
 *
 * Addresses Requirement: User Authentication and Authorization
 * Location: Technical Specification/13.1 User Authentication and Authorization
 *
 * @param {object} credentials - The user's login credentials.
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 */
export async function login(credentials: { [key: string]: any }): Promise<void> {
    // Step 1: Send the user's credentials to the server using postData.
    const response = await postData('/api/auth/login', credentials);

    // Step 2: Receive the authentication token from the server.
    const token = response.token;

    // Step 3: Store the token in local storage using TOKEN_KEY.
    localStorage.setItem(TOKEN_KEY, token);

    // Step 4: Update the authentication state using useAuthContext.
    const { setAuthState } = useAuthContext();
    setAuthState({ token, isAuthenticated: true });
}

/**
 * Logs out the user by removing the authentication token from local storage and updating the authentication state.
 *
 * Addresses Requirement: User Authentication and Authorization
 * Location: Technical Specification/13.1 User Authentication and Authorization
 *
 * @returns {void} No return value.
 */
export function logout(): void {
    // Step 1: Remove the authentication token from local storage using TOKEN_KEY.
    localStorage.removeItem(TOKEN_KEY);

    // Step 2: Update the authentication state to reflect that the user is logged out.
    const { setAuthState } = useAuthContext();
    setAuthState({ token: null, isAuthenticated: false });
}

/**
 * Checks if the user is currently authenticated by verifying the presence and validity of the authentication token.
 *
 * Addresses Requirement: User Authentication and Authorization
 * Location: Technical Specification/13.1 User Authentication and Authorization
 *
 * @returns {boolean} True if the user is authenticated, false otherwise.
 */
export function isAuthenticated(): boolean {
    // Step 1: Retrieve the authentication token from local storage using TOKEN_KEY.
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
        return false;
    }

    try {
        // Step 2: Decode the token using jwt-decode to check its validity.
        const decodedToken: any = jwt_decode(token);

        // Step 3: Return true if the token is valid and not expired, otherwise return false.
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp && decodedToken.exp > currentTime) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        // If token is invalid or decoding fails, return false.
        return false;
    }
}