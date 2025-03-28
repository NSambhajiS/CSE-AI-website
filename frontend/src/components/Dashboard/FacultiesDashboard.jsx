import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import FacultyResearch from '../Research/FacultyResearch';
import './Dashboard.css';

function FacultiesDashboard() {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get('/api/faculties');
        setFaculties(
          response.data.map((faculty) => ({
            id: faculty.id,
            name: faculty.name,
          }))
        );
      } catch (error) {
        console.error('Error fetching faculties:', error);
      }
    };

    fetchFaculties();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar items={faculties} basePath="/faculties" heading="Faculty Members" />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={<p className="welcome">Select a faculty to view their work.</p>}
          />
          <Route path=":facultyId" element={<FacultyResearch />} />
        </Routes>
      </div>
    </div>
  );
}

export default FacultiesDashboard;