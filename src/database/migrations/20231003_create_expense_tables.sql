-- Migration Script: Create Expenses Table
-- File: src/database/migrations/20231003_create_expense_tables.sql
-- Description: SQL migration script to create the 'expenses' table within the Global Employee Travel Expense Tracking App.
-- Requirements Addressed:
-- - Expense Submission (Technical Specification/13.2 Expense Submission)
--   Enable employees to efficiently capture and submit travel expenses through user-friendly mobile and web interfaces, incorporating automated data extraction and currency support.

-- Dependencies:
-- - Internal Dependency: 'users' table defined in src/database/schemas/userSchema.sql
--   Purpose: To associate expenses with the user who submitted them.
-- - Internal Dependency: 'policies' table defined in src/database/schemas/policySchema.sql
--   Purpose: To enforce policy compliance on submitted expenses.

-- Step 1: Create the 'expenses' table with columns for expense details.
CREATE TABLE expenses (
    -- Primary key for the expenses table.
    expense_id SERIAL PRIMARY KEY,
    
    -- Foreign key referencing the user who submitted the expense.
    user_id INTEGER NOT NULL,
    
    -- Category of the expense (e.g., Meals, Transportation, Lodging).
    category VARCHAR(50) NOT NULL,
    
    -- Amount of the expense.
    amount DECIMAL(10, 2) NOT NULL,
    
    -- Currency in which the expense was incurred (ISO 4217 code).
    currency VARCHAR(3) NOT NULL,
    
    -- Date when the expense was incurred.
    expense_date DATE NOT NULL,
    
    -- Path to the stored image of the receipt.
    receipt_image TEXT,
    
    -- Indicates whether the expense is tax-deductible.
    tax_deductible BOOLEAN NOT NULL,
    
    -- Foreign key constraint to ensure referential integrity with the 'users' table.
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES users(user_id)
);

-- Indexes to improve query performance on frequently searched columns.
CREATE INDEX idx_expenses_user_id ON expenses(user_id);
CREATE INDEX idx_expenses_category ON expenses(category);
CREATE INDEX idx_expenses_expense_date ON expenses(expense_date);

-- Step 2: Ensure compliance with policies defined in the 'policies' table.
-- Note: Policy compliance enforcement should be handled through application logic or database triggers as per business rules defined in 'policySchema.sql' and Technical Specification/13.3 Policy and Compliance Engine.

-- Requirements Addressed in Columns:
-- - 'category' and 'amount' columns address TR-F002.5 (Categorize expenses) from Technical Specification/13.2 Expense Submission.
-- - 'currency' column supports multiple currencies as per TR-F002.3 from Technical Specification/13.2 Expense Submission.
-- - 'receipt_image' column allows attachment of digital receipts, addressing TR-F002.4.
-- - 'tax_deductible' column supports tax compliance features outlined in Technical Specification/13.7 Tax Compliance Features, specifically TR-F007.1 (Automatically identify tax-deductible expenses).

-- End of migration script for creating the 'expenses' table.