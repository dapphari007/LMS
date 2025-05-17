# Leave Management System - Frontend

This is the frontend application for the Leave Management System, built with React, TypeScript, and Tailwind CSS.

## Features

- User authentication (login, register, profile management)
- Dashboard with leave balances and pending requests
- Apply for leave and manage leave requests
- Manager approval workflow
- Admin management of users, leave types, and holidays
- Responsive design for all devices

## Technologies Used

- React 19
- TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Query for data fetching
- React Hook Form for form handling
- Axios for API requests
- Heroicons for icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the client directory
3. Install dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm run dev
```

### Building for Production

To build the application for production:

```bash
npm run build
```

## Project Structure

- `/src/components` - Reusable UI components
- `/src/context` - React context providers
- `/src/hooks` - Custom React hooks
- `/src/pages` - Application pages
- `/src/services` - API service functions
- `/src/types` - TypeScript type definitions
- `/src/utils` - Utility functions

## Backend Integration

This frontend application is designed to work with the Leave Management System backend API. Make sure the backend server is running and accessible at the URL specified in the API configuration.