-- Migration Script: Add foreign key constraints to ensure referential integrity across related tables.
-- Description: This script adds foreign key constraints to existing tables in the Global Employee Travel Expense Tracking App database.
-- Requirements Addressed:
--   - Database Integrity and Relationships
--     Location: Technical Specification > System Architecture > Data Layer
--     Description: Ensure referential integrity and establish relationships between tables to maintain consistent and accurate data across the application.

-- --------------------------------------------------
-- Add a foreign key constraint to the 'expenses' table to reference the 'users' table.
-- Purpose: Ensure each expense is associated with a valid user.
-- Related Requirements:
--   - TR-F002.1: Provide a mobile app for easy expense capture on-the-go
--     Location: Features > 13.2 Expense Submission > Technical Requirements
--   - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators
--     Location: Features > 13.1 User Authentication and Authorization > Technical Requirements

ALTER TABLE expenses
ADD CONSTRAINT fk_expenses_user_id
FOREIGN KEY (user_id)
REFERENCES users(user_id)
ON DELETE CASCADE;

-- --------------------------------------------------
-- Add a foreign key constraint to the 'approvals' table to reference the 'expenses' table.
-- Purpose: Ensure each approval is linked to a valid expense.
-- Related Requirements:
--   - TR-F004.1: Configure multi-level approval workflows
--     Location: Features > 13.4 Approval Workflow > Technical Requirements

ALTER TABLE approvals
ADD CONSTRAINT fk_approvals_expense_id
FOREIGN KEY (expense_id)
REFERENCES expenses(expense_id)
ON DELETE CASCADE;

-- --------------------------------------------------
-- Add a foreign key constraint to the 'approvals' table to reference the 'users' table.
-- Purpose: Ensure each approval is made by a valid user.
-- Related Requirements:
--   - TR-F004.1: Configure multi-level approval workflows
--     Location: Features > 13.4 Approval Workflow > Technical Requirements
--   - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators
--     Location: Features > 13.1 User Authentication and Authorization > Technical Requirements

ALTER TABLE approvals
ADD CONSTRAINT fk_approvals_approver_id
FOREIGN KEY (approver_id)
REFERENCES users(user_id)
ON DELETE SET NULL;

-- --------------------------------------------------
-- Add a foreign key constraint to the 'reimbursements' table to reference the 'expenses' table.
-- Purpose: Ensure each reimbursement is linked to a valid expense.
-- Related Requirements:
--   - TR-F005.1: Integrate with payroll systems for direct deposit reimbursements
--     Location: Features > 13.5 Reimbursement Processing > Technical Requirements

ALTER TABLE reimbursements
ADD CONSTRAINT fk_reimbursements_expense_id
FOREIGN KEY (expense_id)
REFERENCES expenses(expense_id)
ON DELETE CASCADE;

-- --------------------------------------------------
-- Add a foreign key constraint to the 'reimbursements' table to reference the 'users' table.
-- Purpose: Ensure each reimbursement is processed for a valid user.
-- Related Requirements:
--   - TR-F005.1: Integrate with payroll systems for direct deposit reimbursements
--     Location: Features > 13.5 Reimbursement Processing > Technical Requirements
--   - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators
--     Location: Features > 13.1 User Authentication and Authorization > Technical Requirements

ALTER TABLE reimbursements
ADD CONSTRAINT fk_reimbursements_user_id
FOREIGN KEY (user_id)
REFERENCES users(user_id)
ON DELETE CASCADE;