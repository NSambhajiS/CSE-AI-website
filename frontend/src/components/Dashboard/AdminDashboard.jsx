import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Updated import
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
    { id: 5, name: "Logout", key: "logout" },
  ];

  const [selectedTab, setSelectedTab] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

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
      <Sidebar items={sidebarItems} onSelect={handleSelect} heading="Admin Panel" />
      <div className="content">
        {componentMap[selectedTab] || <p>Select an option from the sidebar.</p>}
      </div>
    </div>
  );
}

export default AdminDashboard;