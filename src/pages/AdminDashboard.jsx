
// Add to dependencies
import React, { useState, useEffect } from 'react';
import { fetchAnalytics } from '../services/supabaseClient';
import './AdminDashboard.css';

const AdminDashboard = ({ onBack }) => {
    const [analyticsData, setAnalyticsData] = useState([]);

    useEffect(() => {
        // Load data
        fetchAnalytics().then(setAnalyticsData);
    }, []);

    return (
        <div className="admin-dashboard fade-in">
            <div className="admin-header">
                <h2>Admin Dashboard</h2>
                <button className="btn btn-outline" onClick={onBack}>Back to App</button>
            </div>

            <div className="card">
                <h3>Learner Progress</h3>
                <table className="analytics-table">
                    <thead>
                        <tr>
                            <th>Teacher Name</th>
                            <th>Status</th>
                            <th>Quiz Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {analyticsData.length > 0 ? (
                            analyticsData.map((row, idx) => (
                                <tr key={idx}>
                                    <td>{row.name}</td>
                                    <td>{row.completed ? <span className="tag success">Completed</span> : <span className="tag pending">In Progress</span>}</td>
                                    <td>{row.score}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center', color: '#999' }}>No data available yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="card" style={{ marginTop: '2rem', background: '#f8fafc', border: '1px dashed #cbd5e1' }}>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Manage Course Content</h3>
                    <p>Course content is now managed via <strong>Sanity Studio</strong>.</p>
                    <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>Run the studio locally to make edits.</p>
                    <code style={{ background: '#e2e8f0', padding: '0.5rem', borderRadius: '4px' }}>npm run start --prefix studio</code>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
