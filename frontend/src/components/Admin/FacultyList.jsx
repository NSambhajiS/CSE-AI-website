import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminList.css'; // Reuse the same styling as AdminList.css

function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newFaculty, setNewFaculty] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/faculties', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFaculties(response.data);
      } catch (error) {
        console.error('Error fetching faculties:', error);
      }
    };

    fetchFaculties();
  }, []);

  const handleRemoveFaculty = async (facultyId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/faculties/${facultyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFaculties(faculties.filter((faculty) => faculty.id !== facultyId));
    } catch (error) {
      console.error('Error removing faculty:', error);
    }
  };

  const handleAddFaculty = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/faculties',
        newFaculty,
        { headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          } 
        }
      );

      if (response.data) {
        setFaculties([...faculties, response.data]);
      }

      setShowForm(false);
      setNewFaculty({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Error adding faculty:', error);
    }
  };

  return (
    <div className="admin-container">
      <button className="add-admin-btn" onClick={() => setShowForm(true)}>+ Add Faculty</button>
      <h2 className="admin-heading">Faculty List</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {faculties.map((faculty) => (
            <tr key={faculty.id}>
              <td>{faculty.name}</td>
              <td>{faculty.email}</td>
              <td>
                <button className="remove-btn" onClick={() => handleRemoveFaculty(faculty.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Faculty</h3>
            <form onSubmit={handleAddFaculty}>
              <input
                type="text"
                placeholder="Name"
                value={newFaculty.name}
                onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newFaculty.email}
                onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={newFaculty.password}
                onChange={(e) => setNewFaculty({ ...newFaculty, password: e.target.value })}
                required
              />

              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Add Faculty</button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyList;
