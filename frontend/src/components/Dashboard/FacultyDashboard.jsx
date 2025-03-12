// filepath: /krishna-project/frontend/krishna-frontend/src/components/Dashboard/FacultyDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function FacultyDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/faculty/login');
  };

  return (
    <div>
      <h2>Faculty Dashboard</h2>
      <p>Welcome, Faculty!</p>
      {/* Add more faculty-specific content here */}
      <button onClick={handleLogout}>Logout</button> {/* Add Logout Button */}
    </div>
  );
}

export default FacultyDashboard;