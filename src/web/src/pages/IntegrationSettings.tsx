/*
 * File: IntegrationSettings.tsx
 * Description: This file defines the Integration Settings page for the web application, allowing administrators to configure and manage integrations with external systems such as accounting, HR, and payroll services. It provides a user interface for setting API keys, managing connection statuses, and viewing integration logs.
 * 
 * Requirements Addressed:
 * - Seamless Integration (Technical Specification/1.3 System Objectives): Integrate effortlessly with existing accounting, HR, and payroll systems to ensure data consistency.
 */

// Import necessary modules and components
import React, { useState, useEffect } from 'react'; // react version 17.0.2
import { fetchData, postData } from '../utils/api'; // For performing API GET and POST requests
import { useAuthContext } from '../utils/contexts'; // To manage and access authentication state
import { API_BASE_URL } from '../utils/constants'; // Base URL for API requests
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

// Define types for integration settings
interface IntegrationSetting {
    serviceName: string;
    apiKey: string;
    isConnected: boolean;
    connectionStatus: string;
    logs: string[];
}

// IntegrationSettings Component
const IntegrationSettings: React.FC = () => {
    /*
     * Function: IntegrationSettings
     * Description: Renders the Integration Settings page, allowing administrators to configure and manage external system integrations.
     * Returns: A JSX element representing the Integration Settings page.
     */

    // Use the useAuthContext hook to access authentication state and ensure only authorized users can access the page
    const { isAuthenticated, userRole } = useAuthContext();

    // Redirect unauthorized users
    if (!isAuthenticated || userRole !== 'Administrator') {
        // This ensures that only administrators can access integration settings (Requirement ID: TR-F001.3, Technical Specification/13.1 User Authentication and Authorization)
        return <div>You are not authorized to access this page.</div>;
    }

    // Define state variables for storing integration settings and statuses using useState
    const [integrationSettings, setIntegrationSettings] = useState<IntegrationSetting[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch current integration settings from the backend using fetchData when the component mounts
    useEffect(() => {
        /*
         * Fetch current integration settings to provide up-to-date information to administrators
         * Addresses seamless integration management (Technical Specification/1.3 System Objectives)
         */
        const fetchIntegrationSettings = async () => {
            try {
                const data = await fetchData(`${API_BASE_URL}/api/integrations`);
                setIntegrationSettings(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load integration settings.');
                setLoading(false);
            }
        };
        fetchIntegrationSettings();
    }, []);

    // Handle form submissions by sending updated configurations to the backend using postData
    const handleSave = async () => {
        /*
         * Handle form submissions to update integration configurations
         * Enables administrators to configure integrations (Technical Specification/1.3 System Objectives)
         */
        try {
            await postData(`${API_BASE_URL}/api/integrations`, integrationSettings);
            alert('Integration settings updated successfully.');
        } catch (err) {
            alert('Failed to update integration settings.');
        }
    };

    // Handle input changes in the form
    const handleInputChange = (index: number, field: keyof IntegrationSetting, value: string) => {
        const newSettings = [...integrationSettings];
        newSettings[index][field] = value;
        setIntegrationSettings(newSettings);
    };

    // Render the page layout with Header, Sidebar, and Footer components, and include the integration settings form
    return (
        <div className="integration-settings-page">
            {/* Render the top navigation bar */}
            <Header />
            <div className="main-content">
                {/* Provide navigation links to other sections */}
                <Sidebar />
                <div className="content">
                    <h1>Integration Settings</h1>
                    {loading && <p>Loading integration settings...</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && (
                        <form>
                            {integrationSettings.map((setting, index) => (
                                <div key={setting.serviceName} className="integration-setting">
                                    <h2>{setting.serviceName}</h2>
                                    <label>
                                        API Key:
                                        <input
                                            type="text"
                                            value={setting.apiKey}
                                            onChange={(e) =>
                                                handleInputChange(index, 'apiKey', e.target.value)
                                            }
                                        />
                                    </label>
                                    <p>Connection Status: {setting.connectionStatus}</p>
                                    <button type="button" onClick={handleSave}>
                                        Save
                                    </button>
                                    <div className="logs">
                                        <h3>Integration Logs:</h3>
                                        <ul>
                                            {setting.logs.map((log, idx) => (
                                                <li key={idx}>{log}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </form>
                    )}
                </div>
            </div>
            {/* Render the footer section */}
            <Footer />
        </div>
    );
};

export default IntegrationSettings;