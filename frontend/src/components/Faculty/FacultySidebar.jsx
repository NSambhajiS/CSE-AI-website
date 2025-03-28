import React, { useState } from 'react';
import "../Dashboard/Dashboard.css";

function FacultySidebar({ items, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          {items.map((item, index) => (
            <li key={item.key || `fallback-key-${index}`}>
              <a href="#" onClick={() => onSelect(item.key)}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FacultySidebar;
