// Entry point for the mobile application.
// This file initializes the app, sets up contexts, applies global styles, and renders the main components.

// Requirements Addressed:
// - Improve User Experience (Technical Specification/1.3 System Objectives)
//   Description: Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.

// Step 1: Import necessary modules and components.

// External dependencies.

// Import React library to create and manage React components for the mobile application.
// Version: 17.0.2
import React from 'react'; // react@17.0.2

// Import ReactDOM to render React components into the DOM.
// Version: 17.0.2
import ReactDOM from 'react-dom'; // react-dom@17.0.2

// Internal dependencies.

// Import AuthContextProvider to provide authentication context to the entire application.
// Located at src/web/src/mobile/src/utils/contexts.ts
import { AuthContextProvider } from './utils/contexts';

// Import useFetchData hook to manage data fetching operations within the app.
// Located at src/web/src/mobile/src/utils/hooks.ts
import { useFetchData } from './utils/hooks';

// Import MobileHeader to render the header component across all mobile screens.
// Located at src/web/src/mobile/src/components/MobileHeader.tsx
import MobileHeader from './components/MobileHeader';

// Import MobileFooter to render the footer component across all mobile screens.
// Located at src/web/src/mobile/src/components/MobileFooter.tsx
import MobileFooter from './components/MobileFooter';

// Import ExpenseCapture to provide the interface for capturing and submitting expenses.
// Located at src/web/src/mobile/src/components/ExpenseCapture.tsx
import ExpenseCapture from './components/ExpenseCapture';

// Import DigitalWallet to display and manage digital transactions and balances.
// Located at src/web/src/mobile/src/components/DigitalWallet.tsx
import DigitalWallet from './components/DigitalWallet';

// Import Notifications to display user notifications and alerts.
// Located at src/web/src/mobile/src/components/Notifications.tsx
import Notifications from './components/Notifications';

// Import OfflineSync to manage data synchronization when offline.
// Located at src/web/src/mobile/src/components/OfflineSync.tsx
import OfflineSync from './components/OfflineSync';

// Import global styles to ensure a consistent look and feel throughout the application.
// Applying global styles addresses the requirement to deliver an intuitive and user-friendly interface.
// Located at src/web/src/mobile/src/styles/global.css
import './styles/global.css';

// Globals

// Define the API base URL for network requests.
// This variable is used throughout the application for making API calls.
const API_BASE_URL = 'https://api.example.com';

// Function: initializeApp
// Description:
// Initializes the mobile application by setting up contexts and rendering the main components.
// Requirements Addressed:
// - Improve User Experience (Technical Specification/1.3 System Objectives)
//   Description: Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.

// Steps:
// 1. Wrap the application in AuthContextProvider to provide authentication context.
// 2. Render MobileHeader and MobileFooter for consistent navigation.
// 3. Render main application components: ExpenseCapture, DigitalWallet, Notifications, and OfflineSync.
// 4. Apply global styles to ensure a consistent look and feel.

function initializeApp(): void {
  // Step 1: Wrap the application in AuthContextProvider to provide authentication context.
  // This ensures that authentication state is available throughout the app components, enabling secure access control.
  ReactDOM.render(
    <React.StrictMode>
      <AuthContextProvider>
        {/* Rendering the main application structure */}
        <div className="app-container">
          {/* Step 2: Render the MobileHeader component for consistent navigation at the top of the screen. */}
          <MobileHeader />
          {/* Step 3: Render the main application components within the main content area. */}
          <main className="main-content">
            {/* Render ExpenseCapture component to allow users to capture and submit expenses. */}
            <ExpenseCapture />
            {/* Render DigitalWallet component to display and manage digital transactions and balances. */}
            <DigitalWallet />
            {/* Render Notifications component to display user notifications and alerts. */}
            <Notifications />
            {/* Render OfflineSync component to manage data synchronization when offline. */}
            <OfflineSync />
          </main>
          {/* Step 2: Render the MobileFooter component for consistent navigation at the bottom of the screen. */}
          <MobileFooter />
        </div>
      </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root') // Mount the application to the DOM element with id 'root'.
  );
}

// Initialize the application by calling initializeApp.
initializeApp();