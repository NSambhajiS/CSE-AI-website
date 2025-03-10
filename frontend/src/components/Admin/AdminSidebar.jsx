import React, { useState } from "react";
import "../Dashboard/Sidebar.css";

function AdminSidebar({ items, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button for Mobile View */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="heading">Admin Panel</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id} onClick={() => onSelect(item.key)}>
              <a href="#" className="sidebar-link">{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AdminSidebar;
