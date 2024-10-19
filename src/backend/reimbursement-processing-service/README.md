# Reimbursement Processing Service

## Table of Contents
- [Introduction](#introduction)
- [Requirements Addressed](#requirements-addressed)
- [Architecture](#architecture)
  - [Dependencies](#dependencies)
    - [Internal Dependencies](#internal-dependencies)
    - [External Dependencies](#external-dependencies)
- [Setup Instructions](#setup-instructions)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Database Setup](#database-setup)
  - [Starting the Service](#starting-the-service)
- [Usage Guidelines](#usage-guidelines)
  - [API Endpoints](#api-endpoints)
    - [Create a New Reimbursement Request](#create-a-new-reimbursement-request)
    - [Process an Existing Reimbursement Request](#process-an-existing-reimbursement-request)
  - [Testing](#testing)
  - [Logging](#logging)
- [Contributing](#contributing)

## Introduction

The Reimbursement Processing Service automates the reimbursement process for approved expenses, integrating seamlessly with payroll systems and supporting multiple payment methods. It serves as a critical component of the Global Employee Travel Expense Tracking App, ensuring timely and accurate reimbursements to employees.

## Requirements Addressed

This service addresses the following requirement:

- **Reimbursement Processing**
  - **Location:** Technical Specification - [13.5 Reimbursement Processing](#)
  - **Description:** Automate the reimbursement process for approved expenses, integrating seamlessly with payroll systems and supporting multiple payment methods.

**Technical Requirements Addressed:**

- **TR-F005.1**
  - **Description:** Integrate with payroll systems for direct deposit reimbursements.
  - **Priority:** High

- **TR-F005.2**
  - **Description:** Support multiple reimbursement methods (e.g., payroll, separate bank transfer).
  - **Priority:** Medium

- **TR-F005.3**
  - **Description:** Automatically generate expense reports for finance team review.
  - **Priority:** High

By fulfilling these requirements, the service ensures efficient reimbursement processing, adhering to the specifications outlined in the technical documentation.

## Architecture

### Dependencies

#### Internal Dependencies

- **Reimbursement Model**
  - **Module:** `src/models/reimbursementModel.ts`
  - **Purpose:** Defines the data structure and operations for reimbursement entities.

- **Payment Processor Utility**
  - **Module:** `src/utils/paymentProcessor.ts`
  - **Purpose:** Handles payment processing for reimbursements.

- **Authentication Middleware**
  - **Module:** `src/middlewares/authMiddleware.ts`
  - **Purpose:** Ensures secure access to the reimbursement processing service by verifying JWT tokens.

- **Reimbursement Service**
  - **Module:** `src/services/reimbursementService.ts`
  - **Purpose:** Manages the core logic for processing reimbursements, including validation and status updates.

- **Payroll Integration Service**
  - **Module:** `src/services/payrollIntegrationService.ts`
  - **Purpose:** Integrates reimbursement data with payroll systems, fulfilling **TR-F005.1**.

- **Reimbursement Controller**
  - **Module:** `src/controllers/reimbursementController.ts`
  - **Purpose:** Handles HTTP requests related to reimbursements.

- **Reimbursement Routes**
  - **Module:** `src/routes/reimbursementRoutes.ts`
  - **Purpose:** Defines HTTP routes for reimbursement operations.

#### External Dependencies

- **Express** (`express`)
  - **Version:** 4.17.1
  - **Purpose:** Creates and manages HTTP routes and middleware.

- **Mongoose** (`mongoose`)
  - **Version:** 5.13.8
  - **Purpose:** Defines and interacts with the MongoDB database using schemas and models.

- **Stripe** (`stripe`)
  - **Version:** 8.174.0
  - **Purpose:** Processes payments and handles financial transactions, supporting **TR-F005.2**.

- **JSON Web Token** (`jsonwebtoken`)
  - **Version:** 8.5.1
  - **Purpose:** Verifies and decodes JWT tokens for authentication.

## Setup Instructions

### Installation

Run the following command to install all dependencies:

```bash
npm install
```

### Environment Configuration

Configure environment variables in a `.env` file based on `src/config/default.json`. Key variables include:

- `PORT`: The port number the service will run on.
- `MONGODB_URI`: Connection string for MongoDB.
- `JWT_SECRET`: Secret key for JWT authentication.
- `STRIPE_API_KEY`: API key for Stripe integration.
- `PAYROLL_SYSTEM_API_KEY`: Credentials for payroll system integration.

### Database

Ensure MongoDB is running and accessible with the credentials specified in the configuration files. Use the following command to start MongoDB if installed locally:

```bash
mongod
```

### Start

Use the following command to run the service in development mode:

```bash
npm start
```

## Usage Guidelines

### API Endpoints

#### Create a New Reimbursement Request

- **Path:** `/reimbursements`
- **Method:** `POST`
- **Description:** Creates a new reimbursement request.
- **Authentication:** JWT required

**Request Example:**

```http
POST /reimbursements HTTP/1.1
Host: example.com
Authorization: Bearer <token>
Content-Type: application/json

{
  "expenseReportId": "60d0fe4f5311236168a109ca",
  "paymentMethod": "Direct Deposit",
  "amount": 1500.00
}
```

#### Process an Existing Reimbursement Request

- **Path:** `/reimbursements/:id/process`
- **Method:** `PUT`
- **Description:** Processes an existing reimbursement request.
- **Authentication:** JWT required

**Request Example:**

```http
PUT /reimbursements/60d0fe4f5311236168a109cb/process HTTP/1.1
Host: example.com
Authorization: Bearer <token>
Content-Type: application/json
```

### Testing

Run the following command to execute unit tests using Jest:

```bash
npm test
```

Tests cover all critical functionalities, ensuring compliance with requirements such as **TR-F005.3**.

### Logging

Logs are stored in `/var/log/reimbursement-service.log`. Configure logging settings in the `default.json` file. Logging includes:

- HTTP request and response data
- Error stacks and messages
- Payment processing statuses

## Contributing

Please follow the contribution guidelines outlined in the main repository README for submitting issues and pull requests. Ensure all code adheres to the project's coding standards and includes necessary tests.