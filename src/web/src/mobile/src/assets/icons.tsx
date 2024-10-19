/**
 * File: src/web/src/mobile/src/assets/icons.tsx
 * Description:
 * This file contains React components for various icons used in the mobile application.
 * These icons are designed to be reusable across different components and screens,
 * providing a consistent look and feel throughout the app.
 *
 * Requirements Addressed:
 * - Improve User Experience (Technical Specification/1.3 System Objectives)
 *   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 */

import React from 'react'; // Version 17.0.2 - To create React components for icons

// Internal dependency to use icon components within utility functions
import { getIcon } from '../utils/helpers'; // '../utils/helpers.ts'

/**
 * IconProps
 *
 * Props interface for the IconComponent.
 * @property {string} iconName - The name of the icon to render.
 * @property {React.CSSProperties} [style] - Optional styling object to customize the icon appearance.
 */
type IconProps = {
  iconName: string;
  style?: React.CSSProperties;
};

/**
 * IconComponent
 *
 * A React component that renders an icon based on the provided name and style properties.
 *
 * Steps:
 * 1. Receive the iconName and style as parameters.
 * 2. Determine the icon to render based on the iconName.
 * 3. Apply the provided style to the icon.
 * 4. Return the icon as a JSX element.
 *
 * Requirements Addressed:
 * - Improve User Experience (Technical Specification/1.3 System Objectives)
 *   - Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 *
 * @param {IconProps} props - The properties for the component.
 * @returns {JSX.Element | null} - A JSX element representing the icon, or null if the icon is not found.
 */
const IconComponent: React.FC<IconProps> = ({ iconName, style }) => {
  // Step 1: Receive the iconName and style as parameters.

  // Step 2: Determine the icon to render based on the iconName.
  // Use the getIcon function from helpers to retrieve the appropriate icon component.
  const Icon = getIcon(iconName);

  if (!Icon) {
    // If the icon is not found, log a warning and return null.
    console.warn(`Icon "${iconName}" not found.`);
    return null;
  }

  // Step 3: Apply the provided style to the icon.
  // Step 4: Return the icon as a JSX element.
  return <Icon style={style} />;
};

export default IconComponent;