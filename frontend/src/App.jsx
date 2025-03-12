import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import FacultyPage from './pages/FacultyPage';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import FacultyDashboard from './components/Dashboard/FacultyDashboard';
import FacultiesDashboard from './components/Dashboard/FacultiesDashboard';
import ResearchDashboard from './components/Dashboard/ResearchDashboard';
import About from './components/Home/About';
import HODIntro from './components/Home/HODIntro';
import Navbar from './components/Navbar/Navbar';
import AdminLogin from './components/Auth/AdminLogin';
import FacultyLogin from './components/Auth/FacultyLogin';

// Function to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/admin/login" element={<AdminLogin />} /> {/* Add Admin Login Route */}
          <Route path="/faculty/login" element={<FacultyLogin />} /> {/* Add Faculty Login Route */}
          <Route path="/admin/dashboard/*" element={<ProtectedRoute element={<AdminDashboard />} />} /> {/* Protect Admin Dashboard */}
          <Route path="/faculty/dashboard" element={<ProtectedRoute element={<FacultyDashboard />} />} /> {/* Protect Faculty Dashboard */}
          <Route path="/faculties/*" element={<FacultiesDashboard />} />
          <Route path="/research/*" element={<ResearchDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/hod" element={<HODIntro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;