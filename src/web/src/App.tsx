// src/web/src/App.tsx

// Import React for building and managing the component's UI and state.
// Requirement Addressed: Improve User Experience
// Location: Technical Specification/1.3 System Objectives
import React from 'react'; // version 17.0.2

// Import routing utilities from 'react-router-dom' for handling routing within the web application.
// Requirement Addressed: Improve User Experience by providing seamless navigation.
// Location: Technical Specification/1.3 System Objectives
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // version 5.2.0

// Import context providers to manage global state across the application.
// Purpose: To manage and access authentication state across the application.
import { AuthProvider } from './utils/contexts';

// Import internal utility functions for API requests.
// Purpose: To perform API GET and POST requests for fetching and submitting necessary data.
import { fetchData, postData } from './utils/api';

// Import authentication token key.
// Purpose: To manage authentication tokens during application lifecycle.
import { TOKEN_KEY } from './utils/auth';

// Import API base URL constant.
// Purpose: To construct API request URLs.
import { API_BASE_URL } from './utils/constants';

// Import shared components for consistent UI.
// Requirement Addressed: Improve User Experience
// Location: Technical Specification/1.3 System Objectives
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

// Import components for various application functionalities.
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ApprovalList from './components/ApprovalList';
import PolicyCompliance from './components/PolicyCompliance';
import ReimbursementStatus from './components/ReimbursementStatus';
import ReportWidget from './components/ReportWidget';
import UserProfile from './components/UserProfile';
import Notifications from './components/Notifications';
import Settings from './components/Settings';

// Import pages for routing.
import Dashboard from './pages/Dashboard';
import SubmitExpense from './pages/SubmitExpense';
import ExpenseDetails from './pages/ExpenseDetails';
import ApprovalDashboard from './pages/ApprovalDashboard';
import ReportingDashboard from './pages/ReportingDashboard';
import AdminPanel from './pages/AdminPanel';
import UserManagement from './pages/UserManagement';
import PolicyConfiguration from './pages/PolicyConfiguration';
import IntegrationSettings from './pages/IntegrationSettings';

// The main application component.
// Description: Renders the main application component, setting up routing and context providers.
// Requirement Addressed: Improve User Experience by delivering an intuitive and user-friendly interface.
// Location: Technical Specification/1.3 System Objectives
function App(): JSX.Element {
    // Set up context providers to manage global state, such as authentication.
    // Requirement Addressed: Ensure secure user access and maintain authentication state.
    // Location: Technical Specification/13.1 User Authentication and Authorization
    return (
        <AuthProvider>
            {/* Set up routing for different application pages */}
            <Router>
                {/* Render the top-level navigation bar */}
                <Header />
                {/* Provide a navigation interface for accessing different sections */}
                <Sidebar />
                {/* Main content area where different pages will be rendered based on the route */}
                <main>
                    <Switch>
                        {/* Define routes for different pages */}
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/submit-expense" component={SubmitExpense} />
                        <Route path="/expense/:id" component={ExpenseDetails} />
                        <Route path="/approvals" component={ApprovalDashboard} />
                        <Route path="/reports" component={ReportingDashboard} />
                        <Route path="/admin" component={AdminPanel} />
                        <Route path="/user-management" component={UserManagement} />
                        <Route path="/policy-configuration" component={PolicyConfiguration} />
                        <Route path="/integration-settings" component={IntegrationSettings} />
                        {/* Additional routes can be added here */}
                    </Switch>
                </main>
                {/* Render the footer section across all pages */}
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;