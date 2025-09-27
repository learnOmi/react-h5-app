[![zread](https://img.shields.io/badge/Ask_Zread-_.svg?style=flat&color=00b0aa&labelColor=000000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuOTYxNTYgMS42MDAxSDIuMjQxNTZDMS44ODgxIDEuNjAwMSAxLjYwMTU2IDEuODg2NjQgMS42MDE1NiAyLjI0MDFWNC45NjAxQzEuNjAxNTYgNS4zMTM1NiAxLjg4ODEgNS42MDAxIDIuMjQxNTYgNS42MDAxSDQuOTYxNTZDNS4zMTUwMiA1LjYwMDEgNS42MDE1NiA1LjMxMzU2IDUuNjAxNTYgNC45NjAxVjIuMjQwMUM1LjYwMTU2IDEuODg2NjQgNS4zMTUwMiAxLjYwMDEgNC45NjE1NiAxLjYwMDFaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00Ljk2MTU2IDEwLjM5OTlIMi4yNDE1NkMxLjg4ODEgMTAuMzk5OSAxLjYwMTU2IDEwLjY4NjQgMS42MDE1NiAxMS4wMzk5VjEzLjc1OTlDMS42MDE1NiAxNC4xMTM0IDEuODg4MSAxNC4zOTk5IDIuMjQxNTYgMTQuMzk5OUg0Ljk2MTU2QzUuMzE1MDIgMTQuMzk5OSA1LjYwMTU2IDE0LjExMzQgNS42MDE1NiAxMy43NTk5VjExLjAzOTlDNS42MDE1NiAxMC42ODY0IDUuMzE1MDIgMTAuMzk5OSA0Ljk2MTU2IDEwLjM5OTlaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik0xMy43NTg0IDEuNjAwMUgxMS4wMzg0QzEwLjY4NSAxLjYwMDEgMTAuMzk4NCAxLjg4NjY0IDEwLjM5ODQgMi4yNDAxVjQuOTYwMUMxMC4zOTg0IDUuMzEzNTYgMTAuNjg1IDUuNjAwMSAxMS4wMzg0IDUuNjAwMUgxMy43NTg0QzE0LjExMTkgNS42MDAxIDE0LjM5ODQgNS4zMTM1NiAxNC4zOTg0IDQuOTYwMVYyLjI0MDFDMTQuMzk4NCAxLjg4NjY0IDE0LjExMTkgMS42MDAxIDEzLjc1ODQgMS42MDAxWiIgZmlsbD0iI2ZmZiIvPgo8cGF0aCBkPSJNNCAxMkwxMiA0TDQgMTJaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00IDEyTDEyIDQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K&logoColor=ffffff)](https://zread.ai/learnOmi/Simple-Articles-Subscribe-App---H5-react)
# Simple Articles Subscribe App

## Overview

The Simple Articles Subscribe App is a mobile-first React application (H5) designed for article browsing and subscription management. Built with modern web technologies, this application provides users with a seamless experience to discover, read, and manage article subscriptions across different channels.

## What is the Simple Articles Subscribe App?

This application is a content aggregation platform that allows users to browse articles from various channels, subscribe to their preferred content categories, and enjoy a personalized reading experience. The app is specifically optimized for mobile devices (H5), ensuring a responsive and touch-friendly interface that works well across different screen sizes.

The application features a clean, intuitive design with a bottom navigation bar for easy access to different sections: Home, Q&A, Videos, and Personal Profile. The core functionality revolves around the article subscription system, where users can customize their content channels and enjoy an infinite scrolling reading experience with pull-to-refresh capabilities.

## Key Features

### Article Subscription System
The app's centerpiece is its article subscription system, which allows users to:

- Browse articles from multiple channels
- Customize their channel subscriptions
- Enjoy infinite scrolling with pull-to-refresh functionality
- View articles with different layout types (text-only, single image, or multiple images)

### User Authentication
The application includes a robust authentication system with:

- Secure login and logout functionality
- Token-based authentication with automatic token refresh
- Protected routes for user-specific features
- Persistent login state across sessions

### Mobile-Optimized Interface
Built with mobile users in mind, the app features:

- Responsive design that adapts to different screen sizes
- Touch-friendly navigation with a bottom tab bar
- Optimized loading states and smooth transitions
- Clean, modern UI using Ant Design Mobile components

## Technology Stack

The application is built using a modern technology stack that ensures performance, scalability, and maintainability:

| Category | Technology | Purpose |
|----------|------------|---------|
| Frontend Framework | React 19.1.0 | Core UI framework |
| State Management | Redux Toolkit | Centralized state management |
| Routing | React Router DOM 7.6.2 | Navigation and routing |
| UI Components | Ant Design Mobile 5.39.0 | Mobile-optimized UI components |
| HTTP Client | Axios 1.10.0 | API communication |
| Form Handling | Formik 2.4.6 + Yup/Zod | Form validation and management |
| Styling | SCSS | Component styling |
| Build Tool | Create React App + react-app-rewired | Build and development environment |

## Application Architecture

The application follows a well-structured architecture that separates concerns and promotes maintainability:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Components    │ ←→ │   Redux Store    │ ←→ │   API Layer     │
│                 │    │                  │    │                 │
│ - UI Components │    │ - State Management│    │ - Axios Client  │
│ - Pages         │    │ - Actions        │    │ - Authentication│
│ - Layouts       │    │ - Reducers       │    │ - Error Handling│
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  ↓
                         ┌─────────────────┐
                         │   Mobile H5     │
                         │   Application   │
                         └─────────────────┘
```

The application uses a centralized Redux store for state management, with actions and reducers organized in a modular structure. The API layer is abstracted through a custom request utility that handles authentication, token refresh, and error handling.

## Getting Started

To get started with the Simple Articles Subscribe App, you'll need to:

1. **Clone the repository**
2. **Install dependencies** with `npm install`
3. **Start the development server** with `npm start`
4. **Open http://localhost:3000** in your browser

The application will load with the Home screen, where you can browse articles from different channels. You can customize your channel subscriptions by clicking the add icon in the top right corner.

> **Note:** This application uses custom webpack configurations through `react-app-rewired` and includes patches for certain dependencies. Make sure to run `npm install` and `npx patch-package` after cloning to ensure all dependencies are properly installed and patched.

## Next Steps

After getting the application running, you might want to:

- Explore the different sections (Home, Q&A, Videos, My)
- Try customizing your channel subscriptions
- Test the pull-to-refresh and infinite scroll features
- Check out the authentication flow by logging in and out

For more detailed information about specific features and implementation details, refer to the other documentation sections in this series.
