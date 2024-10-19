-- Initial SQL migration script to set up the foundational database tables for the Global Employee Travel Expense Tracking App.
-- Requirements Addressed:
--   - Database Initialization (Technical Specification/System Architecture/Data Layer)
--     - Establish the initial database schema to support core functionalities of the application.

-- ===============================================================
-- Table: users
-- Description: Stores user information, including roles and departments for access control.
-- Requirements Addressed:
--   - User Authentication and Authorization (Technical Specification/13.1 User Authentication and Authorization)
--     - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators
--   - Security and Compliance (Technical Specification/Security Layer)
--     - Implements user roles and department association for access control mechanisms.

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,             -- Primary key for the users table.
    name VARCHAR(255) NOT NULL,             -- Full name of the user.
    email VARCHAR(255) NOT NULL UNIQUE,     -- Email address of the user, used for login and communication.
    role VARCHAR(50) NOT NULL,              -- Role of the user within the organization (e.g., Employee, Manager, Admin).
    department VARCHAR(100),                -- Department to which the user belongs.
    country VARCHAR(100)                    -- Country of the user's primary location.
);

-- ===============================================================
-- Table: expenses
-- Description: Stores detailed information about each expense submitted by employees, including category, amount, currency, and associated receipts.
-- Requirements Addressed:
--   - Expense Submission (Technical Specification/13.2 Expense Submission)
--     - TR-F002.2: Utilize OCR technology for automatic receipt scanning and data extraction
--     - TR-F002.3: Support multiple currencies with real-time conversion
--     - TR-F002.5: Categorize expenses (e.g., meals, transportation, lodging)
--     - TR-F002.8: Provide an offline mode for expense entry when internet connection is unavailable
--   - Tax Compliance Features (Technical Specification/13.7 Tax Compliance Features)
--     - TR-F007.1: Automatically identify tax-deductible expenses

CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,          -- Primary key for the expenses table.
    user_id INTEGER NOT NULL REFERENCES users(user_id), -- Foreign key referencing the user who submitted the expense.
    category VARCHAR(100) NOT NULL,         -- Category of the expense (e.g., Meals, Transportation, Lodging).
    amount DECIMAL(12, 2) NOT NULL,         -- Amount of the expense.
    currency VARCHAR(10) NOT NULL,          -- Currency in which the expense was incurred.
    exchange_rate DECIMAL(12, 6) DEFAULT 1.0, -- Exchange rate to convert to base currency.
    expense_date DATE NOT NULL,             -- Date when the expense was incurred.
    receipt_image VARCHAR(255),             -- Path to the stored image of the receipt.
    tax_deductible BOOLEAN DEFAULT FALSE,   -- Indicates whether the expense is tax-deductible.
    created_at TIMESTAMP DEFAULT NOW(),     -- Timestamp when the expense was created.
    updated_at TIMESTAMP DEFAULT NOW()      -- Timestamp when the expense was last updated.
);

-- ===============================================================
-- Table: policies
-- Description: Stores configurable expense policies, including rules based on employee level, department, and travel destination.
-- Requirements Addressed:
--   - Policy and Compliance Engine (Technical Specification/13.3 Policy and Compliance Engine)
--     - TR-F003.1: Configure expense policies based on employee level, department, and travel destination
--     - TR-F003.5: Flag expenses that exceed policy limits or require additional approval

CREATE TABLE policies (
    policy_id SERIAL PRIMARY KEY,           -- Primary key for the policies table.
    level VARCHAR(50),                      -- Employee level to which the policy applies.
    department VARCHAR(100),                -- Department to which the policy applies.
    destination VARCHAR(100),               -- Travel destination to which the policy applies.
    category VARCHAR(100),                  -- Expense category to which the policy applies.
    per_diem_rate DECIMAL(12, 2),           -- Per diem rate applicable under the policy.
    max_amount DECIMAL(12, 2),              -- Maximum allowable amount under the policy.
    currency VARCHAR(10) DEFAULT 'USD'      -- Currency for the per diem rate and max amount.
);

-- ===============================================================
-- Table: approvals
-- Description: Stores approval actions for each expense report, including approver details and decision status.
-- Requirements Addressed:
--   - Approval Workflow (Technical Specification/13.4 Approval Workflow)
--     - TR-F004.1: Configure multi-level approval workflows
--     - TR-F004.3: Provide in-app notifications for pending approvals

CREATE TABLE approvals (
    approval_id SERIAL PRIMARY KEY,         -- Primary key for the approvals table.
    expense_id INTEGER NOT NULL REFERENCES expenses(expense_id), -- Foreign key referencing the expense being approved.
    approver_id INTEGER NOT NULL REFERENCES users(user_id), -- Foreign key referencing the user who is approving the expense.
    approval_date DATE DEFAULT NOW(),       -- Date when the approval decision was made.
    decision VARCHAR(20) NOT NULL,          -- Decision made by the approver (e.g., Approved, Rejected).
    comments TEXT,                          -- Additional comments or notes provided by the approver.
    level SMALLINT DEFAULT 1                -- Approval level for multi-level approval workflows.
);

-- ===============================================================
-- Table: reimbursements
-- Description: Stores information about reimbursements processed for approved expenses, including payment details and status.
-- Requirements Addressed:
--   - Reimbursement Processing (Technical Specification/13.5 Reimbursement Processing)
--     - TR-F005.1: Integrate with payroll systems for direct deposit reimbursements
--     - TR-F005.2: Support multiple reimbursement methods (e.g., payroll, separate bank transfer)

CREATE TABLE reimbursements (
    reimbursement_id SERIAL PRIMARY KEY,    -- Primary key for the reimbursements table.
    expense_id INTEGER NOT NULL REFERENCES expenses(expense_id), -- Foreign key referencing the expense that is being reimbursed.
    user_id INTEGER NOT NULL REFERENCES users(user_id), -- Foreign key referencing the user who will receive the reimbursement.
    payment_method VARCHAR(50) NOT NULL,    -- Method of payment for the reimbursement (e.g., Direct Deposit, Bank Transfer).
    reimbursement_amount DECIMAL(12, 2) NOT NULL, -- Amount of money to be reimbursed.
    reimbursement_date DATE DEFAULT NOW(),  -- Date when the reimbursement was processed.
    status VARCHAR(20) DEFAULT 'Pending',   -- Current status of the reimbursement (e.g., Pending, Completed).
    transaction_id VARCHAR(100)             -- Reference ID for the payment transaction.
);

-- ===============================================================
-- Table: reports
-- Description: Stores information about generated reports, including the type of report, associated data, and generation date.
-- Requirements Addressed:
--   - Reporting and Analytics (Technical Specification/13.6 Reporting and Analytics)
--     - TR-F006.1: Offer customizable dashboards for different user roles
--     - TR-F006.2: Generate detailed expense reports by employee, department, project, or cost center

CREATE TABLE reports (
    report_id SERIAL PRIMARY KEY,           -- Primary key for the reports table.
    report_type VARCHAR(100) NOT NULL,      -- Type of the report (e.g., Expense Summary, Approval Status).
    generated_date DATE DEFAULT NOW(),      -- Date when the report was generated.
    associated_data JSONB,                  -- JSON object containing data associated with the report.
    user_id INTEGER REFERENCES users(user_id) -- Foreign key referencing the user who generated the report.
);

-- ===============================================================
-- Constraints and Indexes

-- Adding unique constraint on email to prevent duplicate user accounts
ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);

-- Index on expenses.user_id to optimize queries filtering by user
CREATE INDEX idx_expenses_user_id ON expenses (user_id);

-- Index on expenses.expense_date to optimize queries by date
CREATE INDEX idx_expenses_expense_date ON expenses (expense_date);

-- Index on approvals.expense_id to optimize approval lookups
CREATE INDEX idx_approvals_expense_id ON approvals (expense_id);

-- Index on reimbursements.user_id for efficient reimbursement tracking
CREATE INDEX idx_reimbursements_user_id ON reimbursements (user_id);

-- Index on reports.user_id to optimize user-specific report retrieval
CREATE INDEX idx_reports_user_id ON reports (user_id);

-- ===============================================================
-- Additional Foreign Key Constraints

-- Ensuring that expense categories comply with policy definitions
ALTER TABLE expenses
ADD CONSTRAINT fk_expenses_policy
FOREIGN KEY (category)
REFERENCES policies (category)
ON UPDATE CASCADE;

-- ===============================================================
-- End of Initial Setup Migration Script
-- This script establishes the foundational database schema necessary for the core functionalities of the Global Employee Travel Expense Tracking App as outlined in the Technical Specification.