// src/web/src/components/ExpenseForm.tsx

// Importing React dependencies
import React, { useState, useEffect } from 'react'; // react version 17.0.2

// Importing lodash utility library
import _ from 'lodash'; // lodash version 4.17.21

// Importing internal utilities and constants
import { fetchData, postData } from '../utils/api'; // To perform API GET and POST requests
import { TOKEN_KEY } from '../utils/auth'; // To manage authentication tokens during form submission
import { useAuthContext } from '../utils/contexts'; // To access authentication state and ensure the user is authenticated
import { validateEmail } from '../utils/validation'; // To validate email inputs within the form
import { API_BASE_URL } from '../utils/constants'; // To construct API request URLs

// Importing CSS styles for the form component
import '../styles/ExpenseForm.css'; // To style the form component for a consistent and user-friendly appearance

/**
 * ExpenseForm Component
 *
 * Description:
 * Renders the expense submission form and handles form input, validation, and submission.
 *
 * Requirements Addressed:
 * - Expense Submission (Technical Specification/13.2 Expense Submission)
 *   - Enables employees to efficiently capture and submit travel expenses through user-friendly interfaces.
 *   - Incorporates automated data extraction and currency support.
 *
 * Steps:
 * 1. Initialize form state using React's useState hook.
 * 2. Use useAuthContext to ensure the user is authenticated.
 * 3. Define a handleSubmit function to validate form inputs and submit data using postData.
 * 4. Render form fields for expense details, including amount, category, and receipt upload.
 * 5. Apply styles from ExpenseForm.css to ensure a consistent and user-friendly interface.
 */
const ExpenseForm: React.FC = () => {
  // Step 1: Initialize form state using React's useState hook
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('USD');
  const [category, setCategory] = useState<string>('');
  const [expenseDate, setExpenseDate] = useState<string>('');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  // Step 2: Use useAuthContext to ensure the user is authenticated
  const { authState } = useAuthContext();

  // Fetch expense categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch available categories from the API
        const data = await fetchData(`${API_BASE_URL}/categories`);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Step 3: Define handleSubmit function to validate inputs and submit data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Basic form validation
    if (amount <= 0) {
      setError('Amount must be greater than zero.');
      setIsSubmitting(false);
      return;
    }
    if (!category) {
      setError('Please select a category.');
      setIsSubmitting(false);
      return;
    }
    if (!expenseDate) {
      setError('Please select the expense date.');
      setIsSubmitting(false);
      return;
    }
    if (!receipt) {
      setError('Please attach a receipt.');
      setIsSubmitting(false);
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('amount', amount.toString());
    formData.append('currency', currency);
    formData.append('category', category);
    formData.append('expenseDate', expenseDate);
    formData.append('notes', notes);
    formData.append('receipt', receipt);

    try {
      // Submit data using postData function
      const response = await postData(`${API_BASE_URL}/expenses`, formData, {
        headers: {
          Authorization: `Bearer ${authState?.token}`,
        },
      });
      console.log('Expense submitted successfully:', response);
      // Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error('Error submitting expense:', error);
      setError('An error occurred while submitting the expense. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setAmount(0);
    setCurrency('USD');
    setCategory('');
    setExpenseDate('');
    setReceipt(null);
    setNotes('');
  };

  // Handle receipt file upload
  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceipt(e.target.files[0]);
    }
  };

  // Step 4: Render form fields for expense details
  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      {/* Amount Field */}
      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
        />
      </div>

      {/* Currency Field */}
      <div className="form-group">
        <label htmlFor="currency">Currency:</label>
        <select
          id="currency"
          name="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          {/* Additional currencies can be added here */}
        </select>
      </div>

      {/* Category Field */}
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {_.startCase(cat)}
            </option>
          ))}
        </select>
      </div>

      {/* Expense Date Field */}
      <div className="form-group">
        <label htmlFor="expenseDate">Expense Date:</label>
        <input
          type="date"
          id="expenseDate"
          name="expenseDate"
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
          required
        />
      </div>

      {/* Notes Field */}
      <div className="form-group">
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter any additional details (optional)"
        />
      </div>

      {/* Receipt Upload Field */}
      <div className="form-group">
        <label htmlFor="receipt">Receipt:</label>
        <input
          type="file"
          id="receipt"
          name="receipt"
          accept="image/*,application/pdf"
          onChange={handleReceiptChange}
          required
        />
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Submit Button */}
      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Expense'}
      </button>
    </form>
  );
};

// Step 5: Apply styles from ExpenseForm.css for consistent UI
// Styles are imported at the top of the file

export default ExpenseForm;