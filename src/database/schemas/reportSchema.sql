-- ==============================================================================
-- File: reportSchema.sql
-- Description:
--   SQL schema definition for the 'reports' table, which manages the generation
--   and storage of various reports related to expenses, approvals, reimbursements,
--   and policy compliance within the Global Employee Travel Expense Tracking App.
--
-- Requirements Addressed:
--   - Reporting and Analytics (Technical Specification/13.6 Reporting and Analytics)
--     Provide comprehensive reporting and analytical tools for tracking, managing,
--     and forecasting expenses, tailored to different user roles.
--
-- Dependencies:
--   - Internal Tables:
--     - 'expenses' table (src/database/schemas/expenseSchema.sql)
--       To include expense data in generated reports.
--     - 'approvals' table (src/database/schemas/approvalSchema.sql)
--       To include approval status and details in reports.
--     - 'reimbursements' table (src/database/schemas/reimbursementSchema.sql)
--       To include reimbursement status and details in reports.
--     - 'policies' table (src/database/schemas/policySchema.sql)
--       To include policy compliance information in reports.
--     - 'users' table (src/database/schemas/userSchema.sql)
--       To associate reports with specific users and roles.
--
-- Note:
--   Ensure that the 'users' table exists before creating this table,
--   as it relies on 'user_id' foreign key referencing 'users.user_id'.

-- ==============================================================================
-- Create 'reports' table
CREATE TABLE IF NOT EXISTS reports (
    -- report_id: int, Primary key for the reports table.
    report_id SERIAL PRIMARY KEY,

    -- report_type: string, Type of the report (e.g., Expense Summary, Approval Status, Reimbursement Overview).
    report_type VARCHAR(100) NOT NULL,

    -- generated_date: date, Date when the report was generated.
    generated_date DATE NOT NULL DEFAULT CURRENT_DATE,

    -- associated_data: json, JSON object containing data associated with the report,
    -- such as expense details, approval statuses, and compliance information.
    associated_data JSONB NOT NULL,

    -- user_id: int, Foreign key referencing the user who generated the report.
    user_id INTEGER NOT NULL,

    -- Foreign Key Constraint:
    -- References the 'users' table to associate the report with the user who generated it.
    CONSTRAINT fk_reports_user_id FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- Indexes to improve query performance on commonly searched fields
-- Creates an index on 'report_type' to optimize queries filtering by report type.
CREATE INDEX IF NOT EXISTS idx_reports_report_type
    ON reports(report_type);

-- Creates an index on 'generated_date' to optimize queries filtering or sorting by date.
CREATE INDEX IF NOT EXISTS idx_reports_generated_date
    ON reports(generated_date);

-- Creates an index on 'user_id' to optimize queries filtering by user.
CREATE INDEX IF NOT EXISTS idx_reports_user_id
    ON reports(user_id);

-- ==============================================================================
-- Comments:
-- This 'reports' table is essential for fulfilling the reporting and analytics
-- capabilities described in Technical Specification/13.6 Reporting and Analytics.
-- It allows the storage and retrieval of generated reports, tailored to different
-- user roles, and supports the generation of detailed expense reports, trend analysis,
-- and tax liability reports.

-- The 'associated_data' column stores report data in JSONB format, providing
-- flexibility to include various types of data (expenses, approvals, reimbursements,
-- policy compliance) as required for different reports. JSONB is used for efficient
-- storage and querying of JSON data in PostgreSQL.

-- Make sure to handle data serialization and deserialization when interacting
-- with the 'associated_data' column in application code.

-- ==============================================================================