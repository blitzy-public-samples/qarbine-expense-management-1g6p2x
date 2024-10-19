// MobileFooter.tsx
// This file defines the MobileFooter component for the mobile application,
// providing a consistent footer with navigation links across the app.
// It ensures easy access to key features and enhances user experience by
// maintaining a uniform layout.

// Requirements Addressed:
// - Improve User Experience (Technical Specification/1.3 System Objectives)
//   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.

// Import necessary libraries and components
import React from 'react'; // React library for building UI components
// External dependency - react version 17.0.2

import { Link } from 'react-router-dom'; // For navigation between routes
import '../styles/MobileApp.css'; // Apply consistent styling to the MobileFooter component
import IconComponent from '../assets/icons'; // Render icons within the footer for navigation purposes
import { useAuthContext } from '../utils/contexts'; // Manage authentication state and display user-specific navigation options

// Define the MobileFooter component
const MobileFooter: React.FC = () => {
  // Use the useAuthContext hook to access authentication state
  // This allows us to show different navigation options based on user's authentication status
  const { isAuthenticated } = useAuthContext();

  // Define navigation links and icons based on user authentication status
  const navLinks = [
    { to: '/dashboard', icon: 'home', label: 'Home' },
    { to: '/expenses', icon: 'expense', label: 'Expenses' },
    { to: '/notifications', icon: 'notification', label: 'Notifications' },
  ];

  // If the user is authenticated, include profile and settings links
  // Enhances user experience by providing quick access to personal features
  if (isAuthenticated) {
    navLinks.push(
      { to: '/profile', icon: 'profile', label: 'Profile' },
      { to: '/settings', icon: 'settings', label: 'Settings' }
    );
  } else {
    // If not authenticated, provide a link to the login page
    navLinks.push(
      { to: '/login', icon: 'login', label: 'Login' }
    );
  }

  // Render the footer with navigation links and icons using the IconComponent
  return (
    <footer className="mobile-footer">
      <nav className="footer-nav">
        {navLinks.map((link, index) => (
          <Link key={index} to={link.to} className="footer-nav-link">
            <IconComponent name={link.icon} />
            <span className="nav-link-label">{link.label}</span>
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default MobileFooter;