import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminProfile({ onLogout }) {
  const [admin, setAdmin] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/admin/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAdmin(response.data);
        setFormData({ name: response.data.name, email: response.data.email, password: '' });
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:3000/api/admin/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdmin(response.data);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating admin details:', error);
    }
  };

  return (
    <div>
      <h2>Admin Profile</h2>
      <p>Name: {admin.name}</p>
      <p>Email: {admin.email}</p>
      <button onClick={() => setShowModal(true)}>Edit Profile</button>

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
                />
              </div>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;