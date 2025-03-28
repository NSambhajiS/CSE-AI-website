import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ items, onSelect, basePath, heading }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button for Small Screens */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {heading && <li className="heading">{heading}</li>}
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {basePath ? (
                <Link to={`${basePath}/${item.id}`} onClick={() => setIsOpen(false)}>
                  {item.name}
                </Link>
              ) : (
                <a href="#" onClick={() => onSelect(item.key)}>
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;