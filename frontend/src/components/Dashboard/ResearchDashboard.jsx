// filepath: /krishna-project/frontend/krishna-frontend/src/components/Dashboard/ResearchDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function ResearchDashboard() {
  // This should be fetched from the backend
  const researchTypes = [
    { id: 1, type: 'Patents' },
    { id: 2, type: 'Publications' },
    { id: 3, type: 'Copyrights' },
    // Add more research types as needed
  ];

  return (
    <div>
      <h2>R&D Dashboard</h2>
      <div className="sidebar">
        <ul>
          {researchTypes.map((research) => (
            <li key={research.id}>
              <Link to={`/research/${research.type.toLowerCase()}`}>{research.type}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        <p>Select a research type to view the work.</p>
      </div>
    </div>
  );
}

export default ResearchDashboard;