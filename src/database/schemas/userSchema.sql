-- src/database/schemas/userSchema.sql
-- SQL schema definition for the 'users' table.

-- This table stores user information, including roles and departments for access control.
-- Requirements Addressed:
-- - User Authentication and Authorization (Technical Specification/13.1 User Authentication and Authorization)
--   - TR-F001.1: Implement secure login process with multi-factor authentication (MFA)
--   - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators

CREATE TABLE users (
    -- user_id: Primary key for the users table.
    -- Reference: Technical Specification/Database Design/Tables and Relationships
    user_id SERIAL PRIMARY KEY,

    -- name: Full name of the user.
    -- Reference: Technical Specification/Database Design/Tables and Relationships
    name VARCHAR(255) NOT NULL,

    -- email: Email address of the user, used for login and communication.
    -- Unique constraint ensures each email is associated with only one user.
    -- Reference: Technical Specification/Database Design/Tables and Relationships
    email VARCHAR(255) UNIQUE NOT NULL,

    -- password_hash: Securely stores the user's password hash for authentication.
    -- Required for implementing secure login process with MFA (TR-F001.1)
    password_hash VARCHAR(255) NOT NULL,

    -- mfa_enabled: Indicates whether the user has multi-factor authentication enabled.
    -- Supports MFA implementation as per TR-F001.1
    mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,

    -- role: Role of the user within the organization (e.g., Employee, Manager, Admin).
    -- Supports role-based access control (RBAC) as per TR-F001.3
    role VARCHAR(50) NOT NULL,

    -- department: Department to which the user belongs.
    -- Used for applying policies based on department (Technical Specification/13.3 Policy and Compliance Engine)
    department VARCHAR(100) NOT NULL,

    -- country: Country of the user's primary location.
    -- May be used for localization and tax compliance (Technical Specification/13.7 Tax Compliance Features)
    country VARCHAR(100) NOT NULL
);

-- Indexes to improve query performance on frequently queried columns.

-- Index on role to optimize role-based queries.
CREATE INDEX idx_users_role ON users(role);

-- Index on department to optimize department-based queries.
CREATE INDEX idx_users_department ON users(department);

-- Index on country to optimize country-based queries.
CREATE INDEX idx_users_country ON users(country);

-- Dependencies with other tables.

-- The 'users' table is referenced by:
-- - 'expenses' table (src/database/schemas/expenseSchema.sql)
--   Purpose: To associate expenses with the user who submitted them.
-- - 'approvals' table (src/database/schemas/approvalSchema.sql)
--   Purpose: To identify the user who submitted the expense and the approver.
-- - 'policies' table (src/database/schemas/policySchema.sql)
--   Purpose: To apply policies based on user roles and departments.
-- - 'reimbursements' table (src/database/schemas/reimbursementSchema.sql)
--   Purpose: To identify the user who will receive the reimbursement.
-- - 'reports' table (src/database/schemas/reportSchema.sql)
--   Purpose: To associate reports with specific users and roles.

-- Note: Foreign key constraints referencing 'users.user_id' should be defined
--       in the respective tables that depend on this table.