/**
 * validation.ts
 *
 * This file provides validation utilities for the mobile application,
 * ensuring that form inputs and other data adhere to expected formats and constraints.
 * It includes functions for validating user input, such as email addresses, passwords, and other form fields.
 *
 * Requirements Addressed:
 * - Enhance Efficiency (Technical Specification/1.3 System Objectives)
 *   - Reduce processing time and minimize errors in expense reporting and reimbursement workflows.
 *     By implementing client-side validation, we reduce the number of invalid submissions to the server,
 *     thereby minimizing errors and improving the efficiency of the application's workflows.
 *
 * Dependencies:
 * - Internal:
 *   - useAuthContext (from './contexts') - To access authentication context for validation purposes.
 *   - useFetchData (from './hooks') - To fetch necessary data for validation checks.
 *   - API_BASE_URL (from '../../../utils/constants') - To use as the base URL for API requests during validation.
 * - External:
 *   - lodash (version 4.17.21) - To provide utility functions for data manipulation and validation.
 */

import { useAuthContext } from './contexts';
import { useFetchData } from './hooks';
import { API_BASE_URL } from '../../../utils/constants';

import _ from 'lodash'; // lodash version 4.17.21

/**
 * Validates if the provided string is a valid email address.
 *
 * This function ensures that the email input adheres to the standard email format,
 * reducing errors in user authentication and communication workflows.
 *
 * Requirements Addressed:
 * - Enhance Efficiency (Technical Specification/1.3 System Objectives)
 *   - Reduce processing time and minimize errors in expense reporting and reimbursement workflows.
 *     By validating email addresses on the client-side, we prevent invalid data from being submitted,
 *     thereby reducing server-side processing and potential errors.
 *
 * @param email - The email address to validate.
 * @returns True if the email is valid, otherwise false.
 */
export function validateEmail(email: string): boolean {
  // Step 1: Receive the email as a parameter.
  // The 'email' parameter is received from the user input.

  // Step 2: Use a regular expression to check the email format.
  // Regular expression for validating an email address.
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Using lodash to trim the email input to remove any leading/trailing whitespace.
  const trimmedEmail: string = _.trim(email);

  // Step 3: Return true if the email matches the pattern, otherwise return false.
  const isValid: boolean = emailRegex.test(trimmedEmail);

  return isValid;
}

/**
 * Ensures the password meets security requirements such as length and character variety.
 *
 * This function validates the strength of the user's password to enhance security measures,
 * preventing weak passwords and unauthorized access.
 *
 * Requirements Addressed:
 * - Enhance Efficiency (Technical Specification/1.3 System Objectives)
 *   - Reduce processing time and minimize errors in expense reporting and reimbursement workflows.
 *     By validating passwords on the client-side, we minimize authentication errors and enhance security,
 *     contributing to overall system efficiency.
 *
 * @param password - The password string to validate.
 * @returns True if the password is valid, otherwise false.
 */
export function validatePassword(password: string): boolean {
  // Step 1: Receive the password as a parameter.
  // The 'password' parameter is received from the user input.

  // Step 2: Check if the password meets the minimum length requirement.
  const MIN_LENGTH: number = 8; // Minimum password length requirement.

  if (password.length < MIN_LENGTH) {
    return false;
  }

  // Step 3: Ensure the password contains a mix of letters, numbers, and special characters.
  // Regular expressions to check for the presence of required character types.
  const hasUpperCase: boolean = /[A-Z]/.test(password);
  const hasLowerCase: boolean = /[a-z]/.test(password);
  const hasNumbers: boolean = /[0-9]/.test(password);
  const hasSpecialChars: boolean = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Step 4: Return true if all conditions are met, otherwise return false.
  const isValid: boolean = hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;

  return isValid;
}