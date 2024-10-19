/**
 * Middleware functions for authenticating and authorizing requests in the reporting analytics service,
 * ensuring secure access control based on JWTs and user roles.
 *
 * This module addresses the following requirements:
 * - **User Authentication and Authorization**
 *   - *Location*: Technical Specification/13.1 User Authentication and Authorization
 *   - *Description*: Manage secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.
 */

import { Request, Response, NextFunction } from 'express';

// External Dependencies

// Importing jsonwebtoken library (version 8.5.1) for JWT handling.
/* Version: 8.5.1 */
import jwt from 'jsonwebtoken';

// Internal Dependencies

// Importing verifyToken function to verify the authenticity of JWTs.
import { verifyToken } from '../../../authentication-service/src/utils/jwt';

// Importing User model for user data management.
import User from '../../../authentication-service/src/models/userModel';

/**
 * Interface representing the decoded JWT payload.
 */
interface UserPayload {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Extending Express Request interface to include user information.
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

/**
 * Middleware to authenticate requests using JWTs.
 *
 * **Addresses:**
 * - *Requirement*: User Authentication and Authorization
 *   - *Location*: Technical Specification/13.1 User Authentication and Authorization
 *   - *Description*: Ensure that only authenticated users can access the reporting and analytics service.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Next middleware function.
 * @returns Calls next() if authentication is successful, otherwise sends an error response.
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Step 1: Extract the token from the request headers.
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      // If no token is provided, send an error response indicating authentication failure.
      return res.status(401).json({ message: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1]; // Expected format: 'Bearer <token>'

    // Step 2: Verify the token using the verifyToken function.
    const decoded = verifyToken(token) as UserPayload;

    // Step 3: If verification is successful, attach the decoded user information to the request object.
    req.user = decoded;

    // Step 4: Call next() to pass control to the next middleware or route handler.
    next();
  } catch (error) {
    // Step 5: If verification fails, send an error response indicating authentication failure.
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * Middleware to authorize requests based on user roles.
 *
 * **Addresses:**
 * - *Requirement*: User Authentication and Authorization
 *   - *Location*: Technical Specification/13.1 User Authentication and Authorization
 *   - *Description*: Ensure that only users with appropriate roles can access specific resources in the reporting analytics service.
 *
 * @param roles - An array of roles that are authorized to access the resource.
 * @returns A middleware function that checks if the user has one of the specified roles.
 */
export const authorize = (roles: string[]) => {
  // Return a middleware function that takes req, res, and next as parameters.
  return (req: Request, res: Response, next: NextFunction): void => {
    // Step 1: Check if the user role attached to the request object is included in the allowed roles.
    if (!req.user || !roles.includes(req.user.role)) {
      // Step 4: If the user role is not authorized, send an error response indicating authorization failure.
      return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    }
    // Step 2: If the user role is authorized, call next() to pass control to the next middleware or route handler.
    next();
  };
};