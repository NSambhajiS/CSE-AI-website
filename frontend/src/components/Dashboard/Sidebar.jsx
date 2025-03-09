import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ items, basePath }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button for Small Screens */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li className='heading'>Faculties</li>
          {items.map((item) => (
            <li key={item.id}>
              <Link to={`${basePath}/${item.id}`} onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
