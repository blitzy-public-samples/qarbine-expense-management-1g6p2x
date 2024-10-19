// Middleware functions for authenticating and authorizing requests in the reimbursement processing service.
// Ensures secure access control based on JWTs and user roles.

// Requirements Addressed:
// - User Authentication and Authorization
//   - Location: Technical Specification/13.1 User Authentication and Authorization
//   - Description: Manage secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; // jsonwebtoken version 8.5.1
import { verifyToken } from '../../../authentication-service/src/utils/jwt';
import { User } from '../../../authentication-service/src/models/userModel';

// Extend the Request interface to include user information
interface AuthenticatedRequest extends Request {
  user?: User;
}

/**
 * Middleware to authenticate requests using JWTs.
 *
 * Addresses:
 * - User Authentication and Authorization
 *   - Location: Technical Specification/13.1 User Authentication and Authorization
 *   - This middleware ensures that only authenticated users can access certain routes by verifying the provided JWT.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Next function to pass control to the next middleware
 */
export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  // Step 1: Extract the token from the request headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Assuming the format is 'Bearer <token>'

  if (!token) {
    // Step 5: If verification fails, send an error response indicating authentication failure
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  try {
    // Step 2: Verify the token using the verifyToken function
    const decoded = verifyToken(token);

    // Step 3: If verification is successful, attach the decoded user information to the request object
    req.user = decoded as User;

    // Step 4: Call next() to pass control to the next middleware or route handler
    next();
  } catch (error) {
    // Step 5: If verification fails, send an error response indicating authentication failure
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};

/**
 * Middleware to authorize requests based on user roles.
 *
 * Addresses:
 * - User Authentication and Authorization
 *   - Location: Technical Specification/13.1 User Authentication and Authorization
 *   - This middleware ensures that only users with the specified roles can access certain routes.
 *
 * @param roles - Array of roles allowed to access the route
 * @returns Middleware function that checks if the user has one of the specified roles
 */
export const authorize = (roles: string[]) => {
  // Return a middleware function that takes req, res, and next as parameters
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    // Step 1: Check if the user role attached to the request object is included in the allowed roles
    if (req.user && roles.includes(req.user.role)) {
      // Step 2: If the user role is authorized, call next() to pass control to the next middleware or route handler
      next();
    } else {
      // Step 3: If the user role is not authorized, send an error response indicating authorization failure
      return res.status(403).json({ message: 'Authorization failed: Access denied' });
    }
  };
};