# Authentication Service

This document provides detailed instructions on setting up, configuring, and using the Authentication Service, which manages secure user authentication and authorization within the application. It ensures that only authorized users can perform specific actions based on their roles.

**Requirements Addressed:**

- **User Authentication and Authorization**  
  Manage secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.  
  *Location: Technical Specification/13.1 User Authentication and Authorization*

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Configuration Files](#configuration-files)
- [Usage](#usage)
  - [Scripts](#scripts)
  - [Running the Service](#running-the-service)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
  - [Internal Dependencies](#internal-dependencies)
  - [External Dependencies](#external-dependencies)
- [Security Considerations](#security-considerations)
- [Testing](#testing)
- [License](#license)

## Overview

The Authentication Service is responsible for handling user registration, login, authentication, and authorization processes. It manages user credentials securely, provides JSON Web Tokens (JWT) for session management, and enforces role-based access control (RBAC).

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** v14.x or newer
- **npm** v6.x or newer
- **Git**

### Installation

Clone the repository and navigate to the authentication service directory:

```bash
git clone https://github.com/yourorganization/yourrepository.git
cd src/backend/authentication-service
```

Install the dependencies:

```bash
npm install
```

## Configuration

### Environment Variables

The service uses environment variables for configuration. Create a `.env` file in the `src/backend/authentication-service` directory with the following variables:

- `PORT`: The port number on which the service will run (default: `3000`).
- `JWT_SECRET`: A secret key used for signing JSON Web Tokens.
- `TOKEN_EXPIRATION`: The duration for which a JWT is valid (e.g., `'1h'` for one hour).

### Configuration Files

The service provides configuration files for different environments located in the `src/config` directory:

- `default.json`
- `development.json`
- `production.json`

These files contain configuration settings that can be customized per environment.

## Usage

### Scripts

The following npm scripts are available:

- **Start the service in development mode:**

  ```bash
  npm run dev
  ```

- **Start the service in production mode:**

  ```bash
  npm start
  ```

- **Run tests:**

  ```bash
  npm test
  ```

### Running the Service

To start the Authentication Service, use the following command:

```bash
npm run dev
```

The service will start on the port specified in the environment variables or `3000` by default.

## Project Structure

```
src/
├── app.ts
├── index.ts
├── config/
│   ├── default.json
│   ├── development.json
│   └── production.json
├── controllers/
│   └── authController.ts
├── middlewares/
│   └── authMiddleware.ts
├── models/
│   └── userModel.ts
├── routes/
│   └── authRoutes.ts
├── services/
│   └── authService.ts
├── tests/
│   ├── authController.test.ts
│   └── authService.test.ts
├── utils/
│   ├── jwt.ts
│   └── passwordHash.ts
```

- **`app.ts`**: Initializes the Express application with middleware and routes.
- **`index.ts`**: Starts the Express server on the specified port.
- **`config/`**: Contains configuration files for different environments.
- **`controllers/`**: Handles incoming HTTP requests and responses.
- **`middlewares/`**: Contains authentication and authorization middleware.
- **`models/`**: Defines data models and interfaces.
- **`routes/`**: Configures the API endpoints.
- **`services/`**: Contains the business logic for authentication.
- **`tests/`**: Includes unit and integration tests.
- **`utils/`**: Utility functions for token generation and password hashing.

## API Endpoints

The Authentication Service exposes the following endpoints:

- **POST `/api/auth/register`**: Registers a new user.
- **POST `/api/auth/login`**: Authenticates a user and returns a JWT.

Refer to the API documentation for detailed information on each endpoint.

## Dependencies

### Internal Dependencies

The service relies on the following internal modules:

- **`userModel.ts`**  
  Module: `src/models/userModel.ts`  
  Defines the User model for managing user data.

- **`createToken` and `verifyToken`**  
  Module: `src/utils/jwt.ts`  
  Generates and verifies JSON Web Tokens for authenticated users.

- **`hashPassword` and `verifyPassword`**  
  Module: `src/utils/passwordHash.ts`  
  Provides functions to hash passwords for secure storage and verify passwords during login.

- **`authenticate` and `authorize`**  
  Module: `src/middlewares/authMiddleware.ts`  
  Middleware to authenticate requests using JWTs and authorize based on user roles.

- **`registerUser` and `loginUser`**  
  Module: `src/services/authService.ts`  
  Handles business logic for user registration and authentication.

- **`register` and `login`**  
  Module: `src/controllers/authController.ts`  
  Handles user registration and login HTTP requests.

- **`setupRoutes`**  
  Module: `src/routes/authRoutes.ts`  
  Configures the authentication routes for the application.

- **`initializeApp`**  
  Module: `src/app.ts`  
  Sets up the Express application with middleware and routes.

- **`startServer`**  
  Module: `src/index.ts`  
  Starts the Express server on the specified port.

### External Dependencies

The service uses the following external modules:

- **Express**  
  Module: `express`  
  Version: 4.17.1  
  Used for creating the Express application and handling HTTP requests.

- **bcrypt**  
  Module: `bcrypt`  
  Version: 5.0.1  
  Used for hashing passwords and verifying password hashes.

- **jsonwebtoken**  
  Module: `jsonwebtoken`  
  Version: 8.5.1  
  Used for creating, signing, and verifying JSON Web Tokens.

## Security Considerations

The Authentication Service implements the following security features:

- **Password Hashing**: Uses `bcrypt` to securely hash user passwords before storing them in the database.

- **Token-Based Authentication**: Issues JWTs to authenticated users for session management.

- **Role-Based Access Control (RBAC)**: Enforces access control based on user roles defined in the application.

- **Input Validation**: Validates all user inputs to prevent SQL injection and other security vulnerabilities.

These features address the requirements specified in:

- **Technical Specification/13.1 User Authentication and Authorization**

## Testing

Unit and integration tests are located in the `src/tests` directory. To run the tests, use:

```bash
npm test
```

Ensure that all tests pass before deploying the service.

## License

This project is licensed under the MIT License. See the [LICENSE](../../../../LICENSE) file for details.