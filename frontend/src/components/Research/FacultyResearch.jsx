import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './research.css'; // Import CSS file

function FacultyResearch() {
  const { facultyId } = useParams();
  const [facultyName, setFacultyName] = useState('');
  const [work, setWork] = useState({});

  useEffect(() => {
    const fetchFacultyName = async () => {
      try {
        const response = await axios.get(`/api/faculties/${facultyId}`);
        setFacultyName(response.data.name);
      } catch (error) {
        console.error('Error fetching faculty name:', error);
      }
    };

    const fetchWork = async () => {
      try {
        const response = await axios.get(`/api/faculties/${facultyId}/work`);
        setWork(response.data);
      } catch (error) {
        console.error('Error fetching faculty work:', error);
      }
    };

    fetchFacultyName();
    fetchWork();
  }, [facultyId]);

  // Function to check if a value is a URL
  const isURL = (str) => {
    try {
      const url = new URL(str);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="research-container">
      <h2>{facultyName}'s Work</h2>
      {work && Object.keys(work).length > 0 ? (
        Object.keys(work).map((category) => (
          <div key={category} className="category-section">
            <h3>{category}</h3>
            {work[category] && work[category].length > 0 ? (
              <table className="research-table">
                <thead>
                  <tr>
                    {Object.keys(work[category][0] || {})
                      .filter((column) => column !== 'id' && column !== 'faculty_id') // Exclude columns
                      .map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {work[category].map((item) => (
                    <tr key={item.id}>
                      {Object.keys(item)
                        .filter((column) => column !== 'id' && column !== 'faculty_id') // Exclude columns
                        .map((column) => (
                          <td key={column}>
                            {isURL(item[column]) ? (
                              <a href={item[column]} target="_blank" rel="noopener noreferrer">
                                Link
                              </a>
                            ) : (
                              item[column]
                            )}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available for this category.</p>
            )}
          </div>
        ))
      ) : (
        <p>Loading or no data available...</p>
      )}
    </div>
  );
}

export default FacultyResearch;
