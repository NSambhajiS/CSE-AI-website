import React, { useEffect, useState } from 'react';
import "../Research/research.css";

function CategoryList({ categoryId }) {
  const [categoryName, setCategoryName] = useState('');
  const [researchData, setResearchData] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [columns, setColumns] = useState([]);
  const [editId, setEditId] = useState(null); // Track the ID being edited

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/faculty/category/${categoryId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch category data');
        }

        const data = await response.json();
        setCategoryName(data.categoryName);
        setResearchData(data.researchData);

        if (data.researchData.length > 0) {
          setColumns(
            Object.keys(data.researchData[0]).filter(
              (key) => key !== 'id' && key !== 'faculty_id'
            )
          );
        } else if (data.tableColumns) {
          setColumns(data.tableColumns.filter((key) => key !== 'id' && key !== 'faculty_id'));
        }

        const initialFormData = {};
        (data.tableColumns || []).forEach((key) => {
          if (key !== 'id' && key !== 'faculty_id') {
            initialFormData[key] = '';
          }
        });
        setFormData(initialFormData);
      } catch (err) {
        console.error('Error fetching category data:', err);
        setError('Failed to fetch category data. Please try again later.');
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  const isURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editId
        ? `http://localhost:3000/api/faculty/category/${categoryId}/${editId}`
        : `http://localhost:3000/api/faculty/category/${categoryId}`;
      const method = editId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      const updatedData = await response.json();

      if (editId) {
        setResearchData((prevData) =>
          prevData.map((item) => (item.id === editId ? updatedData.data[0] : item))
        );
      } else {
        setResearchData([...researchData, updatedData.data[0]]);
      }

      setShowModal(false);
      setEditId(null);
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/faculty/category/${categoryId}/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete data');
      }

      setResearchData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Failed to delete data. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData(item);
    setShowModal(true);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="research-container">
      <h2>Research Work in {categoryName}</h2>
      <button onClick={() => setShowModal(true)} className="add-button">Add</button>
      {researchData.length > 0 ? (
        <table className="research-table">
          <thead>
            <tr>
              {columns.map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {researchData.map((item) => (
              <tr key={item.id}>
                {columns.map((key) => (
                  <td key={key}>
                    {isURL(item[key]) ? (
                      <a href={item[key]} target="_blank" rel="noopener noreferrer">Link</a>
                    ) : (
                      item[key]
                    )}
                  </td>
                ))}
                <td>
                  <button onClick={() => handleEdit(item)} className="edit-button">Update</button>
                  <button onClick={() => handleDelete(item.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No research data available for this category.</p>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId ? 'Update Data' : 'Add New Data'}</h3>
            <form onSubmit={handleFormSubmit}>
              {columns.map((key) => (
                <div key={key}>
                  <label>{key}:</label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryList;