// Middleware functions for authenticating and authorizing requests in the authentication service.
// Ensures secure access control based on JWTs and user roles.

// External dependency for JWT operations (jsonwebtoken v8.5.1)
import jwt from 'jsonwebtoken'; // v8.5.1

// Internal function to verify JWT tokens
import { verifyToken } from '../utils/jwt';

// Internal User model for user data management
import User from '../models/userModel';

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to authenticate requests using JWTs.
 * 
 * Addresses Requirement:
 * - User Authentication and Authorization
 *   - Location: Technical Specification/13.1 User Authentication and Authorization
 *   - Description: Manage secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Next function to pass control to the next middleware
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Step 1: Extract the token from the request headers.
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            // If token is not present, send an error response indicating authentication failure.
            return res.status(401).json({ message: 'Authentication token missing' });
        }

        // Step 2: Verify the token using the verifyToken function.
        const decodedToken = verifyToken(token);

        // Step 3: If verification is successful, attach the decoded user information to the request object.
        req.user = decodedToken;

        // Step 4: Call next() to pass control to the next middleware or route handler.
        return next();
    } catch (error) {
        // Step 5: If verification fails, send an error response indicating authentication failure.
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
};

/**
 * Middleware to authorize requests based on user roles.
 * 
 * Addresses Requirement:
 * - User Authentication and Authorization
 *   - Location: Technical Specification/13.1 User Authentication and Authorization
 *   - Description: Manage secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.
 * 
 * @param roles - Array of roles allowed to access the route
 * @returns Middleware function that checks if the user has one of the specified roles.
 */
export const authorize = (roles: string[]) => {
    /**
     * Middleware function that checks if the user has one of the specified roles.
     * 
     * @param req - Express request object
     * @param res - Express response object
     * @param next - Next function to pass control to the next middleware
     */
    return (req: Request, res: Response, next: NextFunction): void => {
        // Step 1: Check if the user role attached to the request object is included in the allowed roles.
        if (req.user && roles.includes(req.user.role)) {
            // Step 2: If the user role is authorized, call next() to pass control to the next middleware or route handler.
            return next();
        } else {
            // Step 3: If the user role is not authorized, send an error response indicating authorization failure.
            return res.status(403).json({ message: 'Access denied: You do not have the required permissions' });
        }
    };
};