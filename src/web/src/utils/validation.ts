// Import lodash (version 4.17.21) for utility functions
import _ from 'lodash'; // lodash version 4.17.21

// Import internal dependencies
import { validateEmail as helperValidateEmail } from './helpers';
import { useAuthContext } from './contexts';
import { TOKEN_KEY } from './auth';
import { API_BASE_URL } from './constants';

/**
 * Validates an email address to ensure it follows the standard email format.
 *
 * Addresses requirement:
 * - Enhance Efficiency (Technical Specification/1.3 System Objectives):
 *   Reduce processing time and minimize errors in expense reporting and reimbursement workflows.
 *
 * @param email - The email address to validate.
 * @returns True if the email is valid, false otherwise.
 */
export function validateEmail(email: string): boolean {
  // Use existing helper function to validate the email format.
  return helperValidateEmail(email);
}

/**
 * Validates a password to ensure it meets the required security criteria, such as length and complexity.
 *
 * Addresses requirement:
 * - Enhance Efficiency (Technical Specification/1.3 System Objectives):
 *   Reduce processing time and minimize errors in expense reporting and reimbursement workflows.
 *
 * @param password - The password to validate.
 * @returns True if the password meets the criteria, false otherwise.
 */
export function validatePassword(password: string): boolean {
  // Check if the password length is greater than or equal to the minimum required length.
  const minLength = 8;
  if (password.length < minLength) {
    return false;
  }
  // Ensure the password contains a mix of uppercase, lowercase, numbers, and special characters.
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[\W_]/.test(password);
  // Return true if all criteria are met, otherwise return false.
  return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
}

/**
 * Validates a form object to ensure all fields meet their respective validation criteria.
 *
 * Addresses requirement:
 * - Enhance Efficiency (Technical Specification/1.3 System Objectives):
 *   Reduce processing time and minimize errors in expense reporting and reimbursement workflows.
 *
 * @param formData - An object containing the form data to validate.
 * @returns An object containing validation results for each form field.
 */
export function validateForm(formData: { [key: string]: any }): { [key: string]: boolean } {
  const validationResults: { [key: string]: boolean } = {};
  // Use authentication context if needed.
  const authContext = useAuthContext();
  // Iterate over each field in the formData object.
  for (const field in formData) {
    const value = formData[field];
    // Apply the appropriate validation function for each field.
    switch (field) {
      case 'email':
        validationResults[field] = validateEmail(value);
        break;
      case 'password':
        validationResults[field] = validatePassword(value);
        break;
      default:
        // For other fields, perform basic validation using lodash's isEmpty function.
        validationResults[field] = !_.isEmpty(value);
        break;
    }
  }
  // Collect and return the validation results for all fields.
  return validationResults;
}