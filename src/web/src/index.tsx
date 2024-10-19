// Entry point for the web application
// Responsible for rendering the root component and setting up the application's context and routing
// This file addresses the requirement:
// - "Improve User Experience" (Technical Specification/1.3 System Objectives)
//   Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.

// Import necessary modules and components

// Import React library to build and manage the UI and state.
// Version: 17.0.2
import React from 'react'; // react v17.0.2

// Import ReactDOM to render the React application into the DOM.
// Version: 17.0.2
import ReactDOM from 'react-dom'; // react-dom v17.0.2

// Import the main App component which sets up routing and context providers.
// Located at 'src/web/src/App.tsx'
import App from './App';

// Import BrowserRouter for routing capabilities.
// Enables navigation between different pages in the application.
import { BrowserRouter } from 'react-router-dom';

// Import GlobalProvider for global state management.
// Ensures the application is wrapped with necessary context providers.
// From 'src/web/src/utils/contexts.ts'
import { GlobalProvider } from './utils/contexts';

/**
 * Renders the main application component into the root DOM node.
 *
 * This function addresses the requirement:
 * - "Improve User Experience" (Technical Specification/1.3 System Objectives)
 *   Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
 *
 * By setting up the application's context providers and routing, we enable a cohesive and interactive user experience.
 *
 * Steps:
 * 1. Use ReactDOM.render to render the App component into the root DOM node with the id 'root'.
 * 2. Ensure that the application is wrapped with necessary context providers for global state management.
 * 3. Set up routing for the application by wrapping with BrowserRouter.
 *
 * @returns void
 */
function renderApp(): void {
  // Render the application into the DOM using ReactDOM.render.
  // The App component is wrapped with GlobalProvider and BrowserRouter to provide global state and routing.
  ReactDOM.render(
    // GlobalProvider provides global state to the application, enabling consistent state management across components.
    // BrowserRouter enables routing, allowing navigation between different pages.
    <GlobalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalProvider>,
    // Render into the DOM element with id 'root', defined in 'src/web/public/index.html'.
    document.getElementById('root')
  );
}

// Initialize the application by calling the renderApp function.
// This kicks off the rendering process and mounts the application to the DOM.
renderApp();