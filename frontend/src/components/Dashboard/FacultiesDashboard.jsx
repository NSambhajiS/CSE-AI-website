// filepath: /krishna-project/frontend/krishna-frontend/src/components/Dashboard/FacultiesDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function FacultiesDashboard() {
  // This should be fetched from the backend
  const faculties = [
    { id: 1, name: 'Faculty 1' },
    { id: 2, name: 'Faculty 2' },
    // Add more faculties as needed
  ];

  return (
    <div>
      <h2>Faculties Dashboard</h2>
      <div className="sidebar">
        <ul>
          {faculties.map((faculty) => (
            <li key={faculty.id}>
              <Link to={`/faculties/${faculty.id}`}>{faculty.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        <p>Select a faculty to view their work.</p>
      </div>
    </div>
  );
}

export default FacultiesDashboard;