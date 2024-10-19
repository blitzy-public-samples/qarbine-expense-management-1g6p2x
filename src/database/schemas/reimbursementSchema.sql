-- ****************************************************************************************************
-- * Reimbursements Table Schema                                                                      *
-- *                                                                                                  *
-- * Description:                                                                                     *
-- * This table stores information about reimbursements processed for approved expenses, including    *
-- * payment details and status.                                                                      *
-- *                                                                                                  *
-- * Requirements Addressed:                                                                          *
-- * - Reimbursement Processing (Technical Specification/13.5 Reimbursement Processing):              *
-- *   Automate the reimbursement process for approved expenses, integrating seamlessly with payroll  *
-- *   systems and supporting multiple payment methods.                                               *
-- ****************************************************************************************************

-- Create the reimbursements table
CREATE TABLE IF NOT EXISTS reimbursements (
    -- Primary key for the reimbursements table.
    reimbursement_id SERIAL PRIMARY KEY,
    
    -- Foreign key referencing the expense that is being reimbursed.
    -- Ensures that the expense exists.
    expense_id INT NOT NULL,
    
    -- Foreign key referencing the user who will receive the reimbursement.
    -- Identifies the employee receiving the reimbursement.
    user_id INT NOT NULL,
    
    -- Method of payment for the reimbursement (e.g., Direct Deposit, Bank Transfer).
    -- Supports multiple reimbursement methods as per requirement TR-F005.2 (Technical Specification/13.5 Reimbursement Processing).
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('Direct Deposit', 'Bank Transfer')),
    
    -- Amount of money to be reimbursed.
    reimbursement_amount DECIMAL(12, 2) NOT NULL,
    
    -- Date when the reimbursement was processed.
    reimbursement_date DATE NOT NULL,
    
    -- Current status of the reimbursement (e.g., Pending, Completed).
    -- Tracks the reimbursement process status, supporting automation as described in requirement TR-F005.1.
    status VARCHAR(20) NOT NULL CHECK (status IN ('Pending', 'Completed')),
    
    -- Foreign key constraint to ensure the expense exists.
    -- The application logic ensures that only approved expenses are processed, complying with the purpose stated in the dependencies.
    CONSTRAINT fk_expense FOREIGN KEY (expense_id)
        REFERENCES expenses (expense_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    
    -- Foreign key constraint referencing the users table.
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Notes:
-- The 'fk_expense' foreign key addresses the dependency on the expenses table (src/database/schemas/expenseSchema.sql)
-- as per the internal dependencies specified in the schema:
-- "To reference expenses that have been approved for reimbursement."
-- The application ensures that only approved expenses are reimbursed, in line with requirements.

-- The 'fk_user' foreign key aligns with the dependency on the users table (src/database/schemas/userSchema.sql) to
-- identify the user who will receive the reimbursement.

-- The CHECK constraint on 'payment_method' enforces the reimbursement methods allowed,
-- supporting multiple payment methods as per requirement TR-F005.2 (Technical Specification/13.5 Reimbursement Processing).

-- The 'status' field and its CHECK constraint track the current status of the reimbursement,
-- contributing to automating the reimbursement process (TR-F005.1).