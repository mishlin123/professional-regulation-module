import React from 'react';
import Navbar from './Navbar';
import './Layout.css';

/**
 * Layout component - Main wrapper for the application
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {Object} [props.user] - Current user object
 * @param {string} [props.user.name] - User's name
 * @param {string} [props.user.id] - User's ID
 * @param {string} [props.footerText='Professional Boundaries for Teachers'] - Footer text
 * @returns {JSX.Element}
 */
const Layout = ({
    children,
    user,
    footerText = 'Professional Boundaries for Teachers'
}) => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="layout">
            {/* Skip to main content link for accessibility */}
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>

            <Navbar user={user} />

            <main
                id="main-content"
                className="main-content"
                role="main"
            >
                <div className="layout-container">
                    {children}
                </div>
            </main>

            <footer className="footer" role="contentinfo">
                <div className="layout-container footer-content">
                    <p className="footer-text">
                        &copy; {currentYear} {footerText}. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
