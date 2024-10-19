// Utility functions for hashing and verifying passwords within the authentication service,
// ensuring secure password management.

// This module addresses the following requirements:
// - Secure password handling as part of user authentication.
// - Ensuring that only authorized users can perform specific actions based on their roles.

// Relevant documentation:
// - Technical Specification/13.1 User Authentication and Authorization
//   - Technical Requirement ID: TR-F001.1 (Implement secure login process with multi-factor authentication)
// - Security Considerations
//   - Security Requirement ID: SEC-F003.4 (Enforce strong password policies, including complexity and expiration requirements)

// Importing bcrypt library (version 5.0.1) for hashing passwords and verifying password hashes.
import bcrypt from 'bcrypt'; // bcrypt@5.0.1

// Define the number of salt rounds for bcrypt.
// A higher number increases security but also increases the time required to hash passwords.
// This constant adheres to security best practices for password hashing as per
// Security Requirement ID: SEC-F003.4 (Enforce strong password policies)
// and aligns with Technical Specification/Security Considerations.
const SALT_ROUNDS = 12;

/**
 * Hashes a given password using bcrypt to ensure secure storage.
 *
 * This function addresses the requirement to securely store user passwords
 * to prevent unauthorized access, as specified in:
 * - Technical Specification/13.1 User Authentication and Authorization
 *   - Technical Requirement ID: TR-F001.1
 * - Security Considerations
 *   - Security Requirement ID: SEC-F003.4
 *
 * @param password - The plaintext password to be hashed.
 * @returns A Promise that resolves to a bcrypt hash of the password.
 */
export async function hashPassword(password: string): Promise<string> {
    // Generate a salt using bcrypt with a predefined number of salt rounds.
    // This enhances security by adding complexity to the hashed password.
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    // Hash the password using the generated salt.
    // bcrypt.hash combines the password and salt and applies the hashing algorithm multiple times.
    const hash = await bcrypt.hash(password, salt);

    // Return the resulting hash.
    return hash;
}

/**
 * Verifies a given password against a stored bcrypt hash.
 *
 * This function ensures that user authentication is performed securely,
 * allowing only authorized users to access the system, as specified in:
 * - Technical Specification/13.1 User Authentication and Authorization
 *   - Technical Requirement ID: TR-F001.1
 *
 * @param password - The plaintext password provided by the user.
 * @param hash - The stored bcrypt hash to compare against.
 * @returns A Promise that resolves to true if the password matches the hash, false otherwise.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    // Use bcrypt to compare the provided password with the stored hash.
    // bcrypt.compare returns true if the password matches, false otherwise.
    const isMatch = await bcrypt.compare(password, hash);

    // Return true if they match, false otherwise.
    return isMatch;
}