// Import external dependencies
import _ from 'lodash'; // Lodash library functions (version 4.17.21) used to provide utility functions for common tasks.

/**
 * Formats a number into a currency string based on the provided locale and currency type.
 *
 * @param amount - The numeric amount to format.
 * @param locale - The locale code (e.g., 'en-US') to format the currency.
 * @param currency - The currency code (e.g., 'USD') of the currency type.
 * @returns A formatted currency string.
 *
 * @remarks
 * This function enhances efficiency by reducing errors in displaying currency formats correctly, supporting internationalization.
 * 
 * Requirements Addressed:
 * - **Enhance Efficiency**: Reduce processing time and minimize errors in expense reporting and reimbursement workflows.
 *   - **Location**: Technical Specification/1.3 System Objectives
 */
export function formatCurrency(amount: number, locale: string, currency: string): string {
    // Use the Intl.NumberFormat object to format the amount.
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    });

    // Return the formatted currency string.
    return formatter.format(amount);
}

/**
 * Capitalizes the first letter of a given string.
 *
 * @param text - The input string to be modified.
 * @returns The input string with the first letter capitalized.
 *
 * @remarks
 * This function uses Lodash's 'capitalize' function to enhance efficiency and reduce potential errors.
 * 
 * Requirements Addressed:
 * - **Enhance Efficiency**: Reduce processing time and minimize errors in expense reporting and reimbursement workflows.
 *   - **Location**: Technical Specification/1.3 System Objectives
 */
export function capitalizeFirstLetter(text: string): string {
    // Check if the input text is not empty.
    if (!text) {
        return '';
    }

    // Use Lodash's 'capitalize' function to convert the first character to uppercase.
    return _.capitalize(text);
}