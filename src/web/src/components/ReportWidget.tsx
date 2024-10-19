// src/web/src/components/ReportWidget.tsx

import React, { useEffect, useState } from 'react'; // react v17.0.2
import '../styles/ReportWidget.css'; // Importing styles specific to the ReportWidget component

// Internal dependencies
import { fetchData } from '../utils/api'; // To fetch report data from the backend API.
import { API_BASE_URL } from '../utils/constants'; // To construct API endpoints for fetching report data.
import { useAuthContext } from '../utils/contexts'; // To manage and access authentication state within the component.
import { formatCurrency } from '../utils/helpers'; // To format financial figures in the report.

/**
 * ReportWidget Component
 *
 * This component is responsible for displaying financial reports and analytics within the web application.
 * It fetches report data from the backend, processes it, and presents it in a user-friendly format with
 * interactive elements for enhanced user engagement.
 *
 * Requirements Addressed:
 * - Comprehensive Reporting and Analytics
 *   (Technical Specification/13.6 Reporting and Analytics)
 *   - Provide comprehensive reporting and analytical tools for tracking, managing, and forecasting expenses,
 *     tailored to different user roles.
 */

const ReportWidget: React.FC = () => {
    // Using useAuthContext to ensure the user is authenticated before fetching data.
    const { isAuthenticated } = useAuthContext();

    // State to hold the fetched and processed report data.
    const [reportData, setReportData] = useState<any>(null);

    // Effect hook to fetch report data when the component mounts and the user is authenticated.
    useEffect(() => {
        if (isAuthenticated) {
            const fetchReportData = async () => {
                try {
                    // Fetch report data from the backend using fetchData and API_BASE_URL.
                    const response = await fetchData(`${API_BASE_URL}/reports`);

                    // Process the fetched data to extract relevant financial metrics.
                    const processedData = processReportData(response.data);

                    // Update the state with the processed data.
                    setReportData(processedData);
                } catch (error) {
                    console.error('Error fetching report data:', error);
                }
            };

            fetchReportData();
        }
    }, [isAuthenticated]);

    /**
     * Processes the raw report data fetched from the backend.
     * @param data - The raw data received from the API.
     * @returns An object containing the processed financial metrics.
     */
    const processReportData = (data: any) => {
        // Implement data processing logic here.
        // Extract relevant financial metrics required by the component.
        // For demonstration purposes, we return the data as-is.
        return data;
    };

    // If the report data has not been loaded yet, display a loading indicator.
    if (!reportData) {
        return <div className="report-widget-loading">Loading report data...</div>;
    }

    // Render the report data within a styled container using CSS from ReportWidget.css.
    return (
        <div className="report-widget-container">
            <h2 className="report-widget-title">Financial Report</h2>
            <div className="report-metrics">
                {/* Displaying financial metrics */}
                {reportData.metrics && reportData.metrics.length > 0 ? (
                    reportData.metrics.map((metric: any) => (
                        <div key={metric.id} className="metric-item">
                            <span className="metric-name">{metric.name}</span>
                            <span className="metric-value">
                                {formatCurrency(metric.value)}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="no-data-message">No report data available.</div>
                )}
            </div>
            {/* Additional interactive elements for enhanced user engagement can be added here */}
        </div>
    );
};

export default ReportWidget;