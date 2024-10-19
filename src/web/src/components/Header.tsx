// src/web/src/components/Header.tsx

// Import necessary modules and components

// Import React to create the Header component as a React component.
// External Dependency (react@17.0.2)
// Purpose: Enables the creation of React components.
// Requirements Addressed:
// - Improve User Experience (Technical Specification/1.3 System Objectives)
//   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
import React from 'react'; // react@17.0.2

// Import IconComponent to render icons within the header for navigation and user actions.
// Internal Dependency located at src/web/src/assets/icons.tsx
// Purpose: To render icons within the header for navigation and user actions.
// Requirements Addressed:
// - Improve User Experience (Technical Specification/1.3 System Objectives)
import IconComponent from '../assets/icons';

// Import logo to display the application logo in the header.
// Internal Dependency located at src/web/src/assets/logo.svg
// Purpose: To display the application logo in the header.
// Requirements Addressed:
// - Simplify Expense Management (Technical Specification/1.3 System Objectives)
//   - Ensures consistent branding.
import logo from '../assets/logo.svg';

// Import useAuthContext to manage and access authentication state within the Header component.
// Internal Dependency located at src/web/src/utils/contexts.ts
// Purpose: To manage and access authentication state within the Header component.
// Requirements Addressed:
// - User Authentication and Authorization (Technical Specification/13.1 User Authentication and Authorization)
//   - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators.
import { useAuthContext } from '../utils/contexts';

// Import API_BASE_URL to use as the base URL for any API requests initiated from the Header.
// Internal Dependency located at src/web/src/utils/constants.ts
// Purpose: To use as the base URL for any API requests initiated from the Header.
import { API_BASE_URL } from '../utils/constants';

// Import CSS styles for the Header component
// Styles are defined in Header.css to ensure responsiveness and visual alignment with the application's theme.
// Requirements Addressed:
// - Improve User Experience (Technical Specification/1.3 System Objectives)
//   - Ensures consistent and intuitive user interface.
import '../styles/Header.css';

/**
 * Header Component
 * 
 * Renders the Header component, including the logo, navigation links, and user-related actions.
 * This component ensures consistent branding and easy access to different sections of the application.
 * 
 * Requirements Addressed:
 * - Improve User Experience (Technical Specification/1.3 System Objectives)
 *   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 */
const Header: React.FC = (): JSX.Element => {
    // Use the useAuthContext hook to access authentication state and actions.
    // This allows the header to display user-specific information and provide relevant actions.
    // Requirements Addressed:
    // - User Authentication and Authorization (Technical Specification/13.1 User Authentication and Authorization)
    //   - TR-F001.3: Role-based access control for employees, managers, finance team, and administrators.
    const { user, logout } = useAuthContext();

    // Define navigation links.
    // These links provide easy navigation to different sections, enhancing user experience.
    // Requirements Addressed:
    // - Improve User Experience (Technical Specification/1.3 System Objectives)
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Submit Expense', path: '/submit-expense' },
        { name: 'My Reports', path: '/my-reports' },
        // Display 'Approvals' link only if the user has the 'manager', 'finance', or 'admin' role.
        // Requirements Addressed:
        // - Role-Based Access Control (Technical Specification/13.1 User Authentication and Authorization)
        //   - TR-F001.3
        ...(['manager', 'finance', 'admin'].includes(user.role) ? [{ name: 'Approvals', path: '/approvals' }] : [])
    ];

    // Define user action items.
    // Allows users to access their profile, settings, and logout functionality.
    // Requirements Addressed:
    // - Improve User Experience (Technical Specification/1.3 System Objectives)
    const userActions = [
        { name: 'Profile', action: () => { window.location.href = '/profile'; } },
        { name: 'Settings', action: () => { window.location.href = '/settings'; } },
        { name: 'Logout', action: logout }
    ];

    return (
        <header className="header">
            {/* Logo Section */}
            {/* Displays the application logo, linking back to the home page */}
            {/* Requirements Addressed:
                - Simplify Expense Management (Technical Specification/1.3 System Objectives)
                - Ensure Consistent Branding */}
            <div className="header-logo" onClick={() => window.location.href = '/'}>
                <img src={logo} alt="Company Logo" />
            </div>

            {/* Navigation Links */}
            {/* Renders the navigation links for easy access to different sections */}
            {/* Requirements Addressed:
                - Improve User Experience (Technical Specification/1.3 System Objectives) */}
            <nav className="header-nav">
                <ul>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <a href={link.path}>{link.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User Actions */}
            {/* Provides user-related actions including profile access, settings, and logout */}
            {/* Requirements Addressed:
                - Improve User Experience (Technical Specification/1.3 System Objectives)
                - User Authentication and Authorization (Technical Specification/13.1 User Authentication and Authorization) */}
            <div className="header-user-actions">
                {/* Display a greeting to the user */}
                <span>Welcome, {user.name}</span>

                {/* User Action Dropdown */}
                <div className="user-action-dropdown">
                    {/* IconComponent used to display a user icon */}
                    {/* Purpose: To render icons within the header for navigation and user actions */}
                    {/* Requirements Addressed:
                        - Improve User Experience (Technical Specification/1.3 System Objectives) */}
                    <IconComponent name="user" />
                    <ul className="dropdown-menu">
                        {userActions.map((action, index) => (
                            <li key={index} onClick={action.action}>
                                {action.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;