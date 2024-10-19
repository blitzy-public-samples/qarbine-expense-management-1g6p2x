// Utility functions for creating and verifying JSON Web Tokens (JWTs) within the authentication service, ensuring secure token management.

// **Requirements Addressed:** 
// - User Authentication and Authorization
//   - Location: Technical Specification/13.1 User Authentication and Authorization
//   - Description: Manage secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.

// Import external dependencies

// Import 'jsonwebtoken' library for handling JWTs.
// Version: 8.5.1
import jwt from 'jsonwebtoken'; // Version 8.5.1

// Import internal dependencies

// Import the User model to interact with user data.
import { User } from '../models/userModel';

// Globals

// JWT_SECRET: A secret key used for signing JSON Web Tokens, typically loaded from environment variables.
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable not set');
}

// TOKEN_EXPIRATION: The duration for which a JWT is valid, e.g., '1h' for one hour.
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '1h';

/**
 * Generates a JSON Web Token for a given user.
 *
 * **Requirements Addressed:**
 * - User Authentication and Authorization
 *   - Location: Technical Specification/13.1 User Authentication and Authorization
 *   - Description: Manage secure user access and permissions within the application.
 *
 * @param user - The user object containing user information.
 * @returns A signed JWT for the user.
 */
export function createToken(user: User): string {
  // Extract user information needed for the token payload.
  const payload = {
    userId: user.id,
    role: user.role,
    // Additional claims can be added here as needed.
  };

  // Sign the token using the jsonwebtoken library with the JWT_SECRET and TOKEN_EXPIRATION.
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });

  // Return the signed JWT.
  return token;
}

/**
 * Verifies the authenticity of a given JSON Web Token.
 *
 * **Requirements Addressed:**
 * - User Authentication and Authorization
 *   - Location: Technical Specification/13.1 User Authentication and Authorization
 *   - Description: Ensure that only authorized users can perform specific actions based on their roles.
 *
 * @param token - The JWT token string to verify.
 * @returns The decoded token payload if verification is successful.
 * @throws An error indicating invalid token if verification fails.
 */
export function verifyToken(token: string): any {
  try {
    // Use the jsonwebtoken library to verify the token with the JWT_SECRET.
    const decoded = jwt.verify(token, JWT_SECRET);

    // If verification is successful, return the decoded token payload.
    return decoded;
  } catch (error) {
    // If verification fails, throw an error indicating invalid token.
    throw new Error('Invalid token');
  }
}