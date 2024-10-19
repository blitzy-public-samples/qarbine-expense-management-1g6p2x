import React, { useState } from 'react'; // react version 17.0.2

// Internal dependencies
import { useAuthContext } from '../utils/contexts';
import { useFetchData } from '../utils/hooks';
import { validateForm } from '../utils/validation';
import { IconComponent } from '../assets/icons';

/**
 * Notifications Component
 *
 * Description:
 * Renders a list of notifications for the user, providing visual alerts and updates.
 * This component enhances user experience by keeping users informed of important events,
 * addressing the requirement: "Improve User Experience" located in
 * Technical Specification/1.3 System Objectives.
 *
 * Requirements Addressed:
 * - Improve User Experience
 *   - Location: Technical Specification/1.3 System Objectives
 *   - Description: Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 */

const Notifications: React.FC = () => {
  // Step 1: Use useAuthContext to access the current user's authentication state.
  // Access the current user from authentication context.
  const { currentUser } = useAuthContext();

  // Step 2: Fetch notification data using useFetchData to retrieve notifications from the server.
  // Fetch notifications specific to the current user.
  const { data: notifications, error, isLoading, refetch } = useFetchData(
    `/api/notifications?userId=${currentUser.id}`
  );

  // Local state to manage any form inputs related to notifications.
  const [formErrors, setFormErrors] = useState<{ notificationId?: string }>({});

  // Handler function to dismiss a notification.
  const handleDismiss = (notificationId: string) => {
    // Step 5: Use validateForm to validate inputs related to notification actions.
    // For dismiss action, validate the notification ID.
    const isValid = validateForm({ notificationId });
    if (isValid) {
      // Proceed to dismiss the notification.
      // API call to dismiss notification would go here.
      // For example:
      // dismissNotification(notificationId).then(() => {
      //   refetch(); // Refresh the notifications list after successful dismissal.
      // });

      // Placeholder for API call.
      console.log(`Notification ${notificationId} dismissed.`);
      // After action, refetch notifications to update the list.
      refetch();
    } else {
      // Handle validation errors accordingly.
      setFormErrors({ notificationId: 'Invalid notification ID.' });
    }
  };

  // Handle loading state.
  if (isLoading) {
    return <p>Loading notifications...</p>;
  }

  // Handle error state.
  if (error) {
    return <p>Error loading notifications.</p>;
  }

  // Step 3: Iterate over the fetched notifications to display each one.
  return (
    <div className="notifications-container">
      {/* Render notifications ensuring accessibility and responsiveness */}
      {notifications && notifications.length > 0 ? (
        notifications.map((notification: any) => (
          <div key={notification.id} className="notification-item">
            {/* Step 4: Use IconComponent to add relevant icons to each notification for better user experience */}
            <IconComponent type={notification.type} />
            <div className="notification-content">
              <p>{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
            {/* Button to dismiss the notification */}
            <button
              className="dismiss-button"
              onClick={() => handleDismiss(notification.id)}
              aria-label="Dismiss notification"
            >
              Dismiss
            </button>
            {/* Display validation error if any */}
            {formErrors.notificationId && (
              <p className="error-message">{formErrors.notificationId}</p>
            )}
          </div>
        ))
      ) : (
        <p>No new notifications.</p>
      )}
    </div>
  );
};

export default Notifications;