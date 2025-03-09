// filepath: /krishna-project/frontend/krishna-frontend/src/components/Dashboard/FacultiesDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import FacultyResearch from '../Research/FacultyResearch';
import './Faculties.css';

function FacultiesDashboard() {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get('/api/faculties');
        setFaculties(response.data);
      } catch (error) {
        console.error('Error fetching faculties:', error);
      }
    };

    fetchFaculties();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar items={faculties} basePath="/faculties" />
      <div className="content">
        <Routes>
          <Route path="/" element={<p className='welcome'>Select a faculty to view their work.</p>} />
          <Route path=":facultyId" element={<FacultyResearch />} />
        </Routes>
      </div>
    </div>
  );
}

export default FacultiesDashboard;