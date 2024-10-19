// Import React (version 17.0.2) to create the IconComponent as a React component.
// External Dependency: react (version 17.0.2)
// Purpose: To create the IconComponent as a React component.
import React from 'react';

// Define the properties expected by the IconComponent.
// Interface: IconProps
// - iconName: The name of the icon to render.
// - style: Optional custom styles to apply to the icon.
interface IconProps {
  iconName: string;
  style?: React.CSSProperties;
}

// Mapping of icon names to their corresponding SVG elements.
// This mapping is used to determine which icon to render based on the iconName parameter.
// Addressing Requirement: 'Improve User Experience' (Technical Specification/1.3 System Objectives)
// Description: Provide a consistent set of icons for use across the application to enhance the user interface.
const iconsMap: { [key: string]: JSX.Element } = {
  // 'home' icon SVG element
  home: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* SVG Path for 'home' icon */}
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  ),
  // 'settings' icon SVG element
  settings: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* SVG Path for 'settings' icon */}
      <path d="M19.14 12.94c.04-.31.07-.63.07-.94s-.03-.63-.07-.94l2.03-1.58a.5.5 0 000-.8l-1.91-1.91a.5.5 0 00-.8 0l-1.58 2.03c-.31-.04-.63-.07-.94-.07s-.63.03-.94.07L9.93 4.93a.5.5 0 00-.8 0L7.22 6.84a.5.5 0 000 .8l2.03 1.58c-.04.31-.07.63-.07.94s.03.63.07.94L4.93 14.07a.5.5 0 000 .8l1.91 1.91a.5.5 0 00.8 0l1.58-2.03c.31.04.63.07.94.07s.63-.03.94-.07l1.58 2.03a.5.5 0 00.8 0l1.91-1.91a.5.5 0 000-.8l-2.03-1.58zM12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z" />
    </svg>
  ),
  // Additional icons can be added here following the same structure.
};

// The IconComponent functional component.
// Purpose: Renders an icon based on the provided iconName and style properties.
// Addressing Requirement: 'Improve User Experience' (Technical Specification/1.3 System Objectives)
// Description: Deliver an intuitive and user-friendly interface by providing consistent iconography across web and mobile platforms for all user roles.
const IconComponent: React.FC<IconProps> = ({ iconName, style }) => {
  // Retrieve the corresponding icon from the iconsMap using the iconName parameter.
  const Icon = iconsMap[iconName];

  // If the iconName does not match any icon in the iconsMap, log a warning and return null or a default icon.
  if (!Icon) {
    console.warn(`Icon "${iconName}" not found. Please ensure the iconName is correct.`);
    return null; // Optionally, return a default icon instead of null.
  }

  // Render the icon, applying any additional styles passed through the style parameter.
  return <span style={style}>{Icon}</span>;
};

// Export the IconComponent for use in other parts of the application.
// Internal Dependency: IconComponent (src/web/src/assets/icons.tsx)
// Purpose: To provide a consistent set of icons for use across the application.
export default IconComponent;