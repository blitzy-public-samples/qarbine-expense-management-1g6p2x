// src/web/src/mobile/src/components/OfflineSync.tsx

/**
 * OfflineSync.tsx
 *
 * This component manages offline data synchronization, allowing users to sync data when connectivity is restored.
 * It addresses the requirement to "Enhance Efficiency" by reducing processing time and minimizing errors in expense reporting and reimbursement workflows.
 * Location of requirement: Technical Specification/1.3 System Objectives
 */

import React, { useState, useEffect } from 'react'; // React version 17.0.2
import { useAuthContext } from '../utils/contexts'; // To access authentication context for managing user-specific data synchronization
import { useFetchData } from '../utils/hooks'; // To fetch data from APIs during synchronization
import { validateForm } from '../utils/validation'; // To ensure data integrity before synchronization
import { IconComponent } from '../assets/icons'; // To display icons indicating synchronization status
import logoSVG from '../assets/logo.svg'; // To maintain brand consistency in the synchronization interface
import '../styles/OfflineSync.css'; // To style the OfflineSync component for a user-friendly interface

/**
 * OfflineSync Component
 * Manages offline data synchronization, allowing users to sync data when connectivity is restored.
 * Returns a JSX.Element that provides UI and functionality for offline data synchronization.
 */
const OfflineSync: React.FC = () => {
  // Access authentication context to determine user-specific data needs
  const { user } = useAuthContext();

  // State variables to manage online status, syncing status, and sync errors
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Retrieve fetchData function from useFetchData hook
  const fetchData = useFetchData();

  /**
   * useEffect hook to monitor online/offline status
   * Handles synchronization logic to update data when connectivity is restored
   * Addresses step 6 in function steps
   */
  useEffect(() => {
    /**
     * Updates the online status of the application.
     * Listens for 'online' and 'offline' events to update the isOnline state.
     */
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Add event listeners for online and offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  /**
   * Function to handle data synchronization
   * Implements steps:
   * - Access authentication context using useAuthContext to determine user-specific data needs
   * - Use useFetchData to retrieve necessary data for synchronization
   * - Validate data using validateForm to ensure integrity before syncing
   * - Handle synchronization logic to update data when connectivity is restored
   * Addresses Requirement: "Enhance Efficiency" (Technical Specification/1.3 System Objectives)
   */
  const handleSync = async () => {
    setIsSyncing(true);
    setSyncError(null);

    // Retrieve data that needs to be synchronized
    const dataToSync = getDataToSync();

    // Validate data before synchronization
    const isValid = validateForm(dataToSync);

    if (!isValid) {
      // If data validation fails, set error message and exit synchronization
      setSyncError('Data validation failed. Please check your entries.');
      setIsSyncing(false);
      return;
    }

    try {
      // Send data to the server using fetchData
      const response = await fetchData('/api/sync', 'POST', dataToSync);

      if (response.ok) {
        // On successful synchronization
        // Clear synchronized data
        clearDataToSync();
      } else {
        // Handle server-side errors
        setSyncError('Server error during synchronization. Please try again.');
      }
    } catch (error) {
      // Handle network or other errors during synchronization
      setSyncError('Synchronization failed. Please check your connection.');
    } finally {
      // Reset syncing state
      setIsSyncing(false);
    }
  };

  /**
   * useEffect hook to trigger synchronization when online status changes
   * Applies step 6 in function steps
   */
  useEffect(() => {
    if (isOnline) {
      // When connectivity is restored, initiate synchronization
      handleSync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  /**
   * Function to retrieve data that needs to be synchronized
   * Essential for managing offline data and ensuring consistency when back online
   */
  const getDataToSync = () => {
    // Placeholder function to retrieve data
    // In actual implementation, retrieve data from local storage or state
    return {
      userId: user.id,
      expenses: [], // Array of expense data to sync
    };
  };

  /**
   * Function to clear data after successful synchronization
   * Ensures that data is not duplicated or resubmitted
   */
  const clearDataToSync = () => {
    // Placeholder function to clear local data after successful sync
    // Implement logic to clear synchronized data from local storage or state
  };

  return (
    <div className="offline-sync-container">
      {/* Logo for brand consistency */}
      <img src={logoSVG} alt="Company Logo" className="logo" />

      {/* Icon to indicate synchronization status */}
      <div className="status-icon">
        <IconComponent
          name={isOnline ? 'cloud-sync' : 'cloud-off'}
          className="sync-icon"
        />
      </div>

      {/* Message to display current synchronization status */}
      <p className="sync-status">
        {isOnline
          ? 'You are online. Synchronizing your data...'
          : 'You are offline. Your data will sync when connection is restored.'}
      </p>

      {/* Display syncing indicator if synchronization is in progress */}
      {isSyncing && <p className="syncing">Syncing data...</p>}

      {/* Display error message if synchronization fails */}
      {syncError && <p className="error">{syncError}</p>}
    </div>
  );
};

export default OfflineSync;