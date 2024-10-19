# Approval Workflow Service

## Introduction

The Approval Workflow Service is a core component of the Global Employee Travel Expense Tracking App. It is designed to streamline the approval process for submitted expense reports with configurable workflows, batch processing, and delegation capabilities. This service ensures that expense approvals are handled efficiently, adhering to company policies and compliance requirements.

This service addresses the following requirement:

- **Requirement:** Approval Workflow
- **Description:** Streamline the approval process for submitted expense reports with configurable workflows, batch processing, and delegation capabilities.
- **Location:** Technical Specification - [13.4 Approval Workflow](#technical-specification-134-approval-workflow)

## Features

- **Configurable Multi-level Approval Workflows** (`TR-F004.1`): Allows customization of approval processes to match organizational hierarchies.
- **Batch Approval Capabilities for Managers** (`TR-F004.2`): Enables managers to approve multiple expense reports simultaneously, improving efficiency.
- **In-app Notifications for Pending Approvals** (`TR-F004.3`): Notifies managers of pending approvals to ensure timely processing.
- **Delegation of Approval Authority** (`TR-F004.5`): Supports delegation of approval responsibilities during manager absences.

## Architecture

The Approval Workflow Service is built using **Node.js** and **Express.js** (v4.17.1), following a modular architecture with the following components:

- **Models**
  - `approvalModel.ts`: Defines the schema for approval records and provides methods for interacting with the database using **Mongoose** (v5.13.8).
- **Controllers**
  - `approvalController.ts`: Handles HTTP requests related to approvals and invokes the appropriate services.
- **Services**
  - `approvalService.ts`: Contains the business logic for creating, updating, and retrieving approval records.
- **Routes**
  - `approvalRoutes.ts`: Defines the routing for approval-related operations.
- **Middlewares**
  - `authMiddleware.ts`: Ensures requests are authenticated and authorized based on user roles using **jsonwebtoken** (v8.5.1).
- **Utilities**
  - `notificationService.ts`: Handles sending notifications related to approval status updates using **nodemailer** (v6.6.3).

The service interacts with a **MongoDB** database to store approval records and uses external services for authentication and notifications.

## Prerequisites

- **Node.js**: v14.x or higher
- **MongoDB**: v4.x or higher
- **npm**: v6.x or higher

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-organization/expense-tracker.git
   ```

2. **Navigate to the Service Directory**

   ```bash
   cd src/backend/approval-workflow-service
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Configuration**

   - Create a `.env` file in the `src/backend/approval-workflow-service` directory with the following environment variables:

     ```env
     PORT=5000
     MONGODB_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret_key>
     ```

     > **Note:** The service uses `dotenv` (v8.2.0) to load environment variables.

5. **Build the Service**

   ```bash
   npm run build
   ```

6. **Run the Service**

   - For development with live reload using `nodemon`:

     ```bash
     npm run dev
     ```

   - For production:

     ```bash
     npm start
     ```

## Usage Guidelines

- **API Endpoints**

  The service exposes the following API endpoints:

  - `POST /api/approvals` - Create a new approval record.
    - **Handled by**: `createApprovalHandler` in `approvalController.ts`
    - **Requires**: Authentication and authorization (`authMiddleware.ts`)
    - **Description**: Allows managers to initiate the approval process for an expense report. Addresses `TR-F004.1` and `TR-F004.5`.

  - `GET /api/approvals/:id` - Retrieve an approval record by ID.
    - **Handled by**: `getApprovalHandler` in `approvalController.ts`
    - **Requires**: Authentication and authorization (`authMiddleware.ts`)
    - **Description**: Retrieves approval details. Addresses `TR-F004.3`.

  - `PUT /api/approvals/:id` - Update an approval record.
    - **Handled by**: `updateApprovalHandler` in `approvalController.ts`
    - **Requires**: Authentication and authorization (`authMiddleware.ts`)
    - **Description**: Allows managers to approve or reject expense reports, and to delegate approval authority. Addresses `TR-F004.2` and `TR-F004.5`.

- **Authentication and Authorization**

  - Uses `jsonwebtoken` (v8.5.1) for JWT authentication.
  - Middleware `authenticateRequest` and `authorizeRequest` in `authMiddleware.ts` ensure that only authorized users can access the endpoints.

- **Notifications**

  - Sends in-app and email notifications using `nodemailer` (v6.6.3) for pending approvals and status updates, as per `TR-F004.3`.

## Testing

- **Running Tests**

  The service uses `jest` for testing.

  ```bash
  npm run test
  ```

- **Test Configuration**

  - Test configuration is specified in `jest.config.js`.
  - Tests are located in the `tests` directory.

## Configuration

- **TypeScript Configuration**

  - The `tsconfig.json` file specifies the TypeScript compiler options for the service.

- **ESLint Configuration**

  - The `.eslintrc.js` file configures ESLint for code quality and consistency.

- **Prettier Configuration**

  - The `.prettierrc` file specifies code formatting rules using Prettier.

## Dependencies

- **Internal Dependencies**

  - `ApprovalModel` (`src/models/approvalModel.ts`): Defines the approval schema.
  - `notificationService` (`src/utils/notificationService.ts`): Handles notifications.
  - `authMiddleware` (`src/middlewares/authMiddleware.ts`): Manages authentication and authorization.
  - `approvalService` (`src/services/approvalService.ts`): Business logic for approvals.
  - `approvalController` (`src/controllers/approvalController.ts`): Handles HTTP requests.
  - `approvalRoutes` (`src/routes/approvalRoutes.ts`): Defines API routes.

- **External Dependencies**

  - `express` (v4.17.1): Web framework for handling HTTP requests.
  - `mongoose` (v5.13.8): ORM for interacting with MongoDB.
  - `nodemailer` (v6.6.3): Email sending library.
  - `jsonwebtoken` (v8.5.1): JWT implementation for authentication.
  - `dotenv` (v8.2.0): Loads environment variables from a `.env` file.

## Scripts

- **Start the Service**

  ```bash
  npm start
  ```

- **Build the Service**

  ```bash
  npm run build
  ```

- **Run Tests**

  ```bash
  npm run test
  ```

- **Development Mode**

  ```bash
  npm run dev
  ```

## Contributing

We welcome contributions to the Approval Workflow Service. Please follow the guidelines in `CONTRIBUTING.md` (if available).

## License

This project is licensed under the [MIT License](../../../../LICENSE).