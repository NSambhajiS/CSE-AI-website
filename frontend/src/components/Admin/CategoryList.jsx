import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoryList.css'; // Separate CSS file

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/categories', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.response ? error.response.data : error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="category-container">
      <h2 className="category-heading">Category List</h2>
      <div className="card-list">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
