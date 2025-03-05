import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import FacultyPage from './pages/FacultyPage';
import ResearchPage from './pages/ResearchPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/research" element={<ResearchPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
