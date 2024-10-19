// Internal dependencies

// Interacts with the User model for user data management.
import User, { IUser } from '../models/userModel';

// Generates JWTs for authenticated users.
import { createToken } from '../utils/jwt';

// Hashes passwords for secure storage and verifies passwords against stored hashes.
import { hashPassword, verifyPassword } from '../utils/passwordHash';

/**
 * Registers a new user by creating a user record and hashing the password.
 * 
 * **Requirements Addressed:**
 * - **User Authentication and Authorization**
 * 
 * **Location in Documentation:**
 * - *Technical Specification* > **13.1 User Authentication and Authorization**
 *   - Manages secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.
 * 
 * @param username - The username of the new user.
 * @param email - The email address of the new user.
 * @param password - The plain text password provided by the user.
 * @param role - The role assigned to the new user.
 * @returns A promise that resolves to the newly created user object.
 */
export async function registerUser(
    username: string,
    email: string,
    password: string,
    role: string
): Promise<IUser> {
    try {
        // Step 1: Hash the provided password using the hashPassword function.
        // This ensures that passwords are stored securely, adhering to security best practices.
        const hashedPassword = await hashPassword(password);

        // Step 2: Create a new User instance with the username, email, hashed password, and role.
        // The User model interacts with the database to manage user data.
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });

        // Step 3: Save the User instance to the database.
        // This persists the new user in the database.
        const savedUser = await newUser.save();

        // Step 4: Return the saved User object.
        // The savedUser object contains the user's data as stored in the database.
        return savedUser;
    } catch (error: any) {
        // Handle errors during user registration.
        // Could log the error details for debugging purposes.
        throw new Error(`User registration failed: ${error.message}`);
    }
}

/**
 * Authenticates a user by verifying their password and generating a JWT.
 * 
 * **Requirements Addressed:**
 * - **User Authentication and Authorization**
 * 
 * **Location in Documentation:**
 * - *Technical Specification* > **13.1 User Authentication and Authorization**
 *   - Manages secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.
 * 
 * @param email - The email address of the user trying to log in.
 * @param password - The plain text password provided by the user.
 * @returns A promise that resolves to an object containing the user details and a JWT if authentication is successful.
 * @throws An error if authentication fails.
 */
export async function loginUser(
    email: string,
    password: string
): Promise<{ user: Partial<IUser>; token: string }> {
    try {
        // Step 1: Retrieve the user from the database using the provided email.
        const user = await User.findOne({ email });

        if (!user) {
            // If user is not found, throw an authentication error.
            throw new Error('Authentication failed: User not found.');
        }

        // Step 2: Verify the provided password against the stored password hash using the verifyPassword function.
        // This ensures that only users with the correct password can log in.
        const isPasswordValid = await verifyPassword(password, user.password);

        if (!isPasswordValid) {
            // If the password is invalid, throw an authentication error.
            throw new Error('Authentication failed: Incorrect password.');
        }

        // Step 3: If the password is valid, generate a JWT using the createToken function.
        // The JWT will be used for authenticating future requests.
        const token = createToken({ userId: user._id, role: user.role });

        // Step 4: Return an object containing the user details and the JWT.
        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            token: token,
        };
    } catch (error: any) {
        // Handle errors during user authentication.
        // Could log the error details for debugging purposes.
        throw new Error(`User authentication failed: ${error.message}`);
    }
}