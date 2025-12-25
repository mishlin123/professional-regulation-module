import React from 'react';
import { scenarios } from '../scenarios/data';
import './Dashboard.css';

const Dashboard = ({ onSelectScenario }) => {
    return (
        <div className="dashboard fade-in">
            <div className="dashboard-header mb-4">
                <h2>Available Training Modules</h2>
                <p className="text-muted">Select a scenario to begin your professional boundaries training.</p>
            </div>

            <div className="scenarios-grid">
                <div className="card scenario-preview-card">
                    <div className="card-header">
                        <span className="badge badge-advanced">Full Course</span>
                        <h3 className="card-title">Professional Boundaries</h3>
                    </div>
                    <div className="card-body">
                        <p className="scenario-desc">The complete 2025 Professional Boundaries training course. Includes all scenarios and assessment.</p>
                    </div>
                    <div className="card-footer">
                        <button
                            className="btn btn-primary w-full"
                            onClick={() => onSelectScenario('full_course')}
                        >
                            Start Complete Course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
