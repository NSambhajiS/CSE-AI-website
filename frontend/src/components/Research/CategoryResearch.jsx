import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./research.css"; // Import CSS file

function CategoryResearch() {
  const { categoryType: categoryId } = useParams();
  const [categoryName, setCategoryName] = useState(""); // Store category name
  const [work, setWork] = useState({});

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await axios.get(`/api/research/${categoryId}`);
        setCategoryName(response.data.categoryName); // Set category name
        setWork(response.data.facultyWiseData); // Set research data
      } catch (error) {
        console.error("Error fetching research work:", error);
      }
    };

    fetchWork();
  }, [categoryId]);

  // Function to check if a value is a URL
  const isURL = (str) => {
    if (typeof str !== "string") return false;
    try {
      const url = new URL(str);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="research-container">
      <h2>Research Work in {categoryName}</h2> {/* Updated heading */}
      {work && Object.keys(work).length > 0 ? (
        Object.keys(work).map((faculty) => (
          <div key={faculty} className="category-section">
            <h3>{faculty}</h3> {/* Faculty Name as Table Title */}
            {work[faculty] && work[faculty].length > 0 ? (
              <table className="research-table">
                <thead>
                  <tr>
                    {Object.keys(work[faculty][0] || {})
                      .filter(
                        (column) =>
                          column !== "id" && column !== "faculty_id" && column.toLowerCase() !== "faculties"
                      )
                      .map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {work[faculty].map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.keys(item)
                        .filter(
                          (column) =>
                            column !== "id" && column !== "faculty_id" && column.toLowerCase() !== "faculties"
                        )
                        .map((column) => {
                          const cellValue = item[column];

                          return (
                            <td key={column}>
                              {isURL(cellValue) ? (
                                <a href={cellValue} target="_blank" rel="noopener noreferrer">
                                  Link
                                </a>
                              ) : typeof cellValue === "object" ? (
                                JSON.stringify(cellValue) // Convert object to string
                              ) : (
                                cellValue
                              )}
                            </td>
                          );
                        })}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No research data available for this faculty.</p>
            )}
          </div>
        ))
      ) : (
        <p>Loading or no data available...</p>
      )}
    </div>
  );
}

export default CategoryResearch;
