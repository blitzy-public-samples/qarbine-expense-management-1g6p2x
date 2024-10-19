-- ********************************************************************
-- File: src/database/seeds/userSeed.sql
-- Description: Seed file to populate the 'users' table with initial data.
-- This includes predefined user roles and departments for the Global Employee Travel Expense Tracking App.
--
-- Requirements Addressed:
--   - Manage secure user access and permissions within the application, ensuring that only authorized users can perform specific actions based on their roles.
-- Location in Technical Specification:
--   - Section 13.1 User Authentication and Authorization
--     - Requirement ID: TR-F001.3
--     - Description: Role-based access control for employees, managers, finance team, and administrators.
-- ********************************************************************

-- Begin transaction to ensure atomic operation
BEGIN;

-- Clear existing data to prevent duplication
-- This ensures the seed can be run multiple times without data conflicts.
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

-- Insert initial users with predefined roles and departments.
-- Supports requirement TR-F001.3 by establishing baseline user roles for RBAC.
INSERT INTO users (user_id, name, email, role, department, country)
VALUES
  -- Admin user: Has full access to the system as per role 'Admin'.
  -- This user can manage system settings and user accounts.
  (1, 'John Doe', 'john.doe@example.com', 'Admin', 'IT', 'USA'),

  -- Manager user: Can approve expenses for their department as per role 'Manager'.
  -- This aligns with the approval workflow in requirement TR-F004.1.
  (2, 'Jane Smith', 'jane.smith@example.com', 'Manager', 'Finance', 'UK'),

  -- Employee user: Can submit expenses as per role 'Employee'.
  -- This user role is essential for expense submission in requirement TR-F002.1.
  (3, 'Emily Johnson', 'emily.johnson@example.com', 'Employee', 'HR', 'Canada');

-- Commit transaction to apply changes
COMMIT;