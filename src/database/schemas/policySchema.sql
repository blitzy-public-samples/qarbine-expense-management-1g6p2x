-- File: src/database/schemas/policySchema.sql
-- Description:
--   SQL schema definition for the 'policies' table, which manages the configuration and enforcement
--   of expense policies within the Global Employee Travel Expense Tracking App.

-- Requirements Addressed:
--   - Policy and Compliance Engine
--     (Technical Specification/13.3 Policy and Compliance Engine)
--     - TR-F003.1: Configure expense policies based on employee level, department, and travel destination.
--     - TR-F003.4: Automatically apply per diem rates based on travel location.
--     - TR-F003.5: Flag expenses that exceed policy limits or require additional approval.

-- Dependencies:
--   - Internal Tables:
--     - users (src/database/schemas/userSchema.sql): To apply policies based on user roles and departments.
--     - expenses (src/database/schemas/expenseSchema.sql): To enforce policy compliance on submitted expenses.
--     - approvals (src/database/schemas/approvalSchema.sql): To ensure policy compliance is checked during the approval process.
--     - reimbursements (src/database/schemas/reimbursementSchema.sql): To verify policy compliance before processing reimbursements.
--     - reports (src/database/schemas/reportSchema.sql): To include policy compliance information in generated reports.

-- Create 'policies' table
CREATE TABLE policies (
    policy_id SERIAL PRIMARY KEY,
    -- policy_id: Primary key for the policies table.
    -- Uniquely identifies each policy.

    level VARCHAR(50),
    -- level: Employee level to which the policy applies.
    -- Addresses TR-F003.1: Allows configuring policies based on employee level (e.g., 'Junior', 'Senior', 'Manager').

    department VARCHAR(100),
    -- department: Department to which the policy applies.
    -- Addresses TR-F003.1: Enables policies to be configured per department (e.g., 'Sales', 'Engineering').

    destination VARCHAR(100),
    -- destination: Travel destination to which the policy applies.
    -- Addresses TR-F003.1: Allows policies to be specific to travel destinations (e.g., 'USA', 'Europe').

    per_diem_rate DECIMAL(10,2),
    -- per_diem_rate: Per diem rate applicable under the policy.
    -- Addresses TR-F003.4: Automatically apply per diem rates based on travel location.

    max_amount DECIMAL(10,2)
    -- max_amount: Maximum allowable amount under the policy.
    -- Addresses TR-F003.5: Sets maximum limits for expenses to flag those that exceed policy limits.
);

-- Indexes to improve query performance on frequently searched columns
CREATE INDEX idx_policies_level ON policies(level);
CREATE INDEX idx_policies_department ON policies(department);
CREATE INDEX idx_policies_destination ON policies(destination);

-- Data Validation Constraints
-- Ensure that 'per_diem_rate' and 'max_amount' are non-negative values.
ALTER TABLE policies
ADD CONSTRAINT chk_policies_per_diem_rate_non_negative CHECK (per_diem_rate >= 0),
ADD CONSTRAINT chk_policies_max_amount_non_negative CHECK (max_amount >= 0);

-- Considerations for Future Enhancements:

-- 1. Foreign Key Constraints
-- If there are tables defining valid levels ('employee_levels'), departments ('departments'), or destinations ('destinations'),
-- foreign keys can be added to enforce referential integrity.
-- Example:
-- ALTER TABLE policies
-- ADD CONSTRAINT fk_policies_level
-- FOREIGN KEY (level)
-- REFERENCES employee_levels(level_name);

-- 2. Effective Dates
-- To manage active and historical policies, consider adding 'effective_date' and 'expiration_date' columns.
-- ALTER TABLE policies
-- ADD COLUMN effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
-- ADD COLUMN expiration_date DATE;

-- This allows policies to have a validity period, facilitating policy updates without losing historical data.

-- Policy Enforcement Workflow:

-- - During expense submission, the application should retrieve the relevant policy based on the employee's 'level', 'department', and 'destination'.
-- - The 'expenses' table (src/database/schemas/expenseSchema.sql) should reference 'policies' to apply these rules.
-- - If an expense exceeds 'max_amount' or does not conform to 'per_diem_rate', it should be flagged as per TR-F003.5.

-- Security Constraints:

-- - Only authorized personnel should have INSERT, UPDATE, or DELETE permissions on the 'policies' table.
-- - Implement role-based access control (RBAC) as per the Security Specifications to protect policy configurations.

-- Integration with Reporting:

-- - The 'reports' table can utilize data from the 'policies' table to provide insights into policy compliance across the organization.
-- - This supports TR-F006.2 and TR-F006.5 in Technical Specification/13.6 Reporting and Analytics.

-- Compliance Requirements:

-- - Ensure that policy configurations align with international tax laws, as per TR-F003.3.
-- - Regular audits should verify that 'policies' data is up-to-date and compliant.

-- End of 'policies' table schema definition.