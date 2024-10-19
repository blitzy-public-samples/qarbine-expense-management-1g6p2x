-- expenseSchema.sql
-- SQL schema definition for the 'expenses' table.
-- Manages the storage and organization of expense data submitted by employees within the Global Employee Travel Expense Tracking App.

-- Requirements Addressed:
-- - Expense Submission (Technical Specification/13.2 Expense Submission)
--   Enable employees to efficiently capture and submit travel expenses through user-friendly mobile and web interfaces, incorporating automated data extraction and currency support.

-- Dependencies:
-- - References 'users' table to associate expenses with the user who submitted them (src/database/schemas/userSchema.sql).

CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,          -- Primary key for the expenses table.

    user_id INT NOT NULL,                   -- Foreign key referencing the user who submitted the expense.
    category VARCHAR(100) NOT NULL,         -- Category of the expense (e.g., Meals, Transportation, Lodging).
    amount DECIMAL(12, 2) NOT NULL,         -- Amount of the expense.
    currency VARCHAR(3) NOT NULL,           -- Currency in which the expense was incurred.
    expense_date DATE NOT NULL,             -- Date when the expense was incurred.
    receipt_image TEXT,                     -- Path to the stored image of the receipt.
    tax_deductible BOOLEAN DEFAULT FALSE,   -- Indicates whether the expense is tax-deductible.

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)           -- Associates the expense with the submitting user.
);

-- Indexes for improving query performance.
CREATE INDEX idx_expenses_user_id ON expenses(user_id);            -- Index on user_id for faster lookups by user.
CREATE INDEX idx_expenses_category ON expenses(category);          -- Index on category to optimize category queries.
CREATE INDEX idx_expenses_expense_date ON expenses(expense_date);  -- Index on expense_date for date range queries.

-- Note:
-- Additional foreign keys to 'policies', 'approvals', 'reimbursements', and 'reports' tables can be added
-- to enforce policy compliance, track approval status, manage reimbursements, and include expense data in reports,
-- aligning with dependencies specified in the technical documentation.

-- This table structure addresses the requirements for efficient expense submission by storing detailed information
-- about each expense, as outlined in Technical Specification/13.2 Expense Submission.

-- Ensure that all expense submissions adhere to company policies and tax laws by integrating with the policy and compliance engine
-- as per Technical Specification/13.3 Policy and Compliance Engine.