import React, { useEffect, useState } from 'react';

function FacultyProfile() {
  const [facultyProfile, setFacultyProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacultyProfile = async () => {
      const facultyId = localStorage.getItem('facultyId'); // Retrieve facultyId from localStorage
      if (!facultyId) {
        setError('Faculty ID is missing. Please log in again.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/faculty/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });        
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setFacultyProfile(data);
      } catch (error) {
        console.error('Error fetching faculty profile:', error);
        setError('Failed to fetch faculty profile. Please try again later.');
      }
    };

    fetchFacultyProfile();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-container">
      <h2>Faculty Profile</h2>
      {facultyProfile ? (
        <div>
          <p><strong>Name:</strong> {facultyProfile.name}</p>
          <p><strong>Email:</strong> {facultyProfile.email}</p>
          {/* Add more profile details as needed */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default FacultyProfile;