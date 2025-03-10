import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminList.css"; // Import the external CSS file

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admins");  // ✅ Fixed URL
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error.response ? error.response.data : error.message);
      }
    };

    fetchAdmins();
  }, []);

  const handleRemoveAdmin = async (adminId) => {
    try {
      await axios.delete(`http://localhost:3000/api/admins/${adminId}`);  // ✅ Fixed URL
      setAdmins(admins.filter((admin) => admin.id !== adminId));
    } catch (error) {
      console.error("Error removing admin:", error.response ? error.response.data : error.message);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/admins", newAdmin, {
        headers: { "Content-Type": "application/json" },
      });

      setAdmins([...admins, response.data]);
      setShowForm(false);
      setNewAdmin({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error adding admin:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="admin-container">
      <button className="add-admin-btn" onClick={() => setShowForm(true)}>+ Add Admin</button>
      <h2 className="admin-heading">Admin List</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>
                <button className="remove-btn" onClick={() => handleRemoveAdmin(admin.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Admin</h3>
            <form onSubmit={handleAddAdmin}>
              <input type="text" placeholder="Name" value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} required />
              <input type="email" placeholder="Email" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} required />
              <input type="password" placeholder="Password" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} required />

              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Add Admin</button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminList;
