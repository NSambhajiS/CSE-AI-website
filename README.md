# Krishna Project

The Krishna Project is a comprehensive web application designed to manage and showcase the research and development data of the CSE(AI) department. It includes a **frontend** built with React and Vite, and a **backend** powered by Node.js, Express, and Supabase. The project supports dynamic rendering of data, user authentication, and role-based dashboards for admins and faculty members.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
5. [Frontend Overview](#frontend-overview)
6. [Backend Overview](#backend-overview)
7. [Environment Variables](#environment-variables)
8. [Future Enhancements](#future-enhancements)

---

## Project Structure
krishna-project/ ├── backend/ # Backend code (Node.js, Express, Supabase) │ ├── routes/ # API route handlers │ ├── utils/ # Utility functions (DB connection, authentication) │ ├── middleware/ # Middleware for authentication │ ├── server.js # Main server file │ ├── app.js # Express app configuration │ └── package.json # Backend dependencies ├── frontend/ # Frontend code (React, Vite) │ ├── src/ # React source files │ │ ├── components/ # Reusable React components │ │ ├── pages/ # Page-level components │ │ ├── App.jsx # Main React app │ │ └── main.jsx # React entry point │ ├── public/ # Static assets │ ├── vite.config.js # Vite configuration │ └── package.json # Frontend dependencies └── README.md # Project documentation


---

## Features

### General
- **Dynamic Rendering**: Data-driven rendering of faculties, categories, and research work.
- **Responsive Design**: Fully responsive UI for all devices.

### Admin Features
- Manage faculties, categories, and other admins.
- View and edit admin profiles.
- Role-based access control.

### Faculty Features
- Manage personal research data.
- View and edit faculty profiles.
- Dynamic sidebar for category-based research.

### Authentication
- **JWT Authentication**: Secure login for admins and faculty members.
- **Password Hashing**: Passwords are hashed using bcrypt.
- **Role-Based Access**: Separate dashboards for admins and faculty.

---

## Technologies Used

### Frontend
- **React**: Component-based UI development.
- **Vite**: Fast build tool for modern web projects.
- **React Router**: Client-side routing.
- **Axios**: HTTP client for API requests.

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for building APIs.
- **Supabase**: Database and authentication services.
- **Passport.js**: Authentication middleware.
- **JWT**: JSON Web Tokens for secure authentication.

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account for database setup

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend

2. Install dependencies:
npm install

3. Create a .env file and configure the following variables:
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-key>
JWT_SECRET=<your-jwt-secret>
SESSION_SECRET=<your-session-secret>

4. Start the backend server:
npm start

Frontend Setup
1. Navigate to the frontend folder:
cd frontend

2. Install dependencies:
npm install

3. Start the development server
npm run dev


Frontend Overview
The frontend is built using React and Vite. It includes the following key components:

Admin Dashboard: Manage faculties, categories, and admins.
Faculty Dashboard: Manage personal research data and profile.
Protected Routes: Role-based access control using JWT.
Dynamic Sidebar: Fetches categories or faculties dynamically.
Key Files
src/App.jsx: Main application file with routing.
src/components/: Contains reusable components for the UI.
src/pages/: Page-level components for routing.


Backend Overview
The backend is built using Node.js and Express. It interacts with a Supabase database for data storage and authentication.

Key Features
API Routes: Organized under the routes/ folder.
Authentication: Passport.js strategies for admin and faculty login.
Middleware: JWT-based authentication middleware.
Key Files
server.js: Entry point for the backend server.
routes/: Contains route handlers for admins, faculties, and categories.
utils/db.js: Supabase database connection.
utils/auth.js: Passport.js authentication strategies.


Environment Variables
The following environment variables are required for the project:

Backend
SUPABASE_URL: Supabase project URL.
SUPABASE_KEY: Sup<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'>abase</vscode_annotation> API key.
JWT_SECRET: Secret key for JWT.
SESSION_SECRET: Secret key for session management.

Future Enhancements
TypeScript Integration: Add type safety to both frontend and backend.
Unit Testing: Implement tests for critical components and APIs.
Role Management: Add more granular role-based access control.
Analytics Dashboard: Provide insights into research data.


License
This project is licensed under the MIT License. Feel free to use and modify it as needed.


Let me know if you need further customization!