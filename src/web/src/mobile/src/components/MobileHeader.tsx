// MobileHeader.tsx

// External Dependencies
import React from 'react'; // React library (version 17.0.2)

// Internal Dependencies
import { useAuthContext } from '../utils/contexts'; // Manages authentication state and provides user-specific navigation options.
import { IconComponent } from '../assets/icons'; // Displays navigation icons within the header.
import logoSVG from '../assets/logo.svg'; // Company logo for brand consistency.

/**
 * MobileHeader Component
 *
 * Renders the mobile header with navigation icons and the company logo.
 * Addresses the requirement to improve user experience by providing a consistent and branded header, enhancing user experience and brand recognition across the mobile application.
 *
 * Requirements Addressed:
 * - Improve User Experience (Technical Specification/1.3 System Objectives)
 *   - "Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles."
 *
 * @returns {JSX.Element} A JSX element representing the mobile header.
 */
const MobileHeader: React.FC = () => {
  // Access authentication state to customize navigation options based on user role.
  const { user } = useAuthContext();

  return (
    <header style={styles.header}>
      {/* Company logo for brand consistency */}
      <div style={styles.logoContainer}>
        <img src={logoSVG} alt="Company Logo" style={styles.logoImage} />
      </div>

      {/* Navigation icons for user interaction */}
      <nav style={styles.navigationIcons}>
        <IconComponent name="home" />
        <IconComponent name="expenses" />
        <IconComponent name="approvals" />
        <IconComponent name="reports" />
        <IconComponent name="settings" />
        {/* Conditionally render admin icon for users with admin role */}
        {user && user.role === 'admin' && (
          <IconComponent name="admin" />
        )}
      </nav>
    </header>
  );
};

// Styles for the MobileHeader component
const styles: { [key: string]: React.CSSProperties } = {
  // Styles the header component to ensure it is fixed at the top and visually distinct.
  // Referenced from JSON specification under 'styles' -> 'selector': '.header'.
  header: {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    height: '56px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    height: '32px',
  },
  navigationIcons: {
    display: 'flex',
    alignItems: 'center',
  },
};

export default MobileHeader;