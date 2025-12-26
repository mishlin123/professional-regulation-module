import React, { useState, useEffect } from 'react';
import { fetchAnalytics } from '../services/supabaseClient';
import './Dashboard.css';

const Dashboard = ({ onSelectScenario }) => {
    const [stats, setStats] = useState({ completed: 0, total: 4 }); // Mock stats for now

    // In a real app we'd fetch user progress here

    return (
        <div className="dashboard-container fade-in">
            {/* Hero Section */}
            <section className="dashboard-hero">
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to Professional Boundaries</h1>
                    <p className="hero-subtitle">Your comprehensive guide to ethical standards and regulation in the teaching profession.</p>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-value">0%</span>
                            <span className="stat-label">Course Complete</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">3</span>
                            <span className="stat-label">Modules Available</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="dashboard-grid">

                {/* Primary Course Card - Featured */}
                <div className="course-card featured">
                    <div className="course-image-placeholder">
                        <span>Course Overview</span>
                    </div>
                    <div className="course-details">
                        <span className="badge badge-core">Core Learning</span>
                        <h2>Professional Boundaries 2025</h2>
                        <p>The complete training module covering the Code of Conduct, boundary breaches, and best practices.</p>
                        <button
                            className="btn btn-primary btn-lg w-full"
                            onClick={() => onSelectScenario('full_course')}
                        >
                            Start Full Course
                        </button>
                    </div>
                </div>

                {/* Quick Scenarios Sidebar/Grid */}
                <div className="scenarios-section">
                    <h3>Practice Scenarios</h3>
                    <p className="section-desc">Test your judgement with these bite-sized interactive situations.</p>

                    <div className="mini-scenario-list">
                        <div className="mini-card" onClick={() => onSelectScenario('14')}>
                            <div className="mini-card-icon">🚗</div>
                            <div className="mini-card-info">
                                <h4>The Ride Home</h4>
                                <p>Safety vs Policies</p>
                            </div>
                            <button className="btn-arrow">→</button>
                        </div>

                        <div className="mini-card" onClick={() => onSelectScenario('23')}>
                            <div className="mini-card-icon">📱</div>
                            <div className="mini-card-info">
                                <h4>Social Media</h4>
                                <p>Friend Requests & Chat</p>
                            </div>
                            <button className="btn-arrow">→</button>
                        </div>

                        <div className="mini-card" onClick={() => onSelectScenario('16')}>
                            <div className="mini-card-icon">🎉</div>
                            <div className="mini-card-info">
                                <h4>The Party Invite</h4>
                                <p>Personal Boundaries</p>
                            </div>
                            <button className="btn-arrow">→</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
