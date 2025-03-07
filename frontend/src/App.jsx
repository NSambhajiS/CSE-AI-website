import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import FacultyPage from './pages/FacultyPage';
import ResearchPage from './pages/ResearchPage';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import FacultyDashboard from './components/Dashboard/FacultyDashboard';
import FacultiesDashboard from './components/Dashboard/FacultiesDashboard';
import ResearchDashboard from './components/Dashboard/ResearchDashboard';
import About from './components/Home/About';
import HODIntro from './components/Home/HODIntro';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function AppContent() {
  const location = useLocation(); // Now useLocation() is inside a Router!

  // Define paths where the footer should be visible
  const showFooterPaths = ["/", "/about", "/hod"];
  const showFooter = showFooterPaths.includes(location.pathname);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculties" element={<FacultiesDashboard />} />
        <Route path="/research" element={<ResearchDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/hod" element={<HODIntro />} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent /> {/* Now, AppContent is inside Router, so useLocation() works! */}
    </Router>
  );
}

export default App;
