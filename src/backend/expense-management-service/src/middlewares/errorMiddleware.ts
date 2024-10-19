// Middleware for handling errors within the expense management service.
// This middleware captures errors that occur during request processing
// and sends appropriate HTTP responses, ensuring consistent error handling
// across the service.

// Requirements Addressed:
// - Error Handling
//   Location: Technical Specification -> System Architecture -> API Layer -> Expense Management Service
//   Description: Ensure consistent and comprehensive error handling across all service operations.

// Importing necessary modules from Express (version ^4.17.1)
import { Request, Response, NextFunction } from 'express'; // Express types (version ^4.17.1)

/**
 * Error handler middleware function to handle errors during request processing.
 *
 * @param {any} err - The error object caught during request processing.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    // Step 1: Log the error using a logging mechanism.
    // TODO: Integrate with enterprise logging system as per section 7.2.3 of the Technical Specification.
    console.error('Error occurred:', err);

    // Step 2: Check if the error has a status code; if not, set it to 500 (Internal Server Error).
    const statusCode = err.statusCode || 500;

    // Step 3: Send an HTTP response with the error status code and message.
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: err.message || 'Internal Server Error',
    });

    // Step 4: Call next() to pass control to the next middleware if necessary.
    // In standard error handling middleware, calling next() is not required.
}