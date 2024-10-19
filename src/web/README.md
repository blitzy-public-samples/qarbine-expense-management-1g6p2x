# Global Employee Travel Expense Tracking App - Web Application

## Overview

Welcome to the web application component of the **Global Employee Travel Expense Tracking App**. This application provides a responsive and intuitive interface for employees, managers, and administrators to manage travel expenses efficiently.

This README provides an overview, setup instructions, architecture details, and usage guidelines for developers working on the web frontend.

## Requirements Addressed

- **Objective:** Improve User Experience
  - **Description:** Deliver an intuitive and user-friendly interface across web and mobile platforms for all user roles.
  - **Location in Documentation:** *Technical Specification/1.3 System Objectives*

The web application is designed to enhance user experience by utilizing modern frontend technologies and design principles, ensuring an intuitive interface for all users as specified in the system objectives.

## Setup Instructions

### Prerequisites

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **Git**

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/global-expense-tracker.git
   cd global-expense-tracker/src/web
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   This will install all internal and external dependencies listed in `package.json`, including:

   - **React** (v17.0.2)
   - **Axios** (v0.21.1)
   - **jwt-decode** (v3.1.2)
   - **Lodash** (v4.17.21)
   - **Normalize.css** (v8.0.1)

### Running the Application

To start the development server:

```bash
npm start
```

The application will be accessible at `http://localhost:3000`.

### Building for Production

To build the app for production:

```bash
npm run build
```

This will create an optimized production build in the `build` directory.

### Running Tests

To execute tests:

```bash
npm test
```

This will run all tests located in the `src/web/tests` directory.

## Architecture Details

The web application is built using **React.js**, following a component-based architecture to promote reusability and maintainability.

### Project Structure

```
src/
├── assets/
│   ├── icons.tsx
│   ├── logo.svg
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   ├── ExpenseForm.tsx
│   ├── ExpenseItem.tsx
│   ├── ExpenseList.tsx
│   ├── ApprovalList.tsx
│   ├── PolicyCompliance.tsx
│   ├── ReimbursementStatus.tsx
│   ├── ReportWidget.tsx
│   ├── UserProfile.tsx
│   ├── Notifications.tsx
│   └── Settings.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── SubmitExpense.tsx
│   ├── ExpenseDetails.tsx
│   ├── ApprovalDashboard.tsx
│   ├── ReportingDashboard.tsx
│   ├── AdminPanel.tsx
│   ├── UserManagement.tsx
│   ├── PolicyConfiguration.tsx
│   └── IntegrationSettings.tsx
├── styles/
│   ├── App.css
│   ├── Header.css
│   ├── Footer.css
│   ├── Sidebar.css
│   ├── ExpenseForm.css
│   ├── ExpenseList.css
│   ├── ApprovalList.css
│   ├── PolicyCompliance.css
│   ├── ReimbursementStatus.css
│   ├── ReportWidget.css
│   ├── UserProfile.css
│   ├── Notifications.css
│   └── Settings.css
├── utils/
│   ├── api.ts
│   ├── auth.ts
│   ├── constants.ts
│   ├── contexts.ts
│   ├── helpers.ts
│   ├── hooks.ts
│   └── validation.ts
├── App.tsx
└── index.tsx
```

### Key Components and Utilities

- **Components:**

  - `Header.tsx`: Renders the top-level navigation bar of the application.
    - *Requirements Addressed: Improves navigation and user accessibility.*
    - *Location in Documentation: Technical Specification/13.2 Expense Submission.*

  - `Footer.tsx`: Renders the footer section of the application.
    - *Requirements Addressed: Provides additional navigation links and information.*
    - *Location in Documentation: Technical Specification/13.1 User Authentication and Authorization.*

  - `Sidebar.tsx`: Provides a navigation interface for accessing different sections of the application.
    - *Requirements Addressed: Enhances user experience by simplifying access to features.*
    - *Location in Documentation: Technical Specification/13.1 User Authentication and Authorization.*

  - `ExpenseForm.tsx`: Captures and submits travel expenses through a user-friendly form.
    - *Requirements Addressed: Enables efficient expense submission.*
    - *Location in Documentation: Technical Specification/13.2 Expense Submission.*

  - `ExpenseList.tsx`: Displays a list of expense items.
    - *Requirements Addressed: Allows users to view and manage submitted expenses.*
    - *Location in Documentation: Technical Specification/13.2 Expense Submission.*

  - `ApprovalList.tsx`: Displays a list of pending expense approvals for managers.
    - *Requirements Addressed: Streamlines the approval process for managers.*
    - *Location in Documentation: Technical Specification/13.4 Approval Workflow.*

  - `PolicyCompliance.tsx`: Displays a list of policies for user compliance.
    - *Requirements Addressed: Ensures users are aware of company policies.*
    - *Location in Documentation: Technical Specification/13.3 Policy and Compliance Engine.*

  - `ReimbursementStatus.tsx`: Displays the status of reimbursements for the user.
    - *Requirements Addressed: Provides transparency on reimbursement processing.*
    - *Location in Documentation: Technical Specification/13.5 Reimbursement Processing.*

  - `ReportWidget.tsx`: Displays financial reports and analytics.
    - *Requirements Addressed: Offers insights through reporting and analytics.*
    - *Location in Documentation: Technical Specification/13.6 Reporting and Analytics.*

  - `UserProfile.tsx`: Renders the user profile page for viewing and editing personal information.
    - *Requirements Addressed: Allows users to manage their personal information.*
    - *Location in Documentation: Technical Specification/13.1 User Authentication and Authorization.*

  - `Notifications.tsx`: Displays various types of notifications to the user.
    - *Requirements Addressed: Enhances communication with real-time updates.*
    - *Location in Documentation: Technical Specification/13.4 Approval Workflow.*

  - `Settings.tsx`: Allows users to view and modify application settings.
    - *Requirements Addressed: Provides customization options for users.*
    - *Location in Documentation: Technical Specification/13.1 User Authentication and Authorization.*

- **Utilities:**

  - `api.ts`: Provides utility functions for making HTTP requests to backend services.
    - *Requirements Addressed: Facilitates communication with backend APIs.*
    - *Location in Documentation: Technical Specification/13.2 Expense Submission.*

  - `auth.ts`: Manages authentication utilities including token handling and user login/logout processes.
    - *Requirements Addressed: Ensures secure user authentication and session management.*
    - *Location in Documentation: Technical Specification/13.1 User Authentication and Authorization.*

  - `constants.ts`: Defines constant values used across the web application for consistency.
    - *Requirements Addressed: Promotes consistency and maintainability.*
    - *Location in Documentation: Technical Specification/13.1 User Authentication and Authorization.*

  - `contexts.ts`: Manages React context providers for state management across components.
    - *Requirements Addressed: Enhances state management and data flow.*
    - *Location in Documentation: Technical Specification/13.2 Expense Submission.*

  - `helpers.ts`: Provides common helper functions for enhanced code reusability.
    - *Requirements Addressed: Improves code efficiency and reusability.*
    - *Location in Documentation: Technical Specification/13.2 Expense Submission.*

  - `hooks.ts`: Encapsulates common logic using custom React hooks.
    - *Requirements Addressed: Simplifies component logic and state management.*
    - *Location in Documentation: Technical Specification/13.2 Expense Submission.*

  - `validation.ts`: Provides validation utilities for form inputs.
    - *Requirements Addressed: Ensures data integrity and compliance with policies.*
    - *Location in Documentation: Technical Specification/13.3 Policy and Compliance Engine.*

## Usage Guidelines

Developers working on the web frontend should adhere to the following guidelines:

- **Coding Standards:**
  - Follow the project's ESLint and Prettier configurations for code style consistency.
  - Use functional components and React Hooks where appropriate.

- **State Management:**
  - Utilize Context API or Redux for managing global state as needed.
  - Keep component state local where applicable.

- **API Integration:**
  - Use `api.ts` utility for all HTTP requests.
  - Handle authentication tokens using `auth.ts`.

- **Component Development:**
  - Create reusable components in the `components` directory.
  - Style components using CSS modules located in the `styles` directory.

- **Testing:**
  - Write unit tests for components and utilities using Jest and React Testing Library.
  - Place test files in the corresponding `tests` directory.

## Dependencies

### Internal Dependencies

- **`src/web/src/utils/api.ts`**
  - Purpose: Provides utility functions for making HTTP requests to backend services.
  - *Requirements Addressed:* Facilitates communication with backend APIs.
  - *Location in Documentation:* Technical Specification/13.2 Expense Submission.

- **`src/web/src/utils/auth.ts`**
  - Purpose: Manages authentication utilities including token handling and user login/logout processes.
  - *Requirements Addressed:* Ensures secure authentication processes.
  - *Location in Documentation:* Technical Specification/13.1 User Authentication and Authorization.

- **`src/web/src/utils/constants.ts`**
  - Purpose: Defines constant values used across the web application for consistency.
  - *Requirements Addressed:* Maintains consistent use of constants throughout the app.
  - *Location in Documentation:* Technical Specification/13.1 User Authentication and Authorization.

- **`src/web/src/utils/contexts.ts`**
  - Purpose: Manages React context providers for state management across components.
  - *Requirements Addressed:* Enhances state management capabilities.
  - *Location in Documentation:* Technical Specification/13.2 Expense Submission.

- **`src/web/src/utils/helpers.ts`**
  - Purpose: Provides common helper functions for enhanced code reusability.
  - *Requirements Addressed:* Promotes code efficiency and reusability.
  - *Location in Documentation:* Technical Specification/13.2 Expense Submission.

- **`src/web/src/utils/hooks.ts`**
  - Purpose: Encapsulates common logic using custom React hooks.
  - *Requirements Addressed:* Simplifies component logic.
  - *Location in Documentation:* Technical Specification/13.2 Expense Submission.

- **`src/web/src/utils/validation.ts`**
  - Purpose: Provides validation utilities for form inputs.
  - *Requirements Addressed:* Ensures data integrity and policy compliance.
  - *Location in Documentation:* Technical Specification/13.3 Policy and Compliance Engine.

### External Dependencies

- **React** (v17.0.2)
  - Purpose: To build and manage the web application's UI components.
  - *Requirements Addressed:* Enables a responsive and dynamic user interface.
  - *Reference:* [React Documentation](https://reactjs.org/)

- **Axios** (v0.21.1)
  - Purpose: To make HTTP requests to backend services.
  - *Requirements Addressed:* Facilitates API communication.
  - *Reference:* [Axios Documentation](https://axios-http.com/)

- **jwt-decode** (v3.1.2)
  - Purpose: To decode JSON Web Tokens for extracting user information.
  - *Requirements Addressed:* Manages authentication tokens.
  - *Reference:* [jwt-decode Documentation](https://github.com/auth0/jwt-decode)

- **Lodash** (v4.17.21)
  - Purpose: To provide utility functions for common tasks.
  - *Requirements Addressed:* Simplifies data manipulation.
  - *Reference:* [Lodash Documentation](https://lodash.com/)

- **Normalize.css** (v8.0.1)
  - Purpose: To ensure cross-browser consistency in default styling.
  - *Requirements Addressed:* Improves UI consistency across browsers.
  - *Reference:* [Normalize.css Documentation](https://necolas.github.io/normalize.css/)

## Licensing

This project is licensed under the [MIT License](../../LICENSE).

## Contact

For any questions or assistance, please contact the development team.

---