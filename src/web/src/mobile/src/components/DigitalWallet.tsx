// React imports
import React, { useEffect, useState } from 'react'; // React version 17.0.2

// Internal imports
import { useAuthContext } from '../utils/contexts'; // Access authentication context for user-specific data (Requirement TR-F001.3, Technical Specification/13.1 User Authentication and Authorization)
import { useFetchData } from '../utils/hooks'; // Fetch transaction data from the API (Requirement TR-F008.4, Technical Specification/13.8 Mobile Features)
import { formatCurrency } from '../utils/helpers'; // Format transaction amounts into currency strings (Requirement TR-F002.3, Technical Specification/13.2 Expense Submission)
import { IconComponent, IconType } from '../assets/icons'; // Display icons for different transaction types
import logoSVG from '../assets/logo.svg'; // Display the company logo within the digital wallet (Ensures brand consistency as per User Interface Design/3. Consistency and Standards)

// Styles
import '../styles/DigitalWallet.css'; // Apply styles to the Digital Wallet component (Requirement TR-F008.1, Technical Specification/13.8 Mobile Features)

// Interface representing a transaction
interface Transaction {
  id: string; // Unique identifier for the transaction
  date: string; // Date of the transaction
  amount: number; // Amount of the transaction
  currency: string; // Currency of the transaction
  type: string; // Type of transaction (e.g., 'expense', 'reimbursement')
  description: string; // Description of the transaction
}

/**
 * DigitalWallet Component
 *
 * Renders the Digital Wallet interface, displaying the user's balance and transaction history.
 *
 * Addresses the following requirements:
 * - Technical Specification/13.8 Mobile Features
 *   - TR-F008.4: Include a digital wallet for storing receipts and travel documents.
 * - Technical Specification/13.2 Expense Submission
 *   - TR-F002.3: Support multiple currencies with real-time conversion.
 * - Technical Specification/13.1 User Authentication and Authorization
 *   - TR-F001.3: Role-based access control for user-specific data.
 *
 * @returns JSX.Element - A JSX element representing the digital wallet interface.
 */
const DigitalWallet: React.FC = () => {
  // Step 1: Use useAuthContext to access the current user's authentication state.
  // Accesses currentUser to personalize the experience (Requirement TR-F001.3)
  const { currentUser } = useAuthContext();

  // State variables for transactions, loading status, error messages, and user balance
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);

  // Step 2: Use useFetchData to retrieve the user's transaction history from the API.
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Fetch transaction data from the API endpoint
        // Endpoint follows RESTful API design as per System Design/API Design
        const data: Transaction[] = await useFetchData(`/api/users/${currentUser.id}/transactions`);
        setTransactions(data);
        setLoading(false);

        // Calculate the user's total balance by summing transaction amounts
        const totalBalance = data.reduce((accumulator, transaction) => {
          return accumulator + transaction.amount;
        }, 0);
        setBalance(totalBalance);
      } catch (err) {
        // Handle errors during data fetching
        setError('Failed to fetch transactions.');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [currentUser.id]);

  // Step 3: Format the user's balance using formatCurrency for display.
  // Ensures amounts are displayed in the user's preferred currency (Requirement TR-F002.3)
  const formattedBalance = formatCurrency(balance, currentUser.currency);

  if (loading) {
    // Render a loading indicator while transactions are being fetched
    return (
      <div className="digital-wallet">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    // Display an error message if data fetching fails
    return (
      <div className="digital-wallet">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="digital-wallet">
      {/* Step 4: Render the company logo using logoSVG for brand consistency.
          Addresses UI consistency as per User Interface Design/3. Consistency and Standards */}
      <div className="wallet-header">
        <img src={logoSVG} alt="Company Logo" className="company-logo" />
        <h1>Digital Wallet</h1>
      </div>

      {/* Display the user's current balance */}
      <div className="wallet-balance">
        <h2>Your Balance</h2>
        <p>{formattedBalance}</p>
      </div>

      {/* Display the transaction history */}
      <div className="transaction-history">
        <h2>Transaction History</h2>
        <ul>
          {transactions.map((transaction) => {
            // Format the transaction amount for display
            const formattedAmount = formatCurrency(transaction.amount, transaction.currency);

            return (
              <li key={transaction.id} className="transaction-item">
                {/* Step 5: Display each transaction with an appropriate icon using IconComponent.
                    Enhances user experience as per Technical Specification/13.8 Mobile Features */}
                <IconComponent type={transaction.type as IconType} />

                <div className="transaction-details">
                  <span className="transaction-description">{transaction.description}</span>
                  <span className="transaction-date">{transaction.date}</span>
                </div>
                <div className="transaction-amount">{formattedAmount}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DigitalWallet;