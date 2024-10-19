// src/web/src/pages/ReportingDashboard.tsx

// Importing React and necessary hooks from 'react' (version 17.0.2)
import React, { useEffect, useState } from 'react'; // React 17.0.2

// Importing fetchData utility to fetch report data from the backend API
import { fetchData } from '../utils/api'; // src/web/src/utils/api.ts

// Importing API_BASE_URL constant to construct API endpoints
import { API_BASE_URL } from '../utils/constants'; // src/web/src/utils/constants.ts

// Importing useAuthContext to manage and access authentication state within the component
import { useAuthContext } from '../utils/contexts'; // src/web/src/utils/contexts.ts

// Importing components to assemble the Reporting Dashboard page
import Header from '../components/Header'; // src/web/src/components/Header.tsx
import Footer from '../components/Footer'; // src/web/src/components/Footer.tsx
import Sidebar from '../components/Sidebar'; // src/web/src/components/Sidebar.tsx
import ReportWidget from '../components/ReportWidget'; // src/web/src/components/ReportWidget.tsx

/**
 * ReportingDashboard Component
 * 
 * Renders the Reporting Dashboard page, integrating various components to display comprehensive financial reports and analytics.
 * 
 * Requirements Addressed:
 * - Comprehensive Reporting and Analytics (F-006)
 *   - Location: Technical Specification/13.6 Reporting and Analytics
 *   - Description: Provide comprehensive reporting and analytical tools for tracking, managing, and forecasting expenses, tailored to different user roles.
 */

const ReportingDashboard: React.FC = () => {
    // Access authentication state using useAuthContext hook
    const { isAuthenticated, user } = useAuthContext();

    // State to hold the report data fetched from the backend API
    const [reportData, setReportData] = useState<any>(null);

    /**
     * useEffect hook to fetch report data when the component mounts.
     * 
     * Steps:
     * - Ensure the user is authenticated before fetching data.
     * - Construct the API endpoint using API_BASE_URL.
     * - Use fetchData utility to make an API call to the backend.
     * - Update the reportData state with the fetched data.
     * 
     * Requirements Addressed:
     * - TR-F006.1: Offer customizable dashboards for different user roles.
     * - TR-F006.2: Generate detailed expense reports by employee, department, project, or cost center.
     * 
     * Reference:
     * - Technical Specification/13.6 Reporting and Analytics
     */
    useEffect(() => {
        if (isAuthenticated) {
            // Construct API endpoint for fetching reports, possibly including user role or ID
            const endpoint = `${API_BASE_URL}/reports?userId=${user.id}`;

            // Fetch report data from the backend API
            fetchData(endpoint)
                .then((data) => {
                    setReportData(data);
                })
                .catch((error) => {
                    console.error('Error fetching report data:', error);
                });
        }
    }, [isAuthenticated, user]);

    // If the user is not authenticated, render a message or redirect
    if (!isAuthenticated) {
        // TODO: Implement redirection to the login page or an authentication flow
        return <div>Please log in to view the Reporting Dashboard.</div>;
    }

    /**
     * Render the Reporting Dashboard page.
     * 
     * Components Included:
     * - Header: Provides a consistent navigation bar at the top of the page.
     *   - Location: src/web/src/components/Header.tsx
     * - Sidebar: Provides navigation links to different sections of the application.
     *   - Location: src/web/src/components/Sidebar.tsx
     * - ReportWidget: Displays financial reports and analytics in a user-friendly format.
     *   - Location: src/web/src/components/ReportWidget.tsx
     *   - Requirements Addressed:
     *     - TR-F006.1: Offer customizable dashboards for different user roles.
     *     - TR-F006.2: Generate detailed expense reports by employee, department, project, or cost center.
     *     - TR-F006.3: Perform trend analysis for travel spending.
     *     - Reference: Technical Specification/13.6 Reporting and Analytics
     * - Footer: Provides a consistent footer section across the page.
     *   - Location: src/web/src/components/Footer.tsx
     */
    return (
        <>
            {/* Header component */}
            <Header />

            <div className="dashboard-container">
                {/* Sidebar component */}
                <Sidebar />

                <main className="dashboard-content">
                    {/* ReportWidget component */}
                    <ReportWidget data={reportData} />
                </main>
            </div>

            {/* Footer component */}
            <Footer />
        </>
    );
};

export default ReportingDashboard;