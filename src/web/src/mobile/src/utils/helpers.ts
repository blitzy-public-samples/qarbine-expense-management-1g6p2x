// Import internal dependencies
import { useAuthContext } from './contexts';
import { useFetchData } from './hooks';
import { validateForm } from './validation';
import { IconComponent } from '../assets/icons';
import logoSVG from '../assets/logo.svg';

// Import external dependencies
import _ from 'lodash'; // lodash version 4.17.21

// Define global constants
export const API_BASE_URL = 'https://api.example.com';

/**
 * Formats a number into a currency string.
 *
 * This function enhances efficiency by ensuring consistent currency formatting across the mobile application,
 * reducing errors in expense reporting and reimbursement workflows.
 *
 * Requirements Addressed:
 * - **Enhance Efficiency**: Reduce processing time and minimize errors in expense reporting and reimbursement workflows.
 *   - Location: Technical Specification/1.3 System Objectives
 *
 * @param amount - The numerical amount to format.
 * @returns A formatted currency string based on locale settings.
 */
export function formatCurrency(amount: number): string {
    // Receive the amount as a parameter.

    // Use lodash to ensure the amount is a valid number.
    if (!_.isFinite(amount)) {
        throw new Error('Invalid amount provided to formatCurrency');
    }

    // Format the number into a currency string using locale settings.
    const formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD', // Currency can be dynamic based on user preferences.
    });
    const formattedAmount = formatter.format(amount);

    // Return the formatted currency string.
    return formattedAmount;
}

/**
 * Fetches data from an API endpoint with authentication headers.
 *
 * This function streamlines API interactions by automatically including authentication tokens,
 * thereby reducing processing time and minimizing errors in data retrieval.
 *
 * Requirements Addressed:
 * - **Enhance Efficiency**: Reduce processing time and minimize errors in expense reporting and reimbursement workflows.
 *   - Location: Technical Specification/1.3 System Objectives
 *
 * @param endpoint - The API endpoint to fetch data from.
 * @returns A promise resolving to the fetched data as an object.
 */
export async function fetchWithAuth(endpoint: string): Promise<object> {
    // Access the authentication context using useAuthContext.
    const { authToken } = useAuthContext();

    // Retrieve the authentication token from the context.
    if (!authToken) {
        throw new Error('Authentication token is missing. Please log in again.');
    }

    // Construct the full API URL using API_BASE_URL and endpoint.
    const url = `${API_BASE_URL}/${endpoint}`;

    // Perform a fetch request with the authentication token in headers.
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });

    // Check if the response is okay.
    if (!response.ok) {
        // Handle HTTP errors.
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }

    // Return the response data as a promise.
    const data = await response.json();
    return data;
}