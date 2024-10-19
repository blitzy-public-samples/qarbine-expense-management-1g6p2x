// External dependencies
import React, { useState, useEffect } from 'react'; // React version 17.0.2

// Internal dependencies
import { useAuthContext } from '../utils/contexts'; // To access authentication context for managing user-specific offline expenses (src/web/src/mobile/src/utils/contexts.ts)
import { useFetchData } from '../utils/hooks'; // To fetch and manage offline expense data (src/web/src/mobile/src/utils/hooks.ts)
import { validateForm } from '../utils/validation'; // To validate expense data before synchronization (src/web/src/mobile/src/utils/validation.ts)
import MobileHeader from '../components/MobileHeader'; // To provide a consistent header across the mobile application (src/web/src/mobile/src/components/MobileHeader.tsx)
import MobileFooter from '../components/MobileFooter'; // To provide a consistent footer across the mobile application (src/web/src/mobile/src/components/MobileFooter.tsx)
import ExpenseCapture from '../components/ExpenseCapture'; // To capture new expenses while offline (src/web/src/mobile/src/components/ExpenseCapture.tsx)
import OfflineSync from '../components/OfflineSync'; // To manage the synchronization of offline expenses when connectivity is restored (src/web/src/mobile/src/components/OfflineSync.tsx)
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'; // For UI components and styling
import { Expense } from '../models/expenseModel'; // Type definition for Expense (assuming it's defined)

// OfflineExpenses Component
/**
 * Renders the OfflineExpenses page, allowing users to manage expenses recorded offline and synchronize them when online.
 * 
 * Addresses the following requirements:
 * - **Enhance Efficiency** (Technical Specification/1.3 System Objectives)
 *   - Reduces processing time and minimizes errors in expense reporting workflows by enabling offline expense management.
 * - **Mobile Features** (Technical Specification/13.8 Mobile Features)
 *   - Enhances the mobile experience by providing essential functionalities and ensuring usability even in offline scenarios.
 * 
 * @returns JSX.Element - A React component that provides UI and functionality for managing offline expenses.
 */
const OfflineExpenses: React.FC = () => {
  // Use authentication context to access the current user's authentication state
  const { user } = useAuthContext();

  // State variables for managing offline expenses and synchronization status
  const [offlineExpenses, setOfflineExpenses] = useState<Expense[]>([]); // Holds the list of offline expenses
  const [isSyncing, setIsSyncing] = useState<boolean>(false); // Represents the synchronization status
  const [errorMessage, setErrorMessage] = useState<string>(''); // Stores error messages for display

  // Fetch offline expense data using useFetchData hook
  const { getOfflineExpenses, deleteOfflineExpense, updateOfflineExpense, syncOfflineExpenses } = useFetchData();

  // Load offline expenses when the component mounts
  useEffect(() => {
    loadOfflineExpenses();
  }, []);

  // Function to load offline expenses
  const loadOfflineExpenses = async () => {
    try {
      const expenses = await getOfflineExpenses(user.id);
      setOfflineExpenses(expenses);
    } catch (error) {
      setErrorMessage('Failed to load offline expenses.');
    }
  };

  // Function to handle deletion of an expense
  const handleDeleteExpense = async (expenseId: string) => {
    try {
      await deleteOfflineExpense(user.id, expenseId);
      setOfflineExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== expenseId));
    } catch (error) {
      setErrorMessage('Failed to delete expense.');
    }
  };

  // Function to handle editing of an expense
  const handleEditExpense = async (expense: Expense) => {
    try {
      // Validate expense data before updating
      const isValid = validateForm(expense);
      if (!isValid) {
        setErrorMessage('Invalid expense data.');
        return;
      }
      await updateOfflineExpense(user.id, expense);
      setOfflineExpenses(prevExpenses =>
        prevExpenses.map(exp => (exp.id === expense.id ? expense : exp))
      );
    } catch (error) {
      setErrorMessage('Failed to update expense.');
    }
  };

  // Function to handle synchronization of offline expenses
  const handleSyncExpenses = async () => {
    setIsSyncing(true);
    try {
      await syncOfflineExpenses(user.id, offlineExpenses);
      setOfflineExpenses([]); // Clear offline expenses after successful sync
      setIsSyncing(false);
    } catch (error) {
      setErrorMessage('Failed to synchronize expenses.');
      setIsSyncing(false);
    }
  };

  // Render the component UI
  return (
    <>
      {/* Render MobileHeader for consistent navigation */}
      <MobileHeader />

      {/* Main container for the OfflineExpenses page */}
      <View style={styles.container}>
        {/* Display error messages if any */}
        {errorMessage !== '' && <Text style={styles.errorText}>{errorMessage}</Text>}

        {/* FlatList to display offline expenses */}
        <FlatList
          data={offlineExpenses}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <Text style={styles.expenseText}>{item.description}</Text>
              <Text style={styles.expenseText}>
                {item.amount} {item.currency}
              </Text>
              {/* Button to edit the expense */}
              <TouchableOpacity onPress={() => handleEditExpense(item)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              {/* Button to delete the expense */}
              <TouchableOpacity onPress={() => handleDeleteExpense(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No offline expenses available.</Text>}
        />

        {/* ExpenseCapture component to capture new expenses while offline */}
        <ExpenseCapture
          onExpenseCaptured={(newExpense: Expense) =>
            setOfflineExpenses(prevExpenses => [...prevExpenses, newExpense])
          }
        />

        {/* OfflineSync component to manage synchronization when connectivity is restored */}
        <OfflineSync isSyncing={isSyncing} onSync={handleSyncExpenses} />
      </View>

      {/* Render MobileFooter for consistent navigation */}
      <MobileFooter />
    </>
  );
};

// Styles for the OfflineExpenses component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF', // Ensure a user-friendly and responsive interface (Technical Specification/1.3 System Objectives)
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  expenseText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  editButton: {
    fontSize: 16,
    color: '#007BFF',
    marginRight: 16,
  },
  deleteButton: {
    fontSize: 16,
    color: '#FF3333',
  },
  errorText: {
    color: '#FF3333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    marginTop: 32,
  },
});

export default OfflineExpenses;