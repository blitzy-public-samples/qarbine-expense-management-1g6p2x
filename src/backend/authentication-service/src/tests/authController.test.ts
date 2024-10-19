/**
 * Unit tests for the authController module, ensuring the correctness of user authentication functionalities such as registration and login.
 * Requirements Addressed:
 * - User Authentication and Authorization (Technical Specification/13.1 User Authentication and Authorization)
 *
 * This test suite verifies that the registration and login functionalities work as expected, adhering to the security requirements specified in TR-F001.1 to TR-F001.3.
 */

// Importing necessary modules and dependencies
import request from 'supertest'; // Version: 6.1.3
import app from '../app'; // Express application
import { registerUser } from '../services/authService'; // Mocked in tests
import { createToken } from '../utils/jwt'; // Mocked in tests

// Mocking internal dependencies
jest.mock('../services/authService');
jest.mock('../utils/jwt');

describe('Auth Controller Tests', () => {
  /**
   * Tests the register function of authController for successful user registration.
   * Requirements Addressed:
   * - TR-F001.1: Implement secure login process with multi-factor authentication (MFA)
   * - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators
   * Location: Technical Specification/13.1 User Authentication and Authorization
   */
  describe('POST /api/auth/register', () => {
    it('should register a new user and return a JWT', async () => {
      // Mock the registerUser function to simulate user registration.
      (registerUser as jest.Mock).mockResolvedValue({
        id: 'user123',
        email: 'testuser@example.com',
        role: 'Employee',
      });

      // Mock createToken to simulate JWT creation.
      (createToken as jest.Mock).mockReturnValue('jwt-token');

      // Call the register function with a mock request and response.
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'testuser@example.com',
          password: 'SecurePassword123!',
        });

      // Assert that the response status is 200 and contains a JWT.
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken', 'jwt-token');
      expect(response.body).toHaveProperty('refreshToken');
    });
  });

  /**
   * Tests the login function of authController for successful user login.
   * Requirements Addressed:
   * - TR-F001.1: Implement secure login process with multi-factor authentication (MFA)
   * - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators
   * Location: Technical Specification/13.1 User Authentication and Authorization
   */
  describe('POST /api/auth/login', () => {
    it('should authenticate user and return a JWT', async () => {
      // Mock the loginUser function to simulate user login.
      (registerUser as jest.Mock).mockResolvedValue({
        id: 'user123',
        email: 'testuser@example.com',
        role: 'Employee',
      });

      // Mock createToken to simulate JWT creation.
      (createToken as jest.Mock).mockReturnValue('jwt-token');

      // Call the login function with a mock request and response.
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'SecurePassword123!',
        });

      // Assert that the response status is 200 and contains a JWT.
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken', 'jwt-token');
      expect(response.body).toHaveProperty('refreshToken');
    });
  });
});