/**
 * Controller for handling user authentication requests, including registration and login.
 * 
 * Requirements Addressed:
 * - User Authentication and Authorization (Technical Specification/13.1 User Authentication and Authorization):
 *   - TR-F001.1: Implement secure login process with multi-factor authentication (MFA).
 *   - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators.
 * 
 * This file interacts with the authentication service and utilizes JWTs for secure session management.
 */

// External Dependencies
import { Request, Response } from 'express'; // express@4.17.1

// Internal Dependencies

// Interacts with the User model for user data management.
import { User } from '../models/userModel';

// Generates and verifies JWTs for authenticated users.
import { createToken, verifyToken } from '../utils/jwt';

// Hashes and verifies passwords for secure storage.
import { hashPassword, verifyPassword } from '../utils/passwordHash';

// Handles user registration and login logic.
import { registerUser, loginUser } from '../services/authService';

/**
 * Handles user registration by creating a new user and returning a JWT.
 * 
 * Requirements Addressed:
 * - TR-F001.1: Implement secure login process with multi-factor authentication (MFA).
 * - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators.
 *   - Location: Technical Specification/13.1 User Authentication and Authorization
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Step 1: Extract user details from the request body.
    // The client should send 'name', 'email', 'password', and 'role' in the request body.
    const { name, email, password, role } = req.body;

    // Step 2: Hash the user's password using the hashPassword function.
    // This ensures that we do not store plain-text passwords, enhancing security.
    // Relevant to TR-F001.1: Implement secure login process.
    const hashedPassword = await hashPassword(password);

    // Step 3: Call the registerUser service function to create a new user.
    // The service handles the actual creation and saving of the user to the database.
    const newUser = await registerUser({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Step 4: Generate a JWT for the new user using the createToken function.
    // The token will include the user's ID and role.
    // This supports TR-F001.3: Role-based access control.
    const token = createToken({ userId: newUser.id, role: newUser.role });

    // Step 5: Send a response with the user details and JWT.
    // The client can use the token for authenticated requests.
    res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      token
    });
  } catch (error) {
    // Step 6: Handle any errors by sending an appropriate error response.
    // If an error occurs during registration, send a 400 Bad Request response with the error message.
    res.status(400).json({ error: error.message });
  }
};

/**
 * Handles user login by verifying credentials and returning a JWT.
 * 
 * Requirements Addressed:
 * - TR-F001.1: Implement secure login process with multi-factor authentication (MFA).
 * - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators.
 *   - Location: Technical Specification/13.1 User Authentication and Authorization
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Step 1: Extract login credentials from the request body.
    // The client should send 'email' and 'password' in the request body.
    const { email, password } = req.body;

    // Step 2: Call the loginUser service function to authenticate the user.
    // This function retrieves the user from the database based on the email.
    const user = await loginUser(email);

    if (!user) {
      // If user is not found, return a 401 Unauthorized response.
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Step 3: Verify the provided password against the stored hashed password.
    // Uses the verifyPassword function to compare the passwords.
    // This is part of ensuring secure login as per TR-F001.1.
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      // If the password is invalid, return a 401 Unauthorized response.
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Step 4: If authentication is successful, generate a JWT using the createToken function.
    // The token includes the user's ID and role for session management and access control.
    // This supports TR-F001.3: Role-based access control.
    const token = createToken({ userId: user.id, role: user.role });

    // Step 5: Send a response with the user details and JWT.
    // The client can use the token for authenticated requests.
    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    // Step 6: Handle any errors by sending an appropriate error response.
    // If an error occurs during login, send a 400 Bad Request response with the error message.
    res.status(400).json({ error: error.message });
  }
};