/*
  ExpenseList Component
  ---------------------
  This component defines the ExpenseList, which is responsible for displaying a list of expense items.
  It fetches expense data from the backend, manages the state of the expense list,
  and renders each expense using the ExpenseItem component.

  Requirements Addressed:
  - **Expense Submission**
    - *Technical Specification/13.2 Expense Submission*
    - Description: Enable employees to efficiently capture and submit travel expenses through user-friendly
      mobile and web interfaces, incorporating automated data extraction and currency support.

  This component contributes to providing a user-friendly web interface for employees to
  view and manage their submitted expenses, aligning with the goal to **Simplify Expense Management**
  outlined in *Technical Specification/1.3 System Objectives*.
*/

/*
  Importing necessary modules and components
  ------------------------------------------
  - External Dependencies:
    - `react` version 17.0.2: To create the ExpenseList component as a React component.
  - Internal Dependencies:
    - `useAuthContext` from '../utils/contexts.ts': To manage and access authentication state within the component.
    - `fetchData` from '../utils/api.ts': To fetch the list of expenses from the backend.
    - `ExpenseItem` from './ExpenseItem.tsx': To render each individual expense item within the list.
    - `API_BASE_URL` from '../utils/constants.ts': To construct API request URLs for fetching expense data.
*/

import React, { useState, useEffect } from 'react'; // react version 17.0.2
import { useAuthContext } from '../utils/contexts';
import { fetchData } from '../utils/api';
import ExpenseItem from './ExpenseItem';
import { API_BASE_URL } from '../utils/constants';

/*
  Defining the Expense interface
  ------------------------------
  This interface represents the structure of an expense item retrieved from the backend.
  It ensures type safety and clarity when working with expense data within the component.
*/

interface Expense {
  id: number;
  date: string;
  category: string;
  amount: number;
  currency: string;
  description: string;
  // Additional fields can be added as required
}

/*
  ExpenseList Component Definition
  --------------------------------
  The ExpenseList component is responsible for:

  - **Fetching expense data** from the backend when the component mounts.
  - **Managing the state** of the expense list, including loading and error states.
  - **Rendering** each expense using the ExpenseItem component.

  Steps as per the specification:

  1. Use the `useAuthContext` hook to ensure the user is authenticated before fetching expenses.
  2. Call the `fetchData` function with the appropriate endpoint to retrieve the list of expenses.
  3. Store the fetched expenses in a state variable using React's `useState` hook.
  4. Map over the list of expenses and render an `ExpenseItem` component for each expense.
  5. Handle any loading or error states during the data fetching process.
*/

const ExpenseList: React.FC = () => {
  /*
    Step 1: Ensure the user is authenticated
    ----------------------------------------
    - We use the `useAuthContext` hook from the authentication context to check if the user is authenticated.
    - This aligns with security considerations mentioned in *Technical Specification/Security and Compliance*.
  */
  const { isAuthenticated } = useAuthContext();

  /*
    Step 3: State management using React's useState hook
    ----------------------------------------------------
    - `expenses`: Stores the list of expenses fetched from the backend.
    - `loading`: Indicates whether the data is currently being loaded.
    - `error`: Stores any error messages encountered during data fetching.
  */
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /*
    Data fetching with useEffect
    ----------------------------
    - We use the `useEffect` hook to fetch expense data when the component mounts.
    - The dependency array includes `isAuthenticated` to refetch data if authentication status changes.
  */
  useEffect(() => {
    // Check if the user is authenticated before proceeding
    if (!isAuthenticated) {
      setLoading(false);
      setError('User not authenticated.');
      return;
    }

    /*
      Step 2: Fetch expenses from the backend
      ---------------------------------------
      - We define an asynchronous function `fetchExpenses` to handle the API call.
      - The API endpoint is constructed using `API_BASE_URL`.
      - This step aligns with *Technical Specification/13.2 Expense Submission*, emphasizing efficient data retrieval.
    */
    const fetchExpenses = async () => {
      try {
        const endpoint = `${API_BASE_URL}/expenses`;
        const data = await fetchData(endpoint);
        setExpenses(data); // Step 3: Store the fetched expenses in the state
        setLoading(false);
      } catch (err) {
        // Step 5: Handle any errors during the data fetching process
        setError('Failed to fetch expenses.');
        setLoading(false);
      }
    };

    fetchExpenses(); // Initiate the data fetching process
  }, [isAuthenticated]);

  /*
    Rendering the component
    -----------------------
    - We render different UI elements based on the current state (loading, error, or data ready).
    - This contributes to **Improve User Experience** as outlined in *Technical Specification/1.3 System Objectives*.
  */
  return (
    <div className="expense-list">
      {/* Step 5: Display a loading indicator while fetching data */}
      {loading && <p>Loading expenses...</p>}

      {/* Display an error message if data fetching fails */}
      {error && <p>{error}</p>}

      {/* Step 4: Render the list of expenses once data is available */}
      {!loading && !error && expenses.length > 0 && (
        <ul>
          {expenses.map((expense) => (
            /*
              Render each expense using the ExpenseItem component
              ---------------------------------------------------
              - We pass the `expense` object as a prop to the ExpenseItem component.
              - This aligns with the component-based architecture mentioned in *System Architecture/2.1 Client Layer*.
            */
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </ul>
      )}

      {/* Inform the user if no expenses are found */}
      {!loading && !error && expenses.length === 0 && <p>No expenses found.</p>}
    </div>
  );
};

/*
  Exporting the ExpenseList component
  -----------------------------------
  - Allows other components or pages within the application to import and use ExpenseList.
*/
export default ExpenseList;