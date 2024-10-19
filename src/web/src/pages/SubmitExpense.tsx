// Third-party imports
import React, { useEffect, useState } from 'react'; // React version 17.0.2
import _ from 'lodash'; // Lodash version 4.17.21

// Internal imports
import ExpenseForm from '../components/ExpenseForm'; // To render the form for capturing and submitting expense details.
import Notifications from '../components/Notifications'; // To display notifications to the user regarding the status of their expense submission.
import { postData } from '../utils/api'; // To perform API POST requests for submitting expense data.
import { useAuthContext } from '../utils/contexts'; // To access authentication state and ensure the user is authenticated before submission.
import { validateEmail } from '../utils/validation'; // To validate email inputs within the form.
import { API_BASE_URL } from '../utils/constants'; // To construct API request URLs.

/**
 * SubmitExpensePage Component
 *
 * Renders the Submit Expense page, handling form input, validation, and submission.
 *
 * Requirements Addressed:
 * - Expense Submission (Technical Specification/13.2 Expense Submission)
 *   - Enable employees to efficiently capture and submit travel expenses through user-friendly web interfaces, incorporating automated data extraction and currency support.
 *   - TR-F002.2: Utilize OCR technology for automatic receipt scanning and data extraction.
 *   - TR-F002.3: Support multiple currencies with real-time conversion.
 *   - TR-F002.4: Allow attachment of digital receipts or photos of physical receipts.
 *   - TR-F002.5: Categorize expenses (e.g., meals, transportation, lodging).
 *
 * @returns {JSX.Element} The rendered page component.
 */
const SubmitExpensePage: React.FC = () => {
    // Access authentication context to ensure the user is authenticated
    const { isAuthenticated } = useAuthContext();

    // State for notifications
    const [notifications, setNotifications] = useState<{ type: string; message: string }[]>([]);

    // Effect to check user authentication status
    useEffect(() => {
        if (!isAuthenticated) {
            // User is not authenticated
            // Add notification or redirect user to login
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                {
                    type: 'error',
                    message: 'You must be logged in to submit expenses.',
                },
            ]);
            // TODO: Optionally redirect to login page
        }
    }, [isAuthenticated]);

    /**
     * Handles the submission of the expense form.
     *
     * Validates the input data and submits the expense data to the backend API.
     *
     * Steps:
     * - Validate inputs using validation utilities.
     *   - For example, validate email inputs with validateEmail utility.
     * - Use postData utility to submit expense data to the backend API.
     * - Update notifications based on the result of the submission.
     *
     * Requirements Addressed:
     * - Expense Submission (Technical Specification/13.2 Expense Submission)
     *   - TR-F002.2: Utilize OCR technology for automatic receipt scanning and data extraction.
     *   - TR-F002.3: Support multiple currencies with real-time conversion.
     *   - TR-F002.4: Allow attachment of digital receipts or photos of physical receipts.
     *   - TR-F002.5: Categorize expenses (e.g., meals, transportation, lodging).
     */
    const handleFormSubmit = async (expenseData: any) => {
        // Perform necessary validation on expenseData
        // For example, validate required fields, amounts, currency codes, categories

        // Example: Validate email if included in expenseData
        if (expenseData.email && !validateEmail(expenseData.email)) {
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                {
                    type: 'error',
                    message: 'Invalid email address.',
                },
            ]);
            return;
        }

        // Additional validations can be added here using lodash utilities and custom validation functions

        try {
            // Submit the expense data to the backend API
            const response = await postData(`${API_BASE_URL}/expenses`, expenseData);

            // Handle successful submission
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                {
                    type: 'success',
                    message: 'Expense submitted successfully.',
                },
            ]);

            // TODO: Optionally reset the form or redirect the user after successful submission
        } catch (error) {
            // Handle errors during submission
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                {
                    type: 'error',
                    message: 'Failed to submit expense. Please try again later.',
                },
            ]);
        }
    };

    return (
        <div className="submit-expense-page">
            {/* Render Notifications component to display feedback to the user
                Requirements Addressed:
                - Provide real-time feedback on expense submission status
            */}
            <Notifications notifications={notifications} />

            {/* Render the ExpenseForm component for capturing expense details
                ExpenseForm is responsible for:
                - Capturing expense details including amounts, categories, receipts
                - Utilizing OCR for receipt scanning (TR-F002.2)
                - Supporting multiple currencies with real-time conversion (TR-F002.3)
                - Allowing attachment of digital receipts (TR-F002.4)
                - Categorizing expenses (TR-F002.5)
            */}
            <ExpenseForm onSubmit={handleFormSubmit} />

            {/* Styles are applied via className and external CSS to ensure a consistent and user-friendly interface
                Requirements Addressed:
                - Provide a user-friendly interface for expense submission (Technical Specification/13.2)
            */}
        </div>
    );
};

export default SubmitExpensePage;