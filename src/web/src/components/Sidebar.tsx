// Import necessary modules and components
import React from 'react'; // React version 17.0.2
import { IconComponent } from '../assets/icons'; // Internal component to render icons within the sidebar
import { useAuthContext } from '../utils/contexts'; // Hook to access authentication state and determine user-specific navigation options
import '../styles/Sidebar.css'; // Import styles to ensure consistent and visually appealing layout

/**
 * Sidebar component that provides a navigation interface for the web application,
 * allowing users to access different sections quickly.
 *
 * Requirements Addressed:
 * - Improve User Experience (Technical Specification/1.3 System Objectives)
 *   - Description: Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 *
 * @returns {JSX.Element} A JSX element representing the sidebar with navigation links.
 */
const Sidebar: React.FC = () => {
  // Access authentication context to get user information
  const { userRole } = useAuthContext();

  /**
   * Define the base set of navigation links available to all users.
   * Each link consists of a name, icon, and path.
   */
  const navigationLinks = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard',
    },
    {
      name: 'Submit Expense',
      icon: 'expense',
      path: '/submit-expense',
    },
    {
      name: 'My Expenses',
      icon: 'expenses',
      path: '/expenses',
    },
    // Additional common links can be added here
  ];

  /**
   * Extend navigation links based on user role.
   * Managers and Admins have additional navigation options.
   */
  // Include Manager-specific links
  if (userRole === 'Manager') {
    navigationLinks.push({
      name: 'Approval Dashboard',
      icon: 'approvals',
      path: '/approval-dashboard',
    });
  }

  // Include Admin-specific links
  if (userRole === 'Admin') {
    navigationLinks.push(
      {
        name: 'Admin Panel',
        icon: 'admin',
        path: '/admin-panel',
      },
      {
        name: 'User Management',
        icon: 'users',
        path: '/user-management',
      },
      {
        name: 'Policy Configuration',
        icon: 'policy',
        path: '/policy-configuration',
      },
      {
        name: 'Integration Settings',
        icon: 'integration',
        path: '/integration-settings',
      }
    );
  }

  return (
    <div className="sidebar">
      {/* Render navigation links */}
      <nav>
        {navigationLinks.map((link) => (
          // Each link navigates to a different section of the application
          <a key={link.name} href={link.path} className="sidebar-link">
            {/* IconComponent renders the icon associated with the navigation link */}
            <IconComponent name={link.icon} className="sidebar-icon" />
            {link.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;