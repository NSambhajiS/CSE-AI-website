import React, { useState } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminList from "../Admin/AdminList";
import FacultyList from "../Admin/FacultyList";
import CategoryList from "../Admin/CategoryList";
import AdminProfile from "../Admin/AdminProfile";
import "./Dashboard.css";
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const sidebarItems = [
    { id: 1, name: "Admins", key: "admins" },
    { id: 2, name: "Faculties", key: "faculties" },
    { id: 3, name: "Categories", key: "categories" },
    { id: 4, name: "Profile", key: "profile" },
  ];

  const [selectedTab, setSelectedTab] = useState(null);
  const navigate = useNavigate();

  // Add logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };
  
  // Map key to the correct component
  const componentMap = {
    admins: <AdminList />,
    faculties: <FacultyList />,
    categories: <CategoryList />,
    profile: <AdminProfile onLogout={handleLogout} />,
  };

  

  const handleSelect = (key) => {
    if (key === 'logout') {
      handleLogout();
    } else {
      setSelectedTab(key);
    }
  };

  return (
    <div className="dashboard">
      <AdminSidebar items={sidebarItems} onSelect={handleSelect} />
      <div className="content">
        {componentMap[selectedTab] || <p>Select an option from the sidebar.</p>}
      </div>
    </div>
  );
}

export default AdminDashboard;
