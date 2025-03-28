import React, { useState, useEffect } from 'react';
import FacultySidebar from '../Faculty/FacultySidebar';
import FacultyProfile from '../Faculty/FacultyProfile';
import CategoryList from '../Faculty/CategoryList';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function FacultyDashboard() {
  const [sidebarItems, setSidebarItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const categories = await response.json();
        const categoryItems = categories.map((category) => ({
          id: category.id,
          name: category.name,
          key: `category-${category.id}`,
        }));
        setSidebarItems([
          { id: 'profile', name: 'Profile', key: 'profile' }, // Add Profile to the sidebar
          ...categoryItems,
          { id: 'logout', name: 'Logout', key: 'logout' },
        ]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/faculty/login');
  };

  const componentMap = {
    profile: <FacultyProfile />, // Map Profile to FacultyProfile component
    logout: handleLogout,
  };

  sidebarItems.forEach((item) => {
    if (item.key.startsWith('category-')) {
      componentMap[item.key] = <CategoryList categoryId={item.id} />;
    }
  });

  const handleSelect = (key) => {
    if (key === 'logout') {
      handleLogout();
    } else {
      setSelectedTab(key);
    }
  };

  return (
    <div className="dashboard">
      <FacultySidebar items={sidebarItems} onSelect={handleSelect} />
      <div className="content">
        {componentMap[selectedTab] || <p>Select an option from the sidebar.</p>}
      </div>
    </div>
  );
}

export default FacultyDashboard;