// External Dependencies
import React, { useState } from 'react'; // React version 17.0.2
import _ from 'lodash'; // Lodash version 4.17.21

// Internal Dependencies
import { useAuthContext } from '../utils/contexts'; // To manage and access authentication state within the component.
import { useFetchData } from '../utils/hooks'; // To fetch data from APIs within the component.
import { validateForm } from '../utils/validation'; // To validate form data before submission.
import { IconComponent } from '../assets/icons'; // To display icons within the component.

// Styles
import '../styles/ExpenseCapture.css'; // To apply styles specific to the Expense Capture component.

/**
 * ExpenseCapture Component
 * 
 * Renders the Expense Capture interface, allowing users to input expense details and upload receipts.
 * 
 * Requirements Addressed:
 * - Expense Submission (Technical Specification/13.2 Expense Submission)
 *   - TR-F002.1: Provide a mobile app for easy expense capture on-the-go
 *   - TR-F002.2: Utilize OCR technology for automatic receipt scanning and data extraction
 *   - TR-F002.3: Support multiple currencies with real-time conversion
 *   - TR-F002.4: Allow attachment of digital receipts or photos of physical receipts
 *   - TR-F002.5: Categorize expenses (e.g., meals, transportation, lodging)
 *   - TR-F002.8: Provide an offline mode for expense entry when internet connection is unavailable
 * 
 * @returns {JSX.Element} A JSX element representing the Expense Capture interface.
 */
const ExpenseCapture: React.FC = () => {
  // Access authentication state
  const { authState } = useAuthContext(); // Dependency from 'src/web/src/mobile/src/utils/contexts.ts'

  // State variables for form data
  const [expenseData, setExpenseData] = useState({
    category: '', // Expense category (TR-F002.5)
    amount: '', // Expense amount
    currency: '', // Expense currency (TR-F002.3)
    date: '', // Expense date
    notes: '', // Additional notes
  });

  // State variable for receipt image
  const [receiptImage, setReceiptImage] = useState<File | null>(null); // For handling receipt uploads (TR-F002.4)

  // State variable for submission status
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Function to handle input changes
  /**
   * Handles changes in form inputs and updates the expenseData state.
   * 
   * @param event - The change event from input fields.
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setExpenseData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle receipt image upload
  /**
   * Handles the receipt image upload process.
   * Allows users to attach digital receipts or photos.
   * 
   * Addresses:
   * - TR-F002.4: Allow attachment of digital receipts or photos of physical receipts
   */
  const handleReceiptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setReceiptImage(event.target.files[0]);
    }
  };

  // Function to handle form submission
  /**
   * Submits the expense data to the backend API after validation.
   * Utilizes offline mode handling if the internet connection is unavailable.
   * 
   * Addresses:
   * - TR-F002.1: Provide a mobile app for easy expense capture on-the-go
   * - TR-F002.8: Provide an offline mode for expense entry when internet connection is unavailable
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Validate form data before submission
    const errors = validateForm(expenseData); // Dependency from 'src/web/src/mobile/src/utils/validation.ts'
    if (!_.isEmpty(errors)) {
      // TODO: Display validation errors to the user
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('category', expenseData.category);
    formData.append('amount', expenseData.amount);
    formData.append('currency', expenseData.currency);
    formData.append('date', expenseData.date);
    formData.append('notes', expenseData.notes);
    if (receiptImage) {
      formData.append('receipt', receiptImage);
    }

    try {
      // Submit the expense data to the API
      // Uses useFetchData hook for API interaction (Dependency from 'src/web/src/mobile/src/utils/hooks.ts')
      await useFetchData('/api/expenses', 'POST', formData);

      // Reset form fields upon successful submission
      setExpenseData({
        category: '',
        amount: '',
        currency: '',
        date: '',
        notes: '',
      });
      setReceiptImage(null);
      setIsSubmitting(false);
      // TODO: Notify user of successful submission
    } catch (error) {
      // TODO: Handle submission errors (e.g., display error message)
      setIsSubmitting(false);
    }
  };

  return (
    <div className="expense-capture-container">
      <h1>Capture Expense</h1>
      <form onSubmit={handleSubmit}>
        {/* Expense Category Field */}
        <label htmlFor="category">Category</label>
        {/* Addresses TR-F002.5: Categorize expenses */}
        <select
          id="category"
          name="category"
          value={expenseData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          <option value="meals">Meals</option>
          <option value="transportation">Transportation</option>
          <option value="lodging">Lodging</option>
          <option value="miscellaneous">Miscellaneous</option>
          {/* Additional categories can be added here */}
        </select>

        {/* Amount Field */}
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={expenseData.amount}
          onChange={handleInputChange}
          required
        />

        {/* Currency Field */}
        <label htmlFor="currency">Currency</label>
        {/* Supports TR-F002.3: Multiple currencies with real-time conversion */}
        <select
          id="currency"
          name="currency"
          value={expenseData.currency}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Currency options can be extended to include all supported currencies */}
        </select>

        {/* Date Field */}
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={expenseData.date}
          onChange={handleInputChange}
          required
        />

        {/* Notes Field */}
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={expenseData.notes}
          onChange={handleInputChange}
        />

        {/* Receipt Upload Field */}
        <label htmlFor="receipt">Upload Receipt</label>
        <input
          type="file"
          id="receipt"
          name="receipt"
          accept="image/*"
          onChange={handleReceiptUpload}
        />
        {/* Displays the name of the uploaded receipt file */}
        {receiptImage && <p>Uploaded Receipt: {receiptImage.name}</p>}

        {/* Submit Button */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseCapture;