// filepath: /krishna-project/frontend/krishna-frontend/src/components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/research">R&D</Link>
        </li>
        <li>
          <Link to="/faculties">Faculties</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/hod">HoD</Link>
        </li>
        <li>
          <Link to="/admin">Admin Login</Link>
        </li>
        <li>
          <Link to="/faculty">Faculty Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;