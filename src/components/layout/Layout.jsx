import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, user }) => {
    return (
        <div className="layout">
            <Navbar user={user} />
            <main className="main-content">
                <div className="container">
                    {children}
                </div>
            </main>
            <footer className="footer">
                <div className="container text-center text-muted text-sm">
                    &copy; {new Date().getFullYear()} Professional Regulation Training. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
