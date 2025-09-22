import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/react.svg';

// Main navigation component - I wanted this to be responsive and clean
const Navbar = () => {
  // Track whether mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // This helps me highlight the current page

  // Simple function to toggle mobile menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Helper to check if we're on the current page (for styling active links)
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo section - clicking takes you back to home */}
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Lab Logo" className="logo-image" />
          </Link>
        </div>

        {/* Hamburger menu for mobile - those three lines that become an X */}
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          <span className={isOpen ? 'bar open' : 'bar'}></span>
          <span className={isOpen ? 'bar open' : 'bar'}></span>
          <span className={isOpen ? 'bar open' : 'bar'}></span>
        </div>

        {/* Main navigation menu - responsive for both desktop and mobile */}
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`} 
              onClick={toggleMenu} // Close mobile menu when link is clicked
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/publications" 
              className={`nav-link ${isActive('/publications') ? 'nav-link-active' : ''}`} 
              onClick={toggleMenu}
            >
              Publications
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/news" 
              className={`nav-link ${isActive('/news') ? 'nav-link-active' : ''}`} 
              onClick={toggleMenu}
            >
              News
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/people" 
              className={`nav-link ${isActive('/people') ? 'nav-link-active' : ''}`} 
              onClick={toggleMenu}
            >
              People
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`} 
              onClick={toggleMenu}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
