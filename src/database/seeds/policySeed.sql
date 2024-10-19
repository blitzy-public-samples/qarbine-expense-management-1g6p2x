-- File: src/database/seeds/policySeed.sql
--
-- Description:
-- SQL seed file for populating the 'policies' table with initial data,
-- ensuring that the Global Employee Travel Expense Tracking App has predefined
-- policies for expense management.
--
-- Requirements Addressed:
-- - Policy and Compliance Engine
--   (Technical Specification/13.3 Policy and Compliance Engine)
--   Ensure all expense submissions adhere to company policies and international
--   tax laws through configurable rules and real-time validation.
--
-- Dependencies:
-- - Internal:
--   - 'src/database/schemas/policySchema.sql'
--     Defines the structure of the 'policies' table to ensure data consistency during seeding.
-- - External:
--   - Knex.js version 0.95.6
--     Used for running seed scripts and managing database migrations.

-- Step 1: Clear existing data from the 'policies' table to avoid duplication
DELETE FROM policies;

-- Step 2: Insert predefined policy data into the 'policies' table
INSERT INTO policies (level, department, destination, per_diem_rate, max_amount)
VALUES
  -- Policy 1: Sales Employees traveling domestically
  ('Employee', 'Sales', 'Domestic', 50.00, 500.00),

  -- Policy 2: Engineering Managers traveling internationally
  ('Manager', 'Engineering', 'International', 100.00, 1000.00);

-- Note:
-- The 'policy_id' column is omitted from the INSERT statement as it is
-- assumed to be an auto-incrementing primary key as defined in 'policySchema.sql'.
--
-- This seed data establishes initial policies based on employee level,
-- department, and travel destination, addressing the need for configurable
-- rules as specified in the Policy and Compliance Engine requirements.
--
-- By seeding these policies, the application can perform real-time validation
-- of expense submissions, ensuring adherence to company policies and
-- compliance with international tax laws.