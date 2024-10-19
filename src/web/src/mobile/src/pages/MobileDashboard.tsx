// Importing React to create and manage the MobileDashboard component
// External Dependency: react version 17.0.2
import React from 'react'; // version 17.0.2

// Importing useAuthContext to manage authentication state and provide user-specific data across the dashboard
// Internal Dependency from src/web/src/mobile/src/utils/contexts.ts
import { useAuthContext } from '../utils/contexts';

// Importing useFetchData to fetch necessary data for various components within the dashboard
// Internal Dependency from src/web/src/mobile/src/utils/hooks.ts
import { useFetchData } from '../utils/hooks';

// Importing components
// Internal Dependencies from src/web/src/mobile/src/components/
import MobileHeader from '../components/MobileHeader';
import MobileFooter from '../components/MobileFooter';
import ExpenseCapture from '../components/ExpenseCapture';
import DigitalWallet from '../components/DigitalWallet';
import Notifications from '../components/Notifications';
import OfflineSync from '../components/OfflineSync';

/**
 * MobileDashboard Component
 * 
 * Renders the main dashboard interface for the mobile application, integrating various components to provide a comprehensive user experience.
 * 
 * Requirements Addressed:
 * 
 * - **Improve User Experience** (Technical Specification/1.3 System Objectives)
 *   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 * 
 * - **Expense Submission** (Technical Specification/13.2 Expense Submission)
 *   - Enable employees to efficiently capture and submit travel expenses through user-friendly mobile interfaces, incorporating automated data extraction and currency support.
 * 
 * - **Mobile Features** (Technical Specification/13.8 Mobile Features)
 *   - Enhance the mobile experience for users on iOS and Android devices, providing essential functionalities and ensuring usability even in offline scenarios.
 * 
 * @returns {JSX.Element} A JSX element representing the mobile dashboard interface.
 */
const MobileDashboard: React.FC = () => {

    /** 
     * Access authentication state and user-specific data using useAuthContext.
     * This allows personalization of the dashboard based on the authenticated user.
     * Internal Dependency: useAuthContext from '../utils/contexts'.
     */
    const { user, isAuthenticated } = useAuthContext();

    /** 
     * Fetch necessary data for dashboard components using useFetchData.
     * Retrieves data such as expense summaries, notifications, and wallet balances.
     * Internal Dependency: useFetchData from '../utils/hooks'.
     */
    const dashboardData = useFetchData('/api/mobile/dashboard');

    return (
        <>
            {/**
             * Render the MobileHeader at the top of the dashboard for consistent navigation.
             * Provides branding and access to main navigation items.
             * Internal Dependency: MobileHeader
             * Addresses Requirement: Improve User Experience (Technical Specification/1.3 System Objectives).
             */}
            <MobileHeader />

            {/**
             * Integrate the ExpenseCapture component to allow users to capture and submit expenses.
             * Internal Dependency: ExpenseCapture
             * Addresses Requirement: Expense Submission (Technical Specification/13.2 Expense Submission).
             */}
            <ExpenseCapture />

            {/**
             * Include the DigitalWallet component to display the user's financial information.
             * Internal Dependency: DigitalWallet
             * Addresses Requirement: Improve User Experience (Technical Specification/1.3 System Objectives).
             */}
            <DigitalWallet />

            {/**
             * Render the Notifications component to keep users informed of important updates.
             * Internal Dependency: Notifications
             * Addresses Requirement: Mobile Features (Technical Specification/13.8 Mobile Features).
             */}
            <Notifications />

            {/**
             * Add the OfflineSync component to manage data synchronization when offline.
             * Internal Dependency: OfflineSync
             * Addresses Requirement: Mobile Features (Technical Specification/13.8 Mobile Features).
             */}
            <OfflineSync />

            {/**
             * Render the MobileFooter at the bottom of the dashboard for consistent navigation.
             * Internal Dependency: MobileFooter
             * Addresses Requirement: Improve User Experience (Technical Specification/1.3 System Objectives).
             */}
            <MobileFooter />
        </>
    );
};

export default MobileDashboard;