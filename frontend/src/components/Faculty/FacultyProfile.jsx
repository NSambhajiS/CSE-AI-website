import React, { useEffect, useState } from 'react';

function FacultyProfile() {
  const [facultyProfile, setFacultyProfile] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to toggle modal
  const [formData, setFormData] = useState({ name: '', email: '', password: '' }); // Form data

  useEffect(() => {
    const fetchFacultyProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/faculty/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setFacultyProfile(data);
        setFormData({ name: data.name, email: data.email, password: '' }); // Pre-fill form data
      } catch (error) {
        console.error('Error fetching faculty profile:', error);
        setError('Failed to fetch faculty profile. Please try again later.');
      }
    };

    fetchFacultyProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/faculty/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      setFacultyProfile(updatedProfile); // Update profile with new data
      setShowModal(false); // Close modal
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

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
          <button onClick={() => setShowModal(true)}>Edit Profile</button> {/* Edit Profile Button */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Profile</h3>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                />
              </div>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyProfile;