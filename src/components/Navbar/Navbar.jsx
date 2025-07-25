import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/react.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Lab Logo" className="logo-image" />
          </Link>
        </div>

        <div className="mobile-menu-icon" onClick={toggleMenu}>
          <span className={isOpen ? 'bar open' : 'bar'}></span>
          <span className={isOpen ? 'bar open' : 'bar'}></span>
          <span className={isOpen ? 'bar open' : 'bar'}></span>
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`} 
              onClick={toggleMenu}
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
