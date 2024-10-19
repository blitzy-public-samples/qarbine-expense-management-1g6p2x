-- src/database/seeds/expenseCategorySeed.sql
-- SQL seed file for populating the database with initial expense category data.
--
-- Requirements Addressed:
-- - Expense Submission
--   Location: Technical Specification/13.2 Expense Submission
--   Description: Enable employees to efficiently capture and submit travel expenses through user-friendly mobile and web interfaces, incorporating automated data extraction and currency support.
--
-- Dependencies:
-- Internal:
-- - 'expenses' table defined in 'src/database/schemas/expenseSchema.sql'
--   Purpose: Defines the schema for the expenses table, which includes the 'category' column to be populated by this seed file.
--
-- External:
-- - PostgreSQL Database
--   Purpose: Executes this SQL script to seed the initial data.

-- Begin transaction to ensure atomicity
BEGIN;

-- Insert predefined expense categories into the 'expenses' table
-- This ensures that users have predefined categories available when submitting expenses.
-- The insertion process handles duplicates gracefully by only inserting categories that do not already exist.

-- Predefined expense categories
-- Referenced from the 'globals' section in the specification
WITH new_categories (category) AS (
  VALUES
    ('Meals'),
    ('Transportation'),
    ('Lodging'),
    ('Entertainment'),
    ('Miscellaneous')
)

-- Insert new categories into 'expenses' table if they do not already exist
INSERT INTO expenses (category)
SELECT nc.category
FROM new_categories nc
LEFT JOIN expenses e ON e.category = nc.category
WHERE e.category IS NULL;

-- Commit transaction to save changes
COMMIT;