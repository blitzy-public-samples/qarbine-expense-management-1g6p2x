// Middleware functions for authenticating and authorizing requests in the expense management service,
// ensuring secure access control based on JWTs and user roles.

// Requirements Addressed:
// - User Authentication and Authorization
//   Location: Technical Specification/13.1 User Authentication and Authorization
//   Description: Manage secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.

// Importing external dependencies
// jsonwebtoken version 8.5.1
import jwt from 'jsonwebtoken'; // Version 8.5.1

import { Request, Response, NextFunction } from 'express';

// Importing internal dependencies
// verifyToken function from src/backend/authentication-service/src/utils/jwt.ts
import { verifyToken } from '../../../authentication-service/src/utils/jwt';

// authenticate middleware from src/backend/authentication-service/src/middlewares/authMiddleware.ts
import {
  authenticate as authServiceAuthenticate,
  authorize as authServiceAuthorize,
} from '../../../authentication-service/src/middlewares/authMiddleware';

// Middleware to authenticate requests using JWTs.
// Ensures that users are authenticated before accessing protected routes.
// Addresses: User Authentication and Authorization (Technical Specification/13.1)

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  // Extract the token from the request headers.
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided, send an error response indicating authentication failure.
  if (!token) {
    return res.status(401).json({ message: 'Authentication token is missing.' });
  }

  try {
    // Verify the token using the verifyToken function.
    const decodedUser = verifyToken(token);

    // If verification is successful, attach the decoded user information to the request object.
    req.user = decodedUser;

    // Call next() to pass control to the next middleware or route handler.
    next();
  } catch (error) {
    // If verification fails, send an error response indicating authentication failure.
    res.status(401).json({ message: 'Invalid or expired authentication token.' });
  }
}

// Middleware to authorize requests based on user roles.
// Ensures that only authorized users can perform specific actions based on their roles.
// Addresses: User Authentication and Authorization (Technical Specification/13.1)

export function authorize(roles: string[]) {
  // Return a middleware function that takes req, res, and next as parameters.
  return (req: Request, res: Response, next: NextFunction): void => {
    // Check if the user role attached to the request object is included in the allowed roles.
    if (req.user && roles.includes(req.user.role)) {
      // If the user role is authorized, call next() to pass control to the next middleware or route handler.
      next();
    } else {
      // If the user role is not authorized, send an error response indicating authorization failure.
      res.status(403).json({ message: 'You do not have permission to perform this action.' });
    }
  };
}

// Note:
// This middleware relies on the verifyToken function from the authentication service to validate JWTs.
// It ensures compliance with company policies on secure user authentication and authorization as specified in:
// Technical Specification/13.1 User Authentication and Authorization.