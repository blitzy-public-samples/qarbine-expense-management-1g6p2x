// Import necessary modules and components

// React import
import React, { useState } from 'react'; // React 17.0.2

// Internal utility and context imports
import { useAuthContext } from '../utils/contexts'; // To manage and access authentication state within the page.
import { validateForm } from '../utils/validation'; // To validate form data before submission.

// Internal component imports
import MobileHeader from '../components/MobileHeader'; // Provides a consistent header across the mobile application.
import MobileFooter from '../components/MobileFooter'; // Provides a consistent footer with navigation links.
import ExpenseCapture from '../components/ExpenseCapture'; // Allows users to input expense details and upload receipts.
import DigitalWallet from '../components/DigitalWallet'; // Manages digital transactions and balances.
import Notifications from '../components/Notifications'; // Displays user notifications and alerts.
import OfflineSync from '../components/OfflineSync'; // Manages data synchronization when offline.

// External library import
import _ from 'lodash'; // Lodash 4.17.21 - Provides utility functions for data manipulation.

// Import styles
import '../styles/CaptureExpense.css'; // Applies styles to ensure a consistent and user-friendly interface.

/**
 * CaptureExpensePage Component
 * 
 * Renders the Capture Expense page, allowing users to capture and submit travel expenses.
 * 
 * Requirements Addressed:
 * - Expense Submission (Technical Specification/13.2 Expense Submission)
 *   - Enable employees to efficiently capture and submit travel expenses through user-friendly mobile interfaces, incorporating automated data extraction and currency support.
 * 
 * Steps:
 * 1. Import necessary components, hooks, and utilities.
 * 2. Initialize state variables for form data and receipt images.
 * 3. Use useAuthContext to access authentication state.
 * 4. Define a function to handle form submission, including validation and API interaction.
 * 5. Render the MobileHeader and MobileFooter for consistent navigation.
 * 6. Render the ExpenseCapture component for inputting expense details.
 * 7. Include the DigitalWallet component for managing transactions.
 * 8. Display notifications using the Notifications component.
 * 9. Manage offline data synchronization with the OfflineSync component.
 * 10. Apply styles to ensure a consistent and user-friendly interface.
 * 
 * @returns {JSX.Element} A JSX element representing the Capture Expense page.
 */
const CaptureExpensePage: React.FC = () => {
    // Access authentication state using useAuthContext
    // This allows personalization based on the authenticated user
    const { user } = useAuthContext();

    // Initialize state variables for form data and receipt images
    // Manages the input data for the expense being captured
    const [expenseData, setExpenseData] = useState<{
        amount: string;
        category: string;
        currency: string;
        date: string;
        notes: string;
        receipt: File | null;
    }>({
        amount: '',
        category: '',
        currency: '',
        date: '',
        notes: '',
        receipt: null,
    });

    // State to manage form submission status
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // State to manage form validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    /**
     * handleSubmit
     * 
     * Handles form submission process, including validation and API interaction.
     * 
     * Requirements Addressed:
     * - Expense Submission (Technical Specification/13.2 Expense Submission)
     * 
     * Validates the form data using 'validateForm' utility and submits to the backend API.
     */
    const handleSubmit = async () => {
        // Validate form data before submission
        const validationErrors = validateForm(expenseData);
        if (!_.isEmpty(validationErrors)) {
            // Update errors state if validation fails
            setErrors(validationErrors);
            return;
        }

        // Set submitting state to true to indicate process initiation
        setIsSubmitting(true);

        try {
            // Submit the expense data to the backend API
            await submitExpense(expenseData);

            // Handle successful submission
            // For example, reset form, show success notification, etc.
            setExpenseData({
                amount: '',
                category: '',
                currency: '',
                date: '',
                notes: '',
                receipt: null,
            });
            setErrors({});
            // Optionally, display success notification using Notifications component
        } catch (error) {
            // Handle submission errors
            // For example, display error notification using Notifications component
        } finally {
            // Reset submitting state after process completion
            setIsSubmitting(false);
        }
    };

    /**
     * submitExpense
     * 
     * Simulates API interaction to submit expense data.
     * In a real scenario, use 'useFetchData' hook to perform the API call.
     * 
     * @param data - The expense data to be submitted
     */
    const submitExpense = async (data: typeof expenseData) => {
        // TODO: Replace with actual API call using 'useFetchData' hook
        // This is a placeholder to simulate network request
        return new Promise<void>((resolve) => setTimeout(resolve, 1000));
    };

    // Render the Capture Expense page UI
    return (
        <>
            {/* Render the MobileHeader for consistent navigation across the app */}
            <MobileHeader />

            {/* Main content area */}
            <div className="capture-expense-page">
                {/* Display user notifications and alerts */}
                <Notifications />

                {/* Render the ExpenseCapture component for inputting expense details */}
                <ExpenseCapture
                    expenseData={expenseData}
                    setExpenseData={setExpenseData}
                    errors={errors}
                />

                {/* Include the DigitalWallet component for managing transactions */}
                <DigitalWallet user={user} />

                {/* Submit button for submitting the expense */}
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="submit-button"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Expense'}
                </button>
            </div>

            {/* Manage offline data synchronization */}
            <OfflineSync />

            {/* Render the MobileFooter for consistent navigation across the app */}
            <MobileFooter />
        </>
    );
};

export default CaptureExpensePage;