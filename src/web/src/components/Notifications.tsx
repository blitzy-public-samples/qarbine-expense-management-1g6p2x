/**
 * Notifications Component
 * 
 * This component is responsible for displaying various types of notifications (e.g., success, error, info, warning) to the user.
 * It ensures that users receive timely and visually distinct feedback about the application's state and actions.
 * 
 * Requirements Addressed:
 * - **Improve User Experience** (*Technical Specification/1.3 System Objectives*)
 *   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 * 
 * Dependencies:
 * - **External:**
 *   - `react` (version 17.0.2): To create and manage the Notifications component as a React component.
 * - **Internal:**
 *   - `fetchData` (from `../utils/api`): To fetch notification data from the backend.
 *   - `TOKEN_KEY` (from `../utils/auth`): To manage authentication tokens for secure API requests.
 *   - `API_BASE_URL` (from `../utils/constants`): To use as the base URL for API requests.
 *   - `useAuthContext` (from `../utils/contexts`): To access authentication state and manage user sessions.
 *   - `IconComponent` (from `../assets/icons`): To render icons within notifications for visual cues.
 *   - `notificationStyles` (from `../styles/Notifications.css`): To apply consistent styling to notification messages.
 */

// External Dependencies
import React, { useState, useEffect } from 'react'; // version 17.0.2

// Internal Dependencies
import { useAuthContext } from '../utils/contexts'; // Access authentication state and manage user sessions.
import { IconComponent } from '../assets/icons'; // Render icons within notifications for visual cues.
import '../styles/Notifications.css'; // Apply consistent styling to notification messages.

// Importing utilities
import { fetchData } from '../utils/api'; // Fetch notification data from the backend.
import { TOKEN_KEY } from '../utils/auth'; // Manage authentication tokens for secure API requests.
import { API_BASE_URL } from '../utils/constants'; // Base URL for API requests.

// Define the Notification interface to type the notifications array
interface Notification {
    id: number; // Unique identifier for the notification
    type: 'success' | 'error' | 'info' | 'warning'; // Type determines styling and icon
    message: string; // Message to be displayed to the user
}

/**
 * Notifications Component
 * 
 * Renders a list of notifications based on the current application state, providing visual feedback to the user.
 * 
 * @returns A JSX element containing the rendered notifications.
 * 
 * Steps:
 * 1. Use `useAuthContext` to access the current authentication state.
 * 2. Fetch notifications data from the backend using `fetchData` utility.
 * 3. Store notifications in the component state.
 * 4. Map over the notifications array to render each notification with appropriate styling and icons.
 * 5. Apply styles from `Notifications.css` to ensure consistent visual feedback.
 * 6. Return the list of rendered notifications wrapped in a container element.
 * 
 * Requirements Addressed:
 * - **Improve User Experience** (*Technical Specification/1.3 System Objectives*)
 *   - By providing timely and visually distinct notifications, we enhance the user interface and user experience.
 */
const Notifications: React.FC = () => {
    // Step 1: Use `useAuthContext` to access the current authentication state.
    const { isAuthenticated } = useAuthContext();

    // Step 3: Initialize state for notifications.
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // Step 2: Fetch notifications data from the backend using `fetchData` utility.
    useEffect(() => {
        // Function to fetch notifications from the backend.
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem(TOKEN_KEY); // Retrieve authentication token.
                if (token) {
                    // Make GET request to fetch notifications.
                    const response = await fetchData(`${API_BASE_URL}/notifications`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`, // Use the token for secure API requests.
                            'Content-Type': 'application/json'
                        }
                    });
                    // Step 3: Store notifications in the component state.
                    setNotifications(response.data.notifications);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        if (isAuthenticated) {
            fetchNotifications(); // Fetch notifications only if the user is authenticated.
        }
    }, [isAuthenticated]);

    // Render nothing if the user is not authenticated or no notifications are present.
    if (!isAuthenticated || notifications.length === 0) {
        return null;
    }

    // Step 4: Map over the notifications array to render each notification with appropriate styling and icons.
    // Step 5: Apply styles from `Notifications.css` to ensure consistent visual feedback.
    return (
        <div className="notification-container">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`notification ${notification.type}`}
                >
                    {/* Render the icon corresponding to the notification type. */}
                    <IconComponent type={notification.type} />

                    {/* Display the notification message. */}
                    <span className="message">{notification.message}</span>
                </div>
            ))}
        </div>
    );
};

export default Notifications;