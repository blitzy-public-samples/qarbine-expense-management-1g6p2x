-- Migration Script: Add 'role' column to 'users' table to enhance authentication and authorization capabilities.
-- Requirements Addressed:
-- - User Authentication and Authorization
--   (Technical Specification/13.1 User Authentication and Authorization)
--   - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators (Priority: High)

-- Step 1: Add a new column 'role' to the 'users' table to store user roles.
ALTER TABLE users
ADD COLUMN role VARCHAR(50);

-- Step 2: Update existing user records to assign appropriate roles based on their current access levels.
-- For this example, we'll assign the default role 'Employee' to all existing users.
UPDATE users
SET role = 'Employee';

-- Step 3: Ensure the 'role' column does not contain NULL values and has a default value.
ALTER TABLE users
ALTER COLUMN role SET NOT NULL,
ALTER COLUMN role SET DEFAULT 'Employee';

-- Note: The default roles include 'Employee', 'Manager', and 'Admin' as per the application requirements.

-- Future Consideration:
-- If a 'roles' table is introduced later for normalization and to enforce referential integrity, we can add a foreign key constraint.
-- This migration focuses on adding the 'role' column directly to the 'users' table as specified.

-- Dependencies:
-- - This migration depends on the existing 'users' table defined in 'src/database/schemas/userSchema.sql'.

-- Globals:
-- - Table Name: users