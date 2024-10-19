// src/web/tests/PolicyCompliance.test.tsx
// Test suite for the PolicyCompliance component

// Importing React and testing utilities
import React from 'react'; // React library for building user interfaces
import { render, screen } from '@testing-library/react'; // @testing-library/react version 13.4.0 - Utilities for testing React components
import '@testing-library/jest-dom/extend-expect'; // @testing-library/jest-dom version 5.16.5 - Custom jest matchers for DOM nodes

// Importing the PolicyCompliance component to be tested
import PolicyCompliance from '../src/components/PolicyCompliance'; // PolicyCompliance component to display policy compliance status

// Requirements Addressed:
// - TR-F003.2: Perform real-time policy checks during expense submission
// - TR-F003.5: Flag expenses that exceed policy limits or require additional approval
// Location: Technical Specification/13. Features/13.3 Policy and Compliance Engine

// Mock policy data for testing
const policy = {
  level: 'Employee',
  department: 'Sales',
  destination: 'Domestic',
  maxAmount: 1000, // Maximum expense amount allowed per policy
};

// Test data for compliant and non-compliant expenses
const compliantExpense = {
  amount: 500,
  category: 'Meals',
  currency: 'USD',
  expenseDate: '2023-10-01',
};

const nonCompliantExpense = {
  amount: 1500,
  category: 'Transportation',
  currency: 'USD',
  expenseDate: '2023-10-01',
};

// Test suite for the PolicyCompliance component
describe('PolicyCompliance Component', () => {
  // Test case: Should display compliant message when expense is within policy limits
  // Requirement Addressed: TR-F003.2
  // Location: Technical Specification/13. Features/13.3 Policy and Compliance Engine
  test('displays compliant message when expense is within policy limits', () => {
    // Render the component with a compliant expense
    render(<PolicyCompliance expense={compliantExpense} policy={policy} />);

    // The component should display a message indicating compliance
    const messageElement = screen.getByText(/Expense is within policy limits\./i);
    expect(messageElement).toBeInTheDocument();
  });

  // Test case: Should display warning message when expense exceeds policy limits
  // Requirement Addressed: TR-F003.5
  // Location: Technical Specification/13. Features/13.3 Policy and Compliance Engine
  test('displays warning message when expense exceeds policy limits', () => {
    // Render the component with a non-compliant expense
    render(<PolicyCompliance expense={nonCompliantExpense} policy={policy} />);

    // The component should display a warning message indicating the expense exceeds policy limits
    const warningElement = screen.getByText(/Expense exceeds policy limits and requires additional approval\./i);
    expect(warningElement).toBeInTheDocument();
  });

  // Test case: Should display error message when policy data is unavailable
  // Requirement Addressed: TR-F003.1 - Configure expense policies based on employee level, department, and travel destination
  // Location: Technical Specification/13. Features/13.3 Policy and Compliance Engine
  test('displays error message when policy data is unavailable', () => {
    // Render the component without policy data
    render(<PolicyCompliance expense={compliantExpense} policy={null} />);

    // The component should handle missing policy data gracefully
    const errorElement = screen.getByText(/Policy information is unavailable\./i);
    expect(errorElement).toBeInTheDocument();
  });

  // Additional test cases can be added here to cover other scenarios and requirements
});