// src/web/src/pages/Dashboard.tsx

// Import React to create and manage the Dashboard component as a React component.
// React version: 17.0.2
import React, { useEffect, useState } from 'react';

// Import useAuthContext to manage and access authentication state within the dashboard.
// Requirement Addressed: User Authentication and Authorization (Technical Specification/13.1 User Authentication and Authorization)
// - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators
import { useAuthContext } from '../utils/contexts';

// Import fetchData and postData to perform API GET and POST requests.
// Requirement Addressed: Expense Submission and Data Fetching (Technical Specification/13.2 Expense Submission)
// - TR-F002.1: Provide a mobile app for easy expense capture on-the-go
// - TR-F002.8: Provide an offline mode for expense entry when internet connection is unavailable
import { fetchData, postData } from '../utils/api';

// Importing UI components to build the Dashboard UI.

// Header: To render the top navigation bar for the dashboard.
// Requirement Addressed: Improve User Experience (Technical Specification/1.3 System Objectives)
// - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
import Header from '../components/Header';

// Footer: To render the footer section for the dashboard.
// Same requirement as above.
import Footer from '../components/Footer';

// Sidebar: To provide navigation links to different sections of the application.
// Requirement Addressed: Improve User Experience (Technical Specification/1.3 System Objectives)
import Sidebar from '../components/Sidebar';

// ExpenseList: To display a list of expenses on the dashboard.
// Requirement Addressed: Expense Submission (Technical Specification/13.2 Expense Submission)
// - TR-F002.5: Categorize expenses (e.g., meals, transportation, lodging)
import ExpenseList from '../components/ExpenseList';

// ApprovalList: To display pending approvals for managers on the dashboard.
// Requirement Addressed: Approval Workflow (Technical Specification/13.4 Approval Workflow)
// - TR-F004.1: Configure multi-level approval workflows
import ApprovalList from '../components/ApprovalList';

// ReportWidget: To display financial reports and analytics on the dashboard.
// Requirement Addressed: Reporting and Analytics (Technical Specification/13.6 Reporting and Analytics)
// - TR-F006.1: Offer customizable dashboards for different user roles
import ReportWidget from '../components/ReportWidget';

// UserProfile: To allow users to view and edit their profile information.
// Requirement Addressed: Improve User Experience (Technical Specification/1.3 System Objectives)
import UserProfile from '../components/UserProfile';

// Notifications: To display notifications to the user about application events.
// Requirement Addressed: Approval Workflow (Technical Specification/13.4 Approval Workflow)
// - TR-F004.3: Provide in-app notifications for pending approvals
import Notifications from '../components/Notifications';

// Settings: To allow users to modify their application settings.
// Requirement Addressed: Improve User Experience (Technical Specification/1.3 System Objectives)
import Settings from '../components/Settings';

// Dashboard component renders the main dashboard page, integrating various components to provide a comprehensive overview of the application for the user.
// Requirements Addressed:
// - Improve User Experience (Technical Specification/1.3 System Objectives)
//   Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
// - Expense Submission (Technical Specification/13.2 Expense Submission)
//   Enable employees to efficiently capture and submit travel expenses through user-friendly mobile and web interfaces.
// - Approval Workflow (Technical Specification/13.4 Approval Workflow)
//   Streamline the approval process for submitted expense reports with configurable workflows and notifications.
// - Reporting and Analytics (Technical Specification/13.6 Reporting and Analytics)
//   Provide comprehensive reporting and analytical tools for tracking, managing, and forecasting expenses, tailored to different user roles.

const Dashboard: React.FC = () => {
    // Use the useAuthContext hook to access authentication state and ensure the user is authenticated before rendering the dashboard.
    // Addresses: User Authentication and Authorization (Technical Specification/13.1 User Authentication and Authorization)
    const { isAuthenticated, user } = useAuthContext();

    // State variables to hold dashboard data.
    // We use useState to manage the state of expenses, approvals, reports, and notifications.
    const [expenses, setExpenses] = useState([]);
    const [approvals, setApprovals] = useState([]);
    const [reports, setReports] = useState([]);
    const [notifications, setNotifications] = useState([]);

    // Use useEffect to fetch necessary data for the dashboard when the component mounts.
    useEffect(() => {
        if (isAuthenticated) {
            // Fetch expenses data for the ExpenseList component.
            // Addresses: Expense Submission (Technical Specification/13.2 Expense Submission)
            fetchData('/api/expenses')
                .then((data) => setExpenses(data))
                .catch((error) => {
                    console.error('Error fetching expenses:', error);
                });

            // Fetch approvals data for the ApprovalList component.
            // Addresses: Approval Workflow (Technical Specification/13.4 Approval Workflow)
            fetchData('/api/approvals')
                .then((data) => setApprovals(data))
                .catch((error) => {
                    console.error('Error fetching approvals:', error);
                });

            // Fetch financial reports data for the ReportWidget component.
            // Addresses: Reporting and Analytics (Technical Specification/13.6 Reporting and Analytics)
            fetchData('/api/reports')
                .then((data) => setReports(data))
                .catch((error) => {
                    console.error('Error fetching reports:', error);
                });

            // Fetch notifications data for the Notifications component.
            // Addresses: Approval Workflow (Technical Specification/13.4 Approval Workflow)
            fetchData('/api/notifications')
                .then((data) => setNotifications(data))
                .catch((error) => {
                    console.error('Error fetching notifications:', error);
                });
        }
    }, [isAuthenticated]);

    // If the user is not authenticated, prompt them to log in.
    if (!isAuthenticated) {
        return (
            <div>
                <p>Please log in to access the dashboard.</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            {/* Render the Header component to provide consistent navigation and branding.
                Addresses: Improve User Experience (Technical Specification/1.3 System Objectives) */}
            <Header />

            <div className="dashboard-content">
                {/* Render the Sidebar component to provide navigation links to different sections of the application.
                    Addresses: Improve User Experience (Technical Specification/1.3 System Objectives) */}
                <Sidebar />

                {/* Main content area of the dashboard. */}
                <main className="main-content">
                    {/* Render the Notifications component to display any alerts or messages to the user.
                        Addresses: Approval Workflow (Technical Specification/13.4 Approval Workflow) */}
                    <Notifications notifications={notifications} />

                    {/* Render the ExpenseList component to display a list of expenses on the dashboard.
                        Addresses: Expense Submission (Technical Specification/13.2 Expense Submission) */}
                    <ExpenseList expenses={expenses} />

                    {/* Render the ApprovalList component to display pending approvals for managers on the dashboard.
                        Addresses: Approval Workflow (Technical Specification/13.4 Approval Workflow) */}
                    {user.role === 'Manager' && (
                        <ApprovalList approvals={approvals} />
                    )}

                    {/* Render the ReportWidget component to display financial reports and analytics on the dashboard.
                        Addresses: Reporting and Analytics (Technical Specification/13.6 Reporting and Analytics) */}
                    <ReportWidget reports={reports} />

                    {/* Render the UserProfile component to allow users to view and edit their profile information.
                        Addresses: Improve User Experience (Technical Specification/1.3 System Objectives) */}
                    <UserProfile user={user} />

                    {/* Render the Settings component to allow users to modify their application settings.
                        Addresses: Improve User Experience (Technical Specification/1.3 System Objectives) */}
                    <Settings />
                </main>
            </div>

            {/* Render the Footer component to provide consistent navigation and branding.
                Addresses: Improve User Experience (Technical Specification/1.3 System Objectives) */}
            <Footer />
        </div>
    );
};

export default Dashboard;