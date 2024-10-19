# Database Documentation

This document provides detailed instructions on how to set up, configure, and manage the database for the **Global Employee Travel Expense Tracking App**. It includes steps to initialize the database, run migrations, and seed initial data.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Database Configuration](#database-configuration)
- [Running Migrations](#running-migrations)
  - [Migration Scripts](#migration-scripts)
- [Seeding Data](#seeding-data)
  - [Seed Scripts](#seed-scripts)
- [Database Schema Overview](#database-schema-overview)
- [Dependencies](#dependencies)
  - [Internal Dependencies](#internal-dependencies)
  - [External Dependencies](#external-dependencies)
- [References](#references)

## Prerequisites

Before initializing the database, ensure that the following prerequisites are met:

- **PostgreSQL** is installed and running on your system.
- **Node.js** and **npm** are installed to manage dependencies.
- **Knex.js** is installed globally or locally in the project.

## Setup Instructions

Follow these steps to set up and initialize the database:

1. **Clone the Repository**

   Clone the repository and navigate to the database directory:

   ```bash
   git clone https://your-repo-url.git
   cd your-repo-url/src/database
   ```

2. **Install Dependencies**

   Install the required Node.js dependencies:

   ```bash
   npm install
   ```

3. **Configure Database Connection**

   Configure the database connection settings in `src/database/config/database.json`. Ensure the settings match your PostgreSQL configuration.

   ```json
   {
     "host": "localhost",
     "port": 5432,
     "database": "expense_tracking",
     "user": "your_database_user",
     "password": "your_database_password"
   }
   ```

4. **Run Migrations**

   Run the migration scripts using Knex to set up the database schema:

   ```bash
   npx knex migrate:latest --knexfile src/database/config/knexfile.js
   ```

5. **Seed Initial Data**

   Seed the database with initial data using the provided seed files:

   ```bash
   npx knex seed:run --knexfile src/database/config/knexfile.js
   ```

6. **Verify the Setup**

   Verify the database setup by checking the tables and initial data in PostgreSQL:

   ```bash
   psql -U your_database_user -d expense_tracking -c "\dt"
   ```

## Database Configuration

The database configuration is managed through the `database.json` file located in `src/database/config/`.

**File:** `src/database/config/database.json`

This file contains the connection settings for the PostgreSQL database.

**Note:** Ensure that your database credentials are secure and not committed to version control.

## Running Migrations

Database migrations are managed using **Knex.js**, which allows for version-controlled schema changes.

**Configuration File:** `src/database/config/knexfile.js`

To run all pending migrations:

```bash
npx knex migrate:latest --knexfile src/database/config/knexfile.js
```

### Migration Scripts

Below is a list of migration scripts, their purposes, and the requirements they address:

1. **20231001_initial_setup.sql**

   - **File:** `src/database/migrations/20231001_initial_setup.sql`
   - **Description:** Initial migration script to set up foundational database tables, including users, expenses, policies, approvals, reimbursements, and reports.
   - **Requirements Addressed:**
     - Establishes the initial database schema to support core functionalities.
     - **Location in Documentation:** `Technical Specification/System Architecture/Data Layer`

2. **20231002_add_user_roles.sql**

   - **File:** `src/database/migrations/20231002_add_user_roles.sql`
   - **Description:** Migration script to add user roles to the users table, enhancing authentication and authorization mechanisms.
   - **Requirements Addressed:**
     - Implements Role-Based Access Control (RBAC).
     - **Location in Documentation:** `Technical Specification/Features/13.1 User Authentication and Authorization`

3. **20231003_create_expense_tables.sql**

   - **File:** `src/database/migrations/20231003_create_expense_tables.sql`
   - **Description:** Creates tables related to expenses, including the expenses table.
   - **Requirements Addressed:**
     - Facilitates expense submission and management.
     - **Location in Documentation:** `Technical Specification/Features/13.2 Expense Submission`

4. **20231004_add_foreign_keys.sql**

   - **File:** `src/database/migrations/20231004_add_foreign_keys.sql`
   - **Description:** Adds foreign key constraints to ensure referential integrity between tables.
   - **Requirements Addressed:**
     - Ensures data integrity across database.
     - **Location in Documentation:** `Technical Specification/System Design/Database Design`

## Seeding Data

Seed files populate the database with initial data required for the application to function correctly.

To run seed scripts:

```bash
npx knex seed:run --knexfile src/database/config/knexfile.js
```

### Seed Scripts

1. **expenseCategorySeed.sql**

   - **File:** `src/database/seeds/expenseCategorySeed.sql`
   - **Description:** Populates the database with initial expense categories.
   - **Requirements Addressed:**
     - Provides predefined categories for expense submission.
     - **Location in Documentation:** `Technical Specification/Features/13.2 Expense Submission`

2. **policySeed.sql**

   - **File:** `src/database/seeds/policySeed.sql`
   - **Description:** Populates the policies table with initial data.
   - **Requirements Addressed:**
     - Establishes default expense policies for compliance enforcement.
     - **Location in Documentation:** `Technical Specification/Features/13.3 Policy and Compliance Engine`

3. **userSeed.sql**

   - **File:** `src/database/seeds/userSeed.sql`
   - **Description:** Populates the users table with initial user data.
   - **Requirements Addressed:**
     - Sets up initial user accounts and roles.
     - **Location in Documentation:** `Technical Specification/Features/13.1 User Authentication and Authorization`

## Database Schema Overview

The database schema consists of several tables that represent the core entities of the application:

- **Users:** Manages user information and roles.
- **Expenses:** Stores employee-submitted expenses.
- **Policies:** Manages expense policies.
- **Approvals:** Manages approval processes.
- **Reimbursements:** Processes reimbursements.
- **Reports:** Generates and stores reports.

**Schema Files:**

- `src/database/schemas/userSchema.sql`
- `src/database/schemas/expenseSchema.sql`
- `src/database/schemas/policySchema.sql`
- `src/database/schemas/approvalSchema.sql`
- `src/database/schemas/reimbursementSchema.sql`
- `src/database/schemas/reportSchema.sql`

These schema files define the structure of each table and are critical for maintaining data integrity.

## Dependencies

### Internal Dependencies

The following internal files are essential for the database setup:

| Name                             | Module                                             | Purpose                                                                     |
|----------------------------------|----------------------------------------------------|-----------------------------------------------------------------------------|
| **`approvalSchema.sql`**         | `src/database/schemas/approvalSchema.sql`          | Defines the structure of the approvals table for managing approval processes. |
| **`expenseSchema.sql`**          | `src/database/schemas/expenseSchema.sql`           | Defines the structure of the expenses table for storing employee-submitted expenses. |
| **`policySchema.sql`**           | `src/database/schemas/policySchema.sql`            | Defines the structure of the policies table for managing expense policies.  |
| **`reimbursementSchema.sql`**    | `src/database/schemas/reimbursementSchema.sql`     | Defines the structure of the reimbursements table for processing reimbursements. |
| **`reportSchema.sql`**           | `src/database/schemas/reportSchema.sql`            | Defines the structure of the reports table for generating and storing reports. |
| **`userSchema.sql`**             | `src/database/schemas/userSchema.sql`              | Defines the structure of the users table for managing user information and roles. |
| **`20231001_initial_setup.sql`** | `src/database/migrations/20231001_initial_setup.sql` | Initial migration script to set up foundational database tables.            |
| **`20231002_add_user_roles.sql`** | `src/database/migrations/20231002_add_user_roles.sql` | Migration script to add user roles to the users table.                   |
| **`20231003_create_expense_tables.sql`** | `src/database/migrations/20231003_create_expense_tables.sql` | Migration script to create tables related to expenses.      |
| **`20231004_add_foreign_keys.sql`** | `src/database/migrations/20231004_add_foreign_keys.sql` | Migration script to add foreign key constraints for referential integrity. |
| **`expenseCategorySeed.sql`**    | `src/database/seeds/expenseCategorySeed.sql`       | Seed file to populate initial expense categories.                          |
| **`policySeed.sql`**             | `src/database/seeds/policySeed.sql`                | Seed file to populate initial policy data.                                |
| **`userSeed.sql`**               | `src/database/seeds/userSeed.sql`                  | Seed file to populate initial user data.                                  |
| **`database.json`**              | `src/database/config/database.json`                | Configuration file for database connection settings.                      |
| **`knexfile.js`**                | `src/database/config/knexfile.js`                  | Configuration file for Knex.js to manage database migrations and seeds.   |

### External Dependencies

The following external dependencies are required for database management:

| Name    | Module | Version | Purpose                                                                                  |
|---------|--------|---------|------------------------------------------------------------------------------------------|
| **Knex** | `knex` | 0.95.6  | SQL query builder for Node.js, used for managing database migrations and seeds.          |

**Installation:**

Ensure that Knex is installed:

```bash
npm install knex@0.95.6
```

## References

- **Technical Specification Document**

  - **Location:** `Technical Specification/System Architecture/Data Layer`
  - This README and the associated scripts address the requirements outlined in the technical specification, specifically focusing on database initialization and configuration.

- **Requirements Addressed:**

  - **Database Initialization and Configuration**
    - **Description:** Establishes the initial database schema and configuration to support core functionalities of the application.
    - **Location in Documentation:** `Technical Specification/System Architecture/Data Layer`

- **Additional Documentation:**

  - **Knex.js Official Documentation:** [http://knexjs.org/](http://knexjs.org/)
  - **PostgreSQL Documentation:** [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)