-- SQL schema definition for the 'approvals' table.
-- This table stores approval actions for each expense report, including approver details and decision status.
-- 
-- Requirements Addressed:
-- - Approval Workflow (Technical Specification/13.4 Approval Workflow)
--   Location: Technical Specification/13.4 Approval Workflow
--
-- Dependencies:
-- - References 'expenses' table for expense reports that require approval.
--   Module: src/database/schemas/expenseSchema.sql
-- - References 'users' table to identify the approver.
--   Module: src/database/schemas/userSchema.sql
-- - Ensures policy compliance is checked during the approval process.
--   Module: src/database/schemas/policySchema.sql
-- - Interfaces with the 'reimbursements' table to process approved expenses.
--   Module: src/database/schemas/reimbursementSchema.sql
-- - Includes approval status in reporting.
--   Module: src/database/schemas/reportSchema.sql

-- Create the 'approvals' table
CREATE TABLE approvals (
    -- Primary key for the approvals table.
    approval_id SERIAL PRIMARY KEY,
    
    -- Foreign key referencing the expense report being approved.
    expense_id INT NOT NULL,
    
    -- Foreign key referencing the user who is approving the expense.
    approver_id INT NOT NULL,
    
    -- Date when the approval decision was made.
    approval_date DATE NOT NULL DEFAULT CURRENT_DATE,
    
    -- Decision made by the approver (e.g., 'Approved', 'Rejected').
    -- Enforces the decision options specified in Technical Specification/13.4 Approval Workflow.
    decision VARCHAR(20) NOT NULL CHECK (decision IN ('Approved', 'Rejected')),
    
    -- Additional comments or notes provided by the approver.
    comments TEXT,
    
    -- Timestamp of when the approval record was created.
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Timestamp of the last update to the approval record.
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Foreign key constraint linking to the 'expenses' table.
-- Ensures that the expense report exists before an approval can be made.
-- Dependency: src/database/schemas/expenseSchema.sql
ALTER TABLE approvals
ADD CONSTRAINT fk_approvals_expense
FOREIGN KEY (expense_id)
REFERENCES expenses (expense_id)
ON DELETE CASCADE;

-- Foreign key constraint linking to the 'users' table for the approver.
-- Ensures that the approver is a valid user in the system.
-- Dependency: src/database/schemas/userSchema.sql
ALTER TABLE approvals
ADD CONSTRAINT fk_approvals_approver
FOREIGN KEY (approver_id)
REFERENCES users (user_id)
ON DELETE SET NULL;

-- Trigger to update 'updated_at' timestamp on row modification.
-- Helps in tracking changes for auditing purposes as per compliance requirements.
CREATE OR REPLACE FUNCTION update_approvals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_approvals_updated_at
BEFORE UPDATE ON approvals
FOR EACH ROW
EXECUTE PROCEDURE update_approvals_updated_at();

-- Index on 'approver_id' to optimize queries filtering by approver.
CREATE INDEX idx_approvals_approver_id ON approvals(approver_id);

-- Index on 'expense_id' to optimize queries filtering by expense report.
CREATE INDEX idx_approvals_expense_id ON approvals(expense_id);

-- Comment on table for additional context.
COMMENT ON TABLE approvals IS 'Stores approval actions for each expense report, including approver details and decision status. Addresses requirements in Technical Specification/13.4 Approval Workflow.';

-- Comments on columns for data dictionary and developer reference.
COMMENT ON COLUMN approvals.approval_id IS 'Primary key for the approvals table.';
COMMENT ON COLUMN approvals.expense_id IS 'Foreign key referencing the expense report being approved.';
COMMENT ON COLUMN approvals.approver_id IS 'Foreign key referencing the user who is approving the expense.';
COMMENT ON COLUMN approvals.approval_date IS 'Date when the approval decision was made.';
COMMENT ON COLUMN approvals.decision IS 'Decision made by the approver (e.g., Approved, Rejected).';
COMMENT ON COLUMN approvals.comments IS 'Additional comments or notes provided by the approver.';
COMMENT ON COLUMN approvals.created_at IS 'Timestamp when the approval record was created.';
COMMENT ON COLUMN approvals.updated_at IS 'Timestamp when the approval record was last updated.';