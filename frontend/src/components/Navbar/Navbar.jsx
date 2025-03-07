import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import menu_icon from '../../assets/menu-icon.png';

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <ul className={`nav-links ${mobileMenu ? 'show-mobile-menu' : ''}`}>
        <li>
          <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
        </li>
        <li>
          <Link to="/research" onClick={() => setMobileMenu(false)}>R&D</Link>
        </li>
        <li>
          <Link to="/faculties" onClick={() => setMobileMenu(false)}>Faculties</Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMobileMenu(false)}>About</Link>
        </li>
        <li>
          <Link to="/hod" onClick={() => setMobileMenu(false)}>HoD</Link>
        </li>
        <li>
          <Link to="/admin" onClick={() => setMobileMenu(false)} className="btn">Admin Login</Link>
        </li>
        <li>
          <Link to="/faculty" onClick={() => setMobileMenu(false)} className="btn">Faculty Login</Link>
        </li>
      </ul>
      <img src={menu_icon} alt="Menu" className="menu-icon" onClick={toggleMenu} />
    </nav>
  );
}

export default Navbar;
