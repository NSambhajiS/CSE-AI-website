// filepath: /krishna-project/frontend/krishna-frontend/src/components/Dashboard/ResearchDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Research.css';

function ResearchDashboard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        console.log('API Response:', response.data); // Debugging API response
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="research-dashboard">
      <h2>R&D Dashboard</h2>
      <div className="sidebar">
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/research/${category.name ? category.name.toLowerCase() : ''}`}>
                {category.name || 'Unknown Category'}
              </Link>
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
