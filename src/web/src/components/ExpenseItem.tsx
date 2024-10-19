// Import necessary modules and components

// React core functionalities (React version 17.0.2)
import React from 'react';

// Internal components and utilities
import PolicyCompliance from './PolicyCompliance'; // Displays policy compliance status for the expense item
import { formatCurrency } from '../utils/helpers'; // Utility function to format currency values

// External libraries
import { FaReceipt } from 'react-icons/fa'; // react-icons version 4.3.1 - Icon components for display

// Stylesheet for ExpenseItem component
import '../styles/ExpenseItem.css';

// TypeScript interface defining the shape of props for ExpenseItem component
interface ExpenseItemProps {
  itemId: number;
  category: string;
  amount: number;
  currency: string;
  expenseDate: string;
  receiptImage: string;
  taxDeductible: boolean;
  status: string;
  policyCompliant: boolean;
}

// Functional component to display the details of an expense item
// Requirements Addressed:
// - Display submitted expenses with details (User Interface Design/1.1 Employee Dashboard)
// - Expense Item Details Display (13.2 Expense Submission/TR-F002.5)
// - Attachment of receipts (13.2 Expense Submission/TR-F002.4)
// - Policy Compliance Indication (13.3 Policy and Compliance Engine/TR-F003.2 and TR-F003.5)
const ExpenseItem: React.FC<ExpenseItemProps> = (props) => {
  // Destructure props to extract expense item details
  const {
    itemId,
    category,
    amount,
    currency,
    expenseDate,
    receiptImage,
    taxDeductible,
    status,
    policyCompliant,
  } = props;

  // Format the amount using formatCurrency utility function
  const formattedAmount = formatCurrency(amount, currency);

  // Function to handle viewing the receipt image
  // This addresses the requirement to allow attachment of digital receipts (13.2 Expense Submission/TR-F002.4)
  const handleViewReceipt = () => {
    // Opens the receipt image in a new browser tab
    window.open(receiptImage, '_blank');
  };

  return (
    <div className="expense-item">
      {/* Expense Item Details */}
      <div className="expense-item-details">
        <div className="expense-item-category">
          <span>{category}</span>
        </div>
        <div className="expense-item-date">
          <span>{new Date(expenseDate).toLocaleDateString()}</span>
        </div>
        <div className="expense-item-amount">
          <span>{formattedAmount}</span>
        </div>
        <div className="expense-item-status">
          <span className={`status-label status-${status.toLowerCase()}`}>
            {status}
          </span>
        </div>
        <div className="expense-item-tax-deductible">
          {taxDeductible ? (
            <span className="tax-deductible">Tax Deductible</span>
          ) : (
            <span className="non-tax-deductible">Non-Deductible</span>
          )}
        </div>
      </div>

      {/* Policy Compliance Status */}
      {/* Utilizes the PolicyCompliance component to indicate if the expense complies with company policies */}
      {/* Addresses Policy Compliance Indication (13.3 Policy and Compliance Engine/TR-F003.2 and TR-F003.5) */}
      <PolicyCompliance compliant={policyCompliant} />

      {/* View Receipt Action */}
      {/* Provides an option to view the attached receipt image */}
      {/* This fulfills the requirement for attachment of digital receipts */}
      <div className="expense-item-actions">
        <button onClick={handleViewReceipt} className="view-receipt-button">
          <FaReceipt /> View Receipt
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;