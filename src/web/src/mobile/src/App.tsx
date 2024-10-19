// Import necessary external libraries
import React from 'react'; // React version 17.0.2: To create and manage the main application component using React.

// Import internal utilities and hooks
import { useAuthContext } from './utils/contexts'; // Manages authentication state and provides user-specific data across the application (src/web/src/mobile/src/utils/contexts.ts).
import { useFetchData } from './utils/hooks'; // Fetches necessary data for various components within the application (src/web/src/mobile/src/utils/hooks.ts).

// Import internal components for consistent UI
import MobileHeader from './components/MobileHeader'; // Provides a consistent and branded header across the mobile application (src/web/src/mobile/src/components/MobileHeader.tsx).
import MobileFooter from './components/MobileFooter'; // Provides a consistent footer with navigation links across the app (src/web/src/mobile/src/components/MobileFooter.tsx).

// Import main pages and components
import MobileDashboard from './pages/MobileDashboard'; // Serves as the main interface for users to access various features (src/web/src/mobile/src/pages/MobileDashboard.tsx).
import CaptureExpense from './pages/CaptureExpense'; // Provides a dedicated page for capturing and submitting travel expenses (src/web/src/mobile/src/pages/CaptureExpense.tsx).
import ReceiptUpload from './pages/ReceiptUpload'; // Allows users to upload and manage receipts for their travel expenses (src/web/src/mobile/src/pages/ReceiptUpload.tsx).
import OfflineExpenses from './pages/OfflineExpenses'; // Manages expenses recorded while offline, with functionalities to edit, delete, and synchronize (src/web/src/mobile/src/pages/OfflineExpenses.tsx).
import Notifications from './components/Notifications'; // Displays user notifications, including alerts, updates, and messages (src/web/src/mobile/src/components/Notifications.tsx).

/**
 * App Component
 *
 * Renders the main application component, integrating various components and utilities to provide a comprehensive mobile experience.
 *
 * Requirements Addressed:
 * - **Improve User Experience** (Technical Specification/1.3 System Objectives)
 *   - Delivers an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 * - **Expense Submission** (Technical Specification/13.2 Expense Submission)
 *   - Enables employees to efficiently capture and submit travel expenses through user-friendly mobile interfaces.
 *   - TR-F002.1: Provide a mobile app for easy expense capture on-the-go.
 * - **Mobile Features** (Technical Specification/13.8 Mobile Features)
 *   - Enhances the mobile experience for users on iOS and Android devices.
 *   - TR-F008.3: Provide offline mode with data synchronization when online.
 *   - TR-F008.2: Implement push notifications for expense status updates and policy reminders.
 *
 * @returns {JSX.Element} The main application interface.
 */
const App: React.FC = (): JSX.Element => {
  // Use the useAuthContext hook to access authentication state and manage user-specific data
  const { user, isAuthenticated } = useAuthContext(); // From src/web/src/mobile/src/utils/contexts.ts

  // Use the useFetchData hook to retrieve necessary data for the application components
  const { data, isLoading, error } = useFetchData(); // From src/web/src/mobile/src/utils/hooks.ts

  // Handle loading state
  if (isLoading) {
    // Render a loading indicator while data is being fetched
    return (
      <>
        {/* Render the MobileHeader for consistent navigation */}
        <MobileHeader />
        {/* Loading indicator */}
        <div>Loading data...</div>
        {/* Render the MobileFooter */}
        <MobileFooter />
      </>
    );
  }

  // Handle error state
  if (error) {
    // Render an error message if data fetching fails
    return (
      <>
        {/* Render the MobileHeader for consistent navigation */}
        <MobileHeader />
        {/* Error message */}
        <div>Error loading data: {error.message}</div>
        {/* Render the MobileFooter */}
        <MobileFooter />
      </>
    );
  }

  // If the user is not authenticated, render a login screen or redirect
  if (!isAuthenticated) {
    // Assuming a Login component exists (not shown here)
    // import Login from './pages/Login'; // Handles user authentication

    return (
      <>
        {/* Render the MobileHeader for consistent navigation */}
        <MobileHeader />
        {/* Render the Login component */}
        {/* Addresses "User Authentication and Authorization" (Technical Specification/13.1 User Authentication and Authorization, TR-F001.1) */}
        {/* <Login /> */}
        {/* Render the MobileFooter */}
        <MobileFooter />
      </>
    );
  }

  // Render the main application interface
  return (
    <>
      {/* Render the MobileHeader at the top of the application for consistent navigation */}
      <MobileHeader />

      {/* Integrate the MobileDashboard component to serve as the main interface for accessing various features */}
      {/* Addresses "Mobile Features" (Technical Specification/13.8 Mobile Features, TR-F008.1) */}
      <MobileDashboard />

      {/* Include the CaptureExpense component for capturing and submitting expenses */}
      {/* Addresses "Expense Submission" (Technical Specification/13.2 Expense Submission, TR-F002.1) */}
      <CaptureExpense />

      {/* Render the ReceiptUpload component for managing receipts */}
      {/* Supports "Attachment of digital receipts" (Technical Specification/13.2 Expense Submission, TR-F002.4) */}
      <ReceiptUpload />

      {/* Add the OfflineExpenses component to handle offline expense management */}
      {/* Addresses "Provide offline mode with data synchronization when online" (Technical Specification/13.8 Mobile Features, TR-F008.3) */}
      <OfflineExpenses />

      {/* Include the Notifications component to display user notifications */}
      {/* Implements push notifications for expense status updates (Technical Specification/13.8 Mobile Features, TR-F008.2) */}
      <Notifications />

      {/* Render the MobileFooter at the bottom of the application for consistent navigation */}
      <MobileFooter />
    </>
  );
};

export default App;