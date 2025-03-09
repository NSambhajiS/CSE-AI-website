// filepath: /krishna-project/frontend/krishna-frontend/src/components/Dashboard/ResearchDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import CategoryResearch from '../Research/CategoryResearch';
import './Dashboard.css';

function ResearchDashboard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar items={categories} basePath="/research" />
      <div className="content">
        <Routes>
          <Route path="/" element={<p className='welcome'>Select a research category to view the work.</p>} />
          <Route path=":categoryType" element={<CategoryResearch />} />
        </Routes>
      </div>
    </div>
  );
}

export default ResearchDashboard;