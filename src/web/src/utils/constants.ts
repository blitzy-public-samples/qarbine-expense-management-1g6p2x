/**
 * constants.ts
 * 
 * This file defines constant values used across the web application, ensuring consistency and ease of maintenance.
 * It includes base URLs for API endpoints, keys for local storage, and other static configuration values.
 * 
 * Requirements Addressed:
 * - **Enhance Efficiency** (Technical Specification/1.3 System Objectives):
 *   - Reduce processing time and minimize errors in expense reporting and reimbursement workflows.
 *   - Location: Technical Specification/1.3 System Objectives
 * 
 * By centralizing configuration values, we minimize the risk of hard-coded values scattered throughout the application,
 * thus reducing errors and simplifying maintenance.
 */

/**
 * The base URL for the API endpoints.
 * All network requests from the web application should use this base URL.
 * 
 * Utilizing a central API base URL ensures that all HTTP requests are consistent and can be easily updated.
 * This directly contributes to **Enhance Efficiency** by simplifying changes to the API endpoint and reducing the risk of errors due to incorrect URLs.
 * 
 * References:
 * - Technical Specification/13.2 Expense Submission
 *   - TR-F002.3: Support multiple currencies with real-time conversion (Priority: High)
 *   - TR-F002.8: Provide an offline mode for expense entry when internet connection is unavailable (Priority: High)
 * 
 * These features require consistent API communication, which is facilitated by using a centralized API base URL.
 */
export const API_BASE_URL = 'https://api.example.com/v1';

/**
 * The key used for storing and retrieving the authentication token in local storage.
 * This key is used throughout the application to manage the user's authentication state.
 * 
 * By standardizing the token key, we ensure that all components of the application can reliably access the authentication token,
 * reducing potential errors in authorization and session management.
 * 
 * This supports **Enhance Efficiency** by minimizing errors in expense reporting workflows, as authentication is crucial for secure communication with backend services.
 * 
 * References:
 * - Technical Specification/13.1 User Authentication and Authorization
 *   - TR-F001.1: Implement secure login process with multi-factor authentication (MFA) (Priority: High)
 *   - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators (Priority: High)
 * 
 * Proper storage and management of the authentication token are essential for these authentication and authorization requirements.
 */
export const TOKEN_KEY = 'auth_token';