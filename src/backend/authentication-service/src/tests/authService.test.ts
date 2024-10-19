// Unit tests for the authentication service, focusing on user registration, login, and JWT token management functionalities.

import { registerUser, loginUser } from '../services/authService';
import * as passwordHash from '../utils/passwordHash';
import * as jwtUtils from '../utils/jwt';
import { User } from '../models/userModel';

import bcrypt from 'bcrypt'; // version 5.0.1
import jwt from 'jsonwebtoken'; // version 8.5.1

describe('Authentication Service Tests', () => {
    /**
     * Tests the user registration functionality of the authService.
     * 
     * Requirements Addressed:
     * - "User Authentication and Authorization" in "Technical Specification/13.1 User Authentication and Authorization"
     *   - Manages secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.
     * 
     * This test ensures that new users can register successfully, and that their passwords are securely hashed.
     * Steps:
     * 1. Mock the User model to simulate database interactions.
     * 2. Call the registerUser function with test data.
     * 3. Verify that the password is hashed using the hashPassword function.
     * 4. Check that a new User instance is created and saved.
     * 5. Assert that the returned user object matches the expected structure.
     */
    describe('registerUser', () => {
        it('should register a new user successfully', async () => {
            // Arrange
            const testData = {
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
                role: 'employee',
            };

            // Mock the hashPassword function
            const hashPasswordMock = jest.spyOn(passwordHash, 'hashPassword').mockResolvedValue('hashedPassword');

            // Mock the User.create method
            const userCreateMock = jest.spyOn(User, 'create').mockResolvedValue({
                id: 1,
                username: testData.username,
                email: testData.email,
                password: 'hashedPassword',
                role: testData.role,
            });

            // Act
            const result = await registerUser(
                testData.username,
                testData.email,
                testData.password,
                testData.role
            );

            // Assert
            // Verify that the password is hashed using the hashPassword function
            expect(passwordHash.hashPassword).toHaveBeenCalledWith(testData.password);

            // Check that a new User instance is created and saved
            expect(User.create).toHaveBeenCalledWith({
                username: testData.username,
                email: testData.email,
                password: 'hashedPassword',
                role: testData.role,
            });

            // Assert that the returned user object matches the expected structure
            expect(result).toHaveProperty('id', 1);
            expect(result).toHaveProperty('username', testData.username);
            expect(result).toHaveProperty('email', testData.email);
            expect(result).toHaveProperty('role', testData.role);

            // Clean up mocks
            hashPasswordMock.mockRestore();
            userCreateMock.mockRestore();
        });
    });

    /**
     * Tests the user login functionality of the authService.
     * 
     * Requirements Addressed:
     * - "User Authentication and Authorization" in "Technical Specification/13.1 User Authentication and Authorization"
     *   - Manages secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.
     * 
     * This test ensures that users can log in successfully by verifying their password and receiving a JWT.
     * Steps:
     * 1. Mock the User model to simulate database interactions.
     * 2. Call the loginUser function with test data.
     * 3. Verify that the password is checked using the verifyPassword function.
     * 4. Check that a JWT is generated using the createToken function.
     * 5. Assert that the returned object contains user details and a valid JWT.
     */
    describe('loginUser', () => {
        it('should log in a user successfully and return a JWT', async () => {
            // Arrange
            const testData = {
                email: 'testuser@example.com',
                password: 'password123',
            };

            const userData = {
                id: 1,
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'hashedPassword',
                role: 'employee',
            };

            // Mock the User.findOne method
            const userFindOneMock = jest.spyOn(User, 'findOne').mockResolvedValue(userData);

            // Mock the verifyPassword function
            const verifyPasswordMock = jest.spyOn(passwordHash, 'verifyPassword').mockResolvedValue(true);

            // Mock the createToken function
            const createTokenMock = jest.spyOn(jwtUtils, 'createToken').mockReturnValue('jwtToken');

            // Act
            const result = await loginUser(
                testData.email,
                testData.password
            );

            // Assert
            // Verify that the password is checked using the verifyPassword function
            expect(passwordHash.verifyPassword).toHaveBeenCalledWith(testData.password, userData.password);

            // Check that a JWT is generated using the createToken function
            expect(jwtUtils.createToken).toHaveBeenCalledWith({ id: userData.id, role: userData.role });

            // Assert that the returned object contains user details and a valid JWT
            expect(result).toHaveProperty('user');
            expect(result.user).toHaveProperty('id', userData.id);
            expect(result.user).toHaveProperty('username', userData.username);
            expect(result.user).toHaveProperty('email', userData.email);
            expect(result.user).toHaveProperty('role', userData.role);
            expect(result).toHaveProperty('token', 'jwtToken');

            // Clean up mocks
            userFindOneMock.mockRestore();
            verifyPasswordMock.mockRestore();
            createTokenMock.mockRestore();
        });
    });
});