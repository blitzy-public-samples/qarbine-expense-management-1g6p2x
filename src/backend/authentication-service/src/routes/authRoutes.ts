// Importing express Router from express 4.17.1
import { Router } from 'express'; // Version 4.17.1

// Import controller functions for handling authentication logic
import { register, login } from '../controllers/authController';

// Import authenticate middleware to secure routes after authentication
import { authenticate } from '../middlewares/authMiddleware';

/*
 * Auth Routes
 * Defines the routes for user authentication, including registration and login,
 * utilizing controllers and middleware for handling requests and ensuring secure access.
 *
 * Requirements addressed:
 * - User Authentication and Authorization (Technical Specification/13.1 User Authentication and Authorization)
 *   - Description: Manage secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.
 */

/**
 * Configures the authentication routes for the application.
 *
 * @param router - Express Router object to configure routes on.
 * @returns void - Sets up the routes on the provided router object.
 *
 * Steps:
 * 1. Create a new router instance using express.Router().
 * 2. Define a POST route for '/register' that uses the register controller function.
 *    - Addresses Requirement: TR-F001.1 (Implement secure login process with MFA)
 *      Location: Technical Specification/13.1 User Authentication and Authorization
 * 3. Define a POST route for '/login' that uses the login controller function.
 *    - Addresses Requirement: TR-F001.1 (Implement secure login process with MFA)
 *      Location: Technical Specification/13.1 User Authentication and Authorization
 * 4. Apply the authenticate middleware to routes that require authentication.
 *    - Addresses Requirement: TR-F001.3 (Role-based access control)
 *      Location: Technical Specification/13.1 User Authentication and Authorization
 * 5. Attach the authRouter to the provided router.
 */
export function setupRoutes(router: Router): void {
    // Step 1: Create a new router instance using express.Router()
    const authRouter = Router();

    // Step 2: Define a POST route for '/register' that uses the register controller function
    // This route allows new users to register an account
    // Requirement Addressed: TR-F001.1 (Implement secure login process with MFA)
    // Location: Technical Specification/13.1 User Authentication and Authorization
    authRouter.post('/register', register);

    // Step 3: Define a POST route for '/login' that uses the login controller function
    // This route allows existing users to log in and receive authentication tokens
    // Requirement Addressed: TR-F001.1 (Implement secure login process with MFA)
    // Location: Technical Specification/13.1 User Authentication and Authorization
    authRouter.post('/login', login);

    // Step 4: Apply the authenticate middleware to routes that require authentication
    // Any routes defined after this middleware will require the requester to be authenticated
    // Requirement Addressed: TR-F001.3 (Role-based access control)
    // Location: Technical Specification/13.1 User Authentication and Authorization
    authRouter.use(authenticate);

    // Step 5: Attach the authRouter to the provided router under '/auth' path
    router.use('/auth', authRouter);
}

// Export the setupRoutes function for use in the application
export { setupRoutes };