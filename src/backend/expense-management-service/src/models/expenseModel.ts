// Import Mongoose for schema and model definitions
import mongoose, { Document, Schema, Model } from 'mongoose'; // mongoose version 5.13.8

// Import Receipt model to handle receipt data associated with expenses
import { Receipt } from './receiptModel';

// Import convertCurrency utility to convert currency amounts for expenses
import { convertCurrency } from '../utils/currencyConverter';

// Import validateExpense utility to validate expenses against company policies
import { validateExpense } from '../utils/policyValidator';

// Interface representing an Expense document
/**
 * Interface representing an Expense document.
 * Requirements Addressed:
 * - Expense Submission (Technical Specification/13.2 Expense Submission)
 *   - Enables employees to capture and submit travel expenses efficiently.
 * - Policy and Compliance Engine (Technical Specification/13.3 Policy and Compliance Engine)
 *   - Ensures expense submissions adhere to company policies and international tax laws.
 */
export interface ExpenseDocument extends Document {
    // The amount of the expense
    amount: number;
    // The currency of the expense
    currency: string;
    // The category of the expense (e.g., meals, transportation)
    category: string;
    // The receipts associated with the expense
    receipts: mongoose.Types.Array<mongoose.Types.ObjectId>; // References to Receipt documents
    // The date and time when the expense was created
    createdAt: Date;
    // The date and time when the expense was last updated
    updatedAt: Date;
    // Method to convert the amount to a target currency
    convertAmountToCurrency(targetCurrency: string): Promise<number>;
    // Method to validate the expense against company policies
    validatePolicyCompliance(): Promise<boolean>;
}

// Schema for Expense
/**
 * ExpenseSchema defines the structure of expense data.
 * Requirements Addressed:
 * - TR-F002.1 Provide a mobile app for easy expense capture on-the-go.
 * - TR-F002.3 Support multiple currencies with real-time conversion.
 * - TR-F002.5 Categorize expenses (e.g., meals, transportation, lodging).
 * - TR-F003.2 Perform real-time policy checks during expense submission.
 */
const ExpenseSchema: Schema<ExpenseDocument> = new Schema({
    // Amount of the expense
    amount: {
        type: Number,
        required: true,
    },
    // Currency code of the expense (e.g., USD, EUR)
    currency: {
        type: String,
        required: true,
    },
    // Category of the expense
    category: {
        type: String,
        required: true,
    },
    // Associated receipts for the expense
    receipts: [{
        type: Schema.Types.ObjectId,
        ref: 'Receipt',
    }],
    // Timestamp when the expense was created
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // Timestamp when the expense was last updated
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update 'updatedAt' before saving
ExpenseSchema.pre<ExpenseDocument>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Method to convert the expense amount to a target currency
ExpenseSchema.methods.convertAmountToCurrency = async function(targetCurrency: string): Promise<number> {
    // Converts the expense amount to the target currency using 'convertCurrency' utility.
    // Requirement Addressed:
    // - TR-F002.3 Support multiple currencies with real-time conversion (Technical Specification/13.2 Expense Submission)
    const convertedAmount = await convertCurrency(this.amount, this.currency, targetCurrency);
    return convertedAmount;
};

// Method to validate the expense against company policies
ExpenseSchema.methods.validatePolicyCompliance = async function(): Promise<boolean> {
    // Validates the expense against company policies using 'validateExpense' utility.
    // Requirement Addressed:
    // - TR-F003.2 Perform real-time policy checks during expense submission (Technical Specification/13.3 Policy and Compliance Engine)
    const isValid = await validateExpense(this);
    return isValid;
};

// Export the Expense model
/**
 * The Expense model represents expenses in the database.
 * Requirements Addressed:
 * - Enables efficient expense capture and submission.
 * - Ensures compliance with company policies and international tax laws.
 */
export const Expense: Model<ExpenseDocument> = mongoose.model<ExpenseDocument>('Expense', ExpenseSchema);