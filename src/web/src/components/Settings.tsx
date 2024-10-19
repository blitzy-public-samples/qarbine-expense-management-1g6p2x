import React, { useEffect, useState } from 'react'; // React version 17.0.2
import { fetchData, postData } from '../utils/api';
import { useAuthContext } from '../utils/contexts';
import { API_BASE_URL } from '../utils/constants';
import { TOKEN_KEY } from '../utils/auth';
import { IconComponent } from '../assets/icons';
import 'normalize.css'; // normalize.css version 8.0.1
import '../styles/Settings.css';

/**
 * The Settings component allows users to view and modify their application settings,
 * such as notification preferences, account details, and theme options.
 * 
 * Requirements Addressed:
 * - Improve User Experience (Technical Specification/1.3 System Objectives)
 *   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 */

const Settings: React.FC = (): JSX.Element => {
  // Access user authentication state
  const { user } = useAuthContext();

  // State to hold user settings
  const [settings, setSettings] = useState({
    notificationPreferences: {},
    accountDetails: {},
    theme: ''
  });

  // Fetch current user settings when component mounts
  useEffect(() => {
    const getUserSettings = async () => {
      try {
        const data = await fetchData(`${API_BASE_URL}/user/settings`, TOKEN_KEY);
        setSettings(data);
      } catch (error) {
        console.error('Error fetching user settings:', error);
      }
    };

    getUserSettings();
  }, []);

  // Handle changes to settings
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value
    }));
  };

  // Save updated settings to the backend API
  const handleSaveSettings = async () => {
    try {
      await postData(`${API_BASE_URL}/user/settings`, settings, TOKEN_KEY);
      alert('Settings updated successfully.');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings.');
    }
  };

  return (
    <div className="settings-container">
      <h2 className="settings-header">Settings</h2>
      
      {/* Account Details Section */}
      <div className="settings-section">
        <h3 className="settings-subheader">
          <IconComponent name="user" /> Account Details
        </h3>
        <div className="settings-item">
          <label>Name:</label>
          <input
            type="text"
            name="accountDetails.name"
            value={settings.accountDetails.name || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="settings-item">
          <label>Email:</label>
          <input
            type="email"
            name="accountDetails.email"
            value={settings.accountDetails.email || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Notification Preferences Section */}
      <div className="settings-section">
        <h3 className="settings-subheader">
          <IconComponent name="bell" /> Notification Preferences
        </h3>
        <div className="settings-item">
          <label>
            <input
              type="checkbox"
              name="notificationPreferences.email"
              checked={settings.notificationPreferences.email || false}
              onChange={handleInputChange}
            />
            Email Notifications
          </label>
        </div>
        <div className="settings-item">
          <label>
            <input
              type="checkbox"
              name="notificationPreferences.sms"
              checked={settings.notificationPreferences.sms || false}
              onChange={handleInputChange}
            />
            SMS Notifications
          </label>
        </div>
      </div>

      {/* Theme Options Section */}
      <div className="settings-section">
        <h3 className="settings-subheader">
          <IconComponent name="theme" /> Theme Options
        </h3>
        <div className="settings-item">
          <label>Choose Theme:</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleInputChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <button className="settings-save-button" onClick={handleSaveSettings}>
        Save Settings
      </button>
    </div>
  );
};

export default Settings;