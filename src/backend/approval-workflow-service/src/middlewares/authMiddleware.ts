/**
 * Middleware functions for authenticating and authorizing requests in the approval workflow service.
 * Ensures secure access control based on JWTs and user roles.
 *
 * Requirements Addressed:
 * - Name: Approval Workflow
 * - Description: Streamline the approval process for submitted expense reports with configurable workflows, batch processing, and delegation capabilities.
 * - Location: Technical Specification/13.4 Approval Workflow
 *
 * By implementing authentication and authorization middleware, we ensure that only authorized users can access and interact with the approval workflows, thereby enhancing security and compliance with company policies.
 */

import { Request, Response, NextFunction } from 'express';

// External dependencies
// 'jsonwebtoken' package used for creating, signing, and verifying JSON Web Tokens.
// Version: 8.5.1
import jwt from 'jsonwebtoken'; // version 8.5.1

// Secret key used for signing tokens (should be stored securely)
// For demonstration purposes, using a placeholder here
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

/**
 * Utility function to verify JWTs.
 *
 * Description:
 * Verifies the authenticity and integrity of a JWT using the jsonwebtoken library.
 * Decodes the token and returns the decoded user information if valid.
 *
 * Requirements:
 * - Ensures secure token verification to authenticate users.
 * - Requirement ID: TR-F001.1
 * - Location: Technical Specification/13.1 User Authentication and Authorization
 *
 * @param token - JSON Web Token string
 * @returns Decoded user object
 * @throws Error if token is invalid or expired
 */
function verifyToken(token: string) {
    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        // Throw an error if verification fails
        throw new Error('Invalid or expired token.');
    }
}

/**
 * Middleware to authenticate requests using JWTs.
 *
 * Description:
 * Validates the JSON Web Token provided in the request headers.
 * If the token is valid, attaches the decoded user information to the request object.
 * Ensures that only authenticated users can access protected routes.
 *
 * Steps:
 * 1. Extract the token from the request headers.
 * 2. Verify the token using the 'verifyToken' function.
 * 3. If verification is successful, attach the decoded user information to the request object.
 * 4. Call next() to pass control to the next middleware or route handler.
 * 5. If verification fails, send an error response indicating authentication failure.
 *
 * Requirements Addressed:
 * - Enforces secure user access control based on JWTs.
 * - Requirement ID: TR-F001.1, TR-F001.3
 * - Location: Technical Specification/13.1 User Authentication and Authorization
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - NextFunction
 */
export function authenticateRequest(req: Request, res: Response, next: NextFunction): void {
    // Extract the token from the request headers (Authorization: 'Bearer <token>')
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        // If the Authorization header is missing, send an authentication error
        return res.status(401).json({ message: 'Authorization header is missing.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part

    if (!token) {
        // If the token is missing, send an authentication error
        return res.status(401).json({ message: 'Authentication token not found.' });
    }

    try {
        // Verify the token using the 'verifyToken' function
        const decodedUser = verifyToken(token);

        // Attach the decoded user information to the request object
        (req as any).user = decodedUser;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If verification fails, send an error response indicating authentication failure
        res.status(403).json({ message: 'Invalid or expired authentication token.' });
    }
}

/**
 * Middleware to authorize requests based on user roles.
 *
 * Description:
 * Checks if the authenticated user has one of the specified roles required to access the resource.
 * Ensures that only users with appropriate permissions can access certain routes or perform specific actions.
 *
 * Steps:
 * 1. Return a middleware function that takes req, res, and next as parameters.
 * 2. Check if the user role attached to the request object is included in the allowed roles.
 * 3. If the user role is authorized, call next() to pass control to the next middleware or route handler.
 * 4. If the user role is not authorized, send an error response indicating authorization failure.
 *
 * Requirements Addressed:
 * - Implements role-based access control.
 * - Requirement ID: TR-F001.3
 * - Location: Technical Specification/13.1 User Authentication and Authorization
 *
 * @param roles - An array of roles that are allowed to access the route
 * @returns Middleware function
 */
export function authorizeRequest(roles: string[]) {
    // Return a middleware function
    return (req: Request, res: Response, next: NextFunction): void => {
        // Ensure that the user information is available
        const user = (req as any).user;

        if (!user) {
            // If user information is not attached to the request, send an authorization error
            return res.status(401).json({ message: 'User not authenticated.' });
        }

        const userRole = user.role;

        if (!userRole) {
            // If user role is not found, send an authorization error
            return res.status(403).json({ message: 'User role not found.' });
        }

        // Check if the user's role is included in the allowed roles
        if (roles.includes(userRole)) {
            // If authorized, proceed to the next middleware or route handler
            next();
        } else {
            // If not authorized, send an error response indicating authorization failure
            res.status(403).json({ message: 'Access denied: insufficient permissions.' });
        }
    };
}