// Add to dependencies
import React, { useState, useEffect } from 'react';
import { fetchAnalytics } from '../services/supabaseClient';
import './AdminDashboard.css';

const AdminDashboard = ({ onBack }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Load data
        fetchAnalytics().then(setData);
    }, []);

    return (
        <div className="admin-dashboard fade-in">
            <div className="admin-header">
                <h2>Course Analytics</h2>
                <button className="btn btn-outline" onClick={onBack}>Back to App</button>
            </div>

            <div className="card">
                <table className="analytics-table">
                    <thead>
                        <tr>
                            <th>Teacher Name</th>
                            <th>Status</th>
                            <th>Quiz Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.name}</td>
                                <td>{row.completed ? <span className="tag success">Completed</span> : <span className="tag pending">In Progress</span>}</td>
                                <td>{row.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
