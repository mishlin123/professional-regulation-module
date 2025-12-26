import React, { useState, useEffect } from 'react';
import { fetchAnalytics } from '../services/supabaseClient';
import './Dashboard.css';

const Dashboard = ({ onSelectScenario }) => {
    const [stats, setStats] = useState({ completed: 0, total: 44 }); // Updated for 44 slides

    return (
        <div className="dashboard-container fade-in">
            {/* Hero Section */}
            <section className="dashboard-hero">
                <div className="hero-content">
                    <h1 className="hero-title">Professional Boundaries for Teachers</h1>
                    <p className="hero-subtitle">The Dos, the Don'ts and the In-Betweens</p>
                    <p className="hero-description">
                        A comprehensive training module presented by Professional Insight.
                        Learn to navigate professional boundaries, understand the Code of Professional Responsibility,
                        and protect both your students and yourself.
                    </p>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-value">44</span>
                            <span className="stat-label">Course Slides</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">14</span>
                            <span className="stat-label">Modules</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">7</span>
                            <span className="stat-label">Case Studies & Scenarios</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="dashboard-grid">

                {/* Primary Course Card - Featured */}
                <div className="course-card featured">
                    <div className="course-image-placeholder">
                        <span>📚 Professional Development</span>
                    </div>
                    <div className="course-details">
                        <span className="badge badge-core">Essential Training</span>
                        <h2>Professional Boundaries Course</h2>
                        <p><strong>Presented by:</strong> Rachel Kent & Bindy Tatham</p>
                        <p>
                            This self-paced module covers essential professional boundaries for teachers,
                            including real Teaching Council cases, interactive scenarios, social media guidelines,
                            and the Code of Professional Responsibility.
                        </p>
                        <div style={{ marginTop: '1.5rem' }}>
                            <h4 style={{ marginBottom: '0.75rem', fontSize: '1rem', color: '#1f2937' }}>What You'll Learn:</h4>
                            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: '#4b5563', lineHeight: '1.75' }}>
                                <li>Understanding professions and professional regulation</li>
                                <li>Types of boundary breaches and their impacts</li>
                                <li>Real case studies from Disciplinary Tribunals</li>
                                <li>Social media risks and best practices</li>
                                <li>Self-reflection and colleague concerns</li>
                            </ul>
                        </div>
                        <button
                            className="btn btn-primary btn-lg w-full"
                            onClick={() => onSelectScenario('full_course')}
                            style={{ marginTop: '1.5rem' }}
                        >
                            Begin Course →
                        </button>
                    </div>
                </div>

                {/* Info Panel */}
                <div className="scenarios-section">
                    <h3>About This Course</h3>
                    <p className="section-desc">
                        This training has been designed to raise your awareness about professional boundaries
                        so you are more alert to potential issues.
                    </p>

                    <div className="mini-card-info-panel">
                        <div className="info-item">
                            <div className="info-icon">⚖️</div>
                            <div>
                                <h4>Real Case Studies</h4>
                                <p>Learn from actual Teaching Council Disciplinary Tribunal cases</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">🎯</div>
                            <div>
                                <h4>Interactive Scenarios</h4>
                                <p>Test your judgment with realistic decision-making exercises</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">📱</div>
                            <div>
                                <h4>Social Media Guidelines</h4>
                                <p>Navigate the risks of online communication with students</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">✓</div>
                            <div>
                                <h4>Certificate Included</h4>
                                <p>Receive a certificate of attendance upon completion</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1rem', background: '#FEF3C7', borderRadius: '0.5rem', borderLeft: '4px solid #F59E0B' }}>
                        <p style={{ margin: 0, fontSize: '0.875rem', color: '#92400E' }}>
                            <strong>Note:</strong> This module is educational, not therapeutic. Some content may trigger emotions.
                            If concerned, speak to your senior teacher or principal.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
