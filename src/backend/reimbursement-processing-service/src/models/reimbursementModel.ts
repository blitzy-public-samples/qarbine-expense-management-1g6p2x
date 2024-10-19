// Importing mongoose to define and interact with the MongoDB database using schemas and models.
// Version: 5.13.8
import mongoose, { Schema, Document, Model } from 'mongoose';

// Requirements Addressed:
// - Reimbursement Processing (Technical Specification/13.5 Reimbursement Processing)
// This model automates the reimbursement process for approved expenses, integrating seamlessly with payroll systems and supporting multiple payment methods.

/**
 * Represents a reimbursement record in the system, capturing all necessary details for processing and tracking.
 * Requirements Addressed:
 * - Automate the reimbursement process for approved expenses (Technical Specification/13.5 Reimbursement Processing)
 */
export interface IReimbursement extends Document {
  employeeId: string;
  amount: number;
  currency: string;
  status: string;
  submissionDate: Date;
  approvalDate?: Date;
  processedDate?: Date;

  validateReimbursement(): boolean;
}

const ReimbursementSchema: Schema = new Schema({
  employeeId: {
    type: String,
    required: true,
    trim: true,
    // Assign the employeeId to the reimbursement record.
    // Requirement Addressed:
    // - Ensures that each reimbursement record is associated with an employee (Technical Specification/13.5 Reimbursement Processing)
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
    // Set the amount for the reimbursement.
    // Steps:
    // - Check that the amount is a positive number.
    // Requirement Addressed:
    // - Validates the reimbursement data against predefined business rules and constraints.
  },
  currency: {
    type: String,
    required: true,
    trim: true,
    // Set the currency for the reimbursement.
    // Steps:
    // - Ensure the currency is a supported ISO currency code.
    // Requirement Addressed:
    // - Supports multiple currencies with real-time conversion (Technical Specification/13.5 Reimbursement Processing)
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Approved', 'Processed'],
    default: 'Pending',
    // Initialize the status of the reimbursement (e.g., 'Pending', 'Approved', 'Processed').
    // Steps:
    // - Verify that the status is one of the allowed values.
    // Requirement Addressed:
    // - Automate status updates in the reimbursement process (Technical Specification/13.5 Reimbursement Processing)
  },
  submissionDate: {
    type: Date,
    required: true,
    default: Date.now,
    // Record the submission date of the reimbursement.
    // Steps:
    // - Confirm that the submission date is not in the future.
  },
  approvalDate: {
    type: Date,
    required: false,
    // Optionally set the approval date if applicable.
  },
  processedDate: {
    type: Date,
    required: false,
    // Optionally set the processed date if applicable.
  },
});

/**
 * The class representing the Reimbursement document.
 * Includes the constructor and methods as per JSON specification.
 * Requirements Addressed:
 * - Automate the reimbursement process and ensure data integrity (Technical Specification/13.5 Reimbursement Processing)
 */
class ReimbursementClass {
  employeeId: string;
  amount: number;
  currency: string;
  status: string;
  submissionDate: Date;
  approvalDate?: Date;
  processedDate?: Date;

  /**
   * Initializes a new instance of the Reimbursement class with the specified details.
   * Steps:
   * - Assign the employeeId to the reimbursement record.
   * - Set the amount and currency for the reimbursement.
   * - Initialize the status of the reimbursement (e.g., 'Pending', 'Approved', 'Processed').
   * - Record the submission date of the reimbursement.
   * - Optionally set the approval and processed dates if applicable.
   * Requirements Addressed:
   * - Capture all necessary details for processing and tracking reimbursements (Technical Specification/13.5 Reimbursement Processing)
   * @param employeeId - Employee's unique identifier.
   * @param amount - The amount to be reimbursed.
   * @param currency - The currency code (ISO).
   * @param status - The current status of reimbursement.
   * @param submissionDate - The date the reimbursement was submitted.
   * @param approvalDate - The date the reimbursement was approved.
   * @param processedDate - The date the reimbursement was processed.
   */
  constructor(
    employeeId: string,
    amount: number,
    currency: string,
    status: string = 'Pending',
    submissionDate: Date = new Date(),
    approvalDate?: Date,
    processedDate?: Date
  ) {
    // Assign the employeeId to the reimbursement record.
    this.employeeId = employeeId;

    // Set the amount and currency for the reimbursement.
    this.amount = amount;
    this.currency = currency;

    // Initialize the status of the reimbursement.
    this.status = status;

    // Record the submission date of the reimbursement.
    this.submissionDate = submissionDate;

    // Optionally set the approval and processed dates.
    this.approvalDate = approvalDate;
    this.processedDate = processedDate;
  }

  /**
   * Validates the reimbursement data against predefined business rules and constraints.
   * Returns true if the data is valid, otherwise false.
   * Steps:
   * - Check that the amount is a positive number.
   * - Ensure the currency is a supported ISO currency code.
   * - Verify that the status is one of the allowed values.
   * - Confirm that the submission date is not in the future.
   * Requirements Addressed:
   * - Validates data to ensure compliance with company policies (Technical Specification/13.5 Reimbursement Processing)
   * @returns {boolean} True if the data is valid, otherwise false.
   */
  validateReimbursement(): boolean {
    // Check that the amount is a positive number.
    if (this.amount <= 0) {
      return false;
    }

    // Ensure the currency is a supported ISO currency code.
    const supportedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];
    if (!supportedCurrencies.includes(this.currency)) {
      return false;
    }

    // Verify that the status is one of the allowed values.
    const allowedStatuses = ['Pending', 'Approved', 'Processed'];
    if (!allowedStatuses.includes(this.status)) {
      return false;
    }

    // Confirm that the submission date is not in the future.
    if (this.submissionDate > new Date()) {
      return false;
    }

    return true;
  }
}

// Load the class into the schema.
ReimbursementSchema.loadClass(ReimbursementClass);

// Export the Reimbursement model.
const Reimbursement: Model<IReimbursement> = mongoose.model<IReimbursement>('Reimbursement', ReimbursementSchema);

export default Reimbursement;