import React from 'react';
import './Navbar.css';

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="navbar-brand">
          <div className="logo-icon">PR</div>
          <span className="brand-text">Professional Regulation</span>
        </div>
        {user && (
          <div className="navbar-user">
            <span className="user-greeting">Hello, <strong>{user.name}</strong></span>
            <div className="user-avatar">{user.name.charAt(0)}</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
