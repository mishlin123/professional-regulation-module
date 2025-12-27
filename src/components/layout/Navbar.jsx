import React, { useState } from 'react';
import './Navbar.css';

/**
 * Navbar component - Top navigation bar
 * @param {Object} props
 * @param {Object} [props.user] - Current user object
 * @param {string} [props.user.name] - User's name
 * @param {string} [props.user.id] - User's ID
 * @param {string} [props.logoText='PR'] - Logo text
 * @param {string} [props.brandName='Professional Regulation'] - Brand name
 * @param {Function} [props.onLogoClick] - Callback when logo is clicked
 * @returns {JSX.Element}
 */
const Navbar = ({
  user,
  logoText = 'PR',
  brandName = 'Professional Regulation',
  onLogoClick
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Generate safe avatar text (handle empty/null names)
   * @returns {string} Single character for avatar
   */
  const getAvatarText = () => {
    if (!user?.name || user.name.trim() === '') {
      return '?';
    }
    return user.name.charAt(0).toUpperCase();
  };

  const handleLogoClick = (e) => {
    if (onLogoClick) {
      e.preventDefault();
      onLogoClick();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Logo / Brand */}
        <a
          href="/"
          className="navbar-brand"
          onClick={handleLogoClick}
          aria-label={`${brandName} - Home`}
        >
          <div
            className="logo-icon"
            aria-hidden="true"
          >
            {logoText}
          </div>
          <span className="brand-text">{brandName}</span>
        </a>

        {/* Mobile menu toggle */}
        <button
          className="navbar-toggle"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        {/* User section */}
        <div className={`navbar-user ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {user ? (
            <>
              <span className="user-greeting">
                Hello, <strong>{user.name}</strong>
              </span>
              <div
                className="user-avatar"
                title={user.name}
                aria-label={`${user.name}'s avatar`}
              >
                {getAvatarText()}
              </div>
            </>
          ) : (
            <span className="user-placeholder">Sign in</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
