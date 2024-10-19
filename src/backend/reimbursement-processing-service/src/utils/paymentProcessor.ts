// External Imports
import Stripe from 'stripe'; // Stripe API (v8.174.0): To process payments and handle financial transactions. See 'dependencies' in file specification.

// Internal Imports
import { Reimbursement } from '../models/reimbursementModel'; // To access and manipulate reimbursement data. See 'dependencies' in file specification.

// Globals
// Stripe API Key for authentication with Stripe payment gateway.
// As specified in 'globals' of the file specification.
// For security, we use an environment variable, addressing 'SEC-F002.3 Implement secure key management practices, including regular key rotation' in 'Security Considerations'.
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || 'Your Stripe API Key'; // Replace 'Your Stripe API Key' with your actual Stripe API Key

// Initialize the Stripe client using the STRIPE_API_KEY.
// This step addresses 'Initialize the Stripe client using the STRIPE_API_KEY.' from the function steps.
// Also fulfills part of 'Automate the reimbursement process for approved expenses, integrating seamlessly with payroll systems and supporting multiple payment methods.' in 'Technical Specification/13.5 Reimbursement Processing'.
const stripe = new Stripe(STRIPE_API_KEY, { apiVersion: '2020-08-27' });

/**
 * Processes a payment for a given reimbursement using the Stripe API.
 *
 * This function automates the reimbursement process, addressing the requirement:
 * 'Automate the reimbursement process for approved expenses, integrating seamlessly with payroll systems and supporting multiple payment methods.'
 * Located in 'Technical Specification/13.5 Reimbursement Processing'.
 *
 * @param {Reimbursement} reimbursement - The reimbursement data to process payment for.
 * @returns {Promise<boolean>} - A promise that resolves to true if the payment is processed successfully, otherwise false.
 */
export async function processPayment(reimbursement: Reimbursement): Promise<boolean> {
    try {
        // Create a payment intent with the reimbursement amount and currency.
        // Corresponds to 'Create a payment intent with the reimbursement amount and currency.' in the function steps.
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateAmountInCents(reimbursement.amount),
            currency: reimbursement.currency.toLowerCase(),
            metadata: {
                reimbursementId: reimbursement.id.toString(),
            },
        });

        // Confirm the payment intent to execute the transaction.
        // Addresses 'Confirm the payment intent to execute the transaction.' in the function steps.
        const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id);

        // Check if the payment was successful.
        if (confirmedPaymentIntent.status === 'succeeded') {
            // Log the transaction details for auditing purposes.
            // This fulfills 'Log the transaction details for auditing purposes.' in the function steps.
            // Also addresses 'SEC-F001.5 Log and monitor all authentication and authorization activities for auditing purposes' in 'Security Considerations'.
            console.log(`Payment successful for Reimbursement ID: ${reimbursement.id}, PaymentIntent ID: ${confirmedPaymentIntent.id}`);

            // Return true if the payment is successful.
            return true;
        } else {
            // Handle unsuccessful payment attempt.
            console.error(`Payment failed for Reimbursement ID: ${reimbursement.id}, Status: ${confirmedPaymentIntent.status}`);
            return false;
        }
    } catch (error) {
        // Catch errors and return false.
        // Corresponds to 'Return true if the payment is successful, otherwise catch errors and return false.' in the function steps.
        // Log the error for auditing and troubleshooting purposes.
        console.error(`Error processing payment for Reimbursement ID: ${reimbursement.id}. Error: ${error.message}`);
        return false;
    }
}

/**
 * Helper function to convert amount to the smallest currency unit (e.g., cents).
 * Ensures compatibility with Stripe's amount requirements.
 * 
 * @param {number} amount - The amount in standard currency units (e.g., dollars).
 * @returns {number} - The amount converted to the smallest currency unit.
 */
function calculateAmountInCents(amount: number): number {
    return Math.round(amount * 100);
}