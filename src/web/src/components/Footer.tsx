// src/web/src/components/Footer.tsx
// This file defines the Footer component for the web application, providing a consistent footer section across all pages.
// It includes links to social media, contact information, and branding elements such as the company logo.

// Requirements Addressed:
// - 'Improve User Experience' (Technical Specification/1.3 System Objectives)
//   Description: 'Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.'

// Imports
import React from 'react'; // React version 17.0.2
import IconComponent from '../assets/icons'; // To render icons within the footer for social media links or other interactive elements.
import logo from '../assets/logo.svg'; // To display the company logo in the footer for branding purposes.
import '../styles/Footer.css'; // To apply styles to the Footer component and ensure it aligns with the design specifications.

/**
 * Footer Component
 * 
 * Provides a consistent footer section across all pages, enhancing user navigation and access to company information.
 * 
 * Requirements Addressed:
 * - 'Improve User Experience' (Technical Specification/1.3 System Objectives)
 *   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 * 
 * @returns {JSX.Element} A JSX element representing the footer section.
 * 
 * Steps:
 * 1. Import necessary React modules and components such as IconComponent and logo.
 * 2. Define the footer layout using HTML elements like <footer>, <nav>, and <img> for the logo.
 * 3. Use IconComponent to render social media icons within the footer.
 * 4. Apply styles from Footer.css to ensure consistent design.
 * 5. Return the constructed JSX element representing the footer.
 */
const Footer: React.FC = (): JSX.Element => {
    return (
        <footer className="footer">
            {/* Branding section with company logo */}
            <div className="footer__branding">
                <img src={logo} alt="Company Logo" className="footer__logo" />
            </div>

            {/* Navigation links section */}
            <nav className="footer__nav">
                <ul className="footer__nav-list">
                    <li className="footer__nav-item">
                        <a href="/about" className="footer__nav-link">About Us</a>
                    </li>
                    <li className="footer__nav-item">
                        <a href="/contact" className="footer__nav-link">Contact</a>
                    </li>
                    <li className="footer__nav-item">
                        <a href="/careers" className="footer__nav-link">Careers</a>
                    </li>
                    <li className="footer__nav-item">
                        <a href="/privacy" className="footer__nav-link">Privacy Policy</a>
                    </li>
                    <li className="footer__nav-item">
                        <a href="/terms" className="footer__nav-link">Terms of Service</a>
                    </li>
                </ul>
            </nav>

            {/* Social media icons section */}
            <div className="footer__social">
                {/* Render social media icons using IconComponent */}
                
                {/* Facebook Icon */}
                <IconComponent iconName="facebook" url="https://www.facebook.com/YourCompany" />

                {/* Twitter Icon */}
                <IconComponent iconName="twitter" url="https://www.twitter.com/YourCompany" />

                {/* LinkedIn Icon */}
                <IconComponent iconName="linkedin" url="https://www.linkedin.com/company/YourCompany" />

                {/* Instagram Icon */}
                <IconComponent iconName="instagram" url="https://www.instagram.com/YourCompany" />
            </div>

            {/* Contact information section */}
            <div className="footer__contact">
                <p>
                    Contact us at{' '}
                    <a href="mailto:support@yourcompany.com" className="footer__contact-link">
                        support@yourcompany.com
                    </a>
                </p>
                <p>
                    © {new Date().getFullYear()} Your Company Name. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

// Export the Footer component for use in other parts of the application
export default Footer;