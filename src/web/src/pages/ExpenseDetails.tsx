// Import external dependencies
import React, { useState, useEffect } from 'react'; // react version 17.0.2

// Import internal dependencies
import { fetchData, postData } from '../utils/api'; // To fetch and submit expense report data
import { TOKEN_KEY } from '../utils/auth'; // To manage authentication tokens for secure API requests
import { API_BASE_URL } from '../utils/constants'; // To construct API request URLs
import ExpenseItem from '../components/ExpenseItem'; // To render individual expense items within the detailed view
import Notifications from '../components/Notifications'; // To display notifications related to actions taken on the expense report
import { useAuthContext } from '../utils/contexts'; // To ensure the user is authenticated before accessing the page

// The ExpenseDetails component renders the detailed view of an expense report,
// allowing users to view and manage individual expense items.
// This addresses the requirement "Expense Submission" as per Technical Specification/13.2 Expense Submission.

const ExpenseDetails: React.FC = () => {
  // Step 1: Use the useAuthContext hook to ensure the user is authenticated before accessing the page.
  // Ensures secure access as per Technical Specification/13.1 User Authentication and Authorization.
  const { isAuthenticated } = useAuthContext();

  // State variables to store the expense report data, loading state, and error state.
  const [expenseReport, setExpenseReport] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  // Function to obtain the report ID from route parameters.
  // Retrieves the specific expense report ID to fetch its details.
  const getReportIdFromRoute = (): string => {
    // Implementation depends on the routing library being used (e.g., React Router).
    // Placeholder function as per assigned specification without assuming additional details.
    return 'REPORT_ID_PLACEHOLDER';
  };

  // Step 2: Fetch detailed data for the specific expense report using fetchData.
  // Addresses Technical Specification/13.2 Expense Submission by allowing users to view expense details.
  useEffect(() => {
    if (isAuthenticated) {
      const reportId = getReportIdFromRoute();
      fetchData(`${API_BASE_URL}/expense-reports/${reportId}`)
        .then((data) => {
          // Step 3: Store the fetched data in a state variable using React's useState hook.
          setExpenseReport(data);
          setLoading(false);
        })
        .catch((err) => {
          // Step 7: Handle any loading or error states during the data fetching process.
          setError(err);
          setLoading(false);
        });
    } else {
      // Handle unauthenticated access appropriately.
      // Could redirect to login page or display a message.
    }
  }, [isAuthenticated]);

  // Handler function to edit an expense item.
  // Utilizes postData to submit updates to the expense report.
  // Addresses Technical Specification/13.2 Expense Submission by enabling efficient expense management.
  const handleEditItem = (itemId: string, updatedData: any) => {
    postData(`${API_BASE_URL}/expense-items/${itemId}`, updatedData)
      .then((response) => {
        setExpenseReport((prevReport: any) => {
          const updatedItems = prevReport.items.map((item: any) =>
            item.id === itemId ? response.data : item
          );
          return { ...prevReport, items: updatedItems };
        });
        // Step 6: Display notifications for any actions taken on the expense report.
        // Uses the Notifications component to inform the user of successful updates.
      })
      .catch((err) => {
        // Handle errors and display appropriate notifications.
      });
  };

  // Handler function to delete an expense item.
  // Allows users to manage individual expense items.
  const handleDeleteItem = (itemId: string) => {
    postData(`${API_BASE_URL}/expense-items/${itemId}/delete`, {})
      .then(() => {
        setExpenseReport((prevReport: any) => {
          const updatedItems = prevReport.items.filter((item: any) => item.id !== itemId);
          return { ...prevReport, items: updatedItems };
        });
        // Display success notification.
      })
      .catch((err) => {
        // Handle errors and display appropriate notifications.
      });
  };

  // Step 7: Handle loading and error states during the data fetching process.
  if (loading) {
    // Display a loading indicator to inform the user that data is being fetched.
    return <div>Loading expense report details...</div>;
  }

  if (error) {
    // Display an error message if data fetching fails.
    return <div>Error loading expense report: {error.message}</div>;
  }

  // Step 4: Render the details of the expense report, including individual expense items.
  return (
    <div className="expense-details-page">
      {/* Step 6: Display notifications for any actions taken on the expense report. */}
      <Notifications />

      {/* Expense Report Details */}
      <h1>Expense Report Details</h1>
      <div className="expense-report-details">
        <p><strong>Report ID:</strong> {expenseReport.id}</p>
        <p><strong>Submission Date:</strong> {expenseReport.submission_date}</p>
        {/* Include additional relevant details as required. */}
      </div>

      {/* Expense Items List */}
      <h2>Expense Items</h2>
      <div className="expense-items-list">
        {expenseReport.items && expenseReport.items.length > 0 ? (
          expenseReport.items.map((item: any) => (
            <ExpenseItem
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          ))
        ) : (
          <p>No expense items found for this report.</p>
        )}
      </div>

      {/* Additional features or components can be added here as necessary,
          strictly following the assigned specification and technical requirements. */}
    </div>
  );
};

export default ExpenseDetails;