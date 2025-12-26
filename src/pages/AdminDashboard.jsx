
// Add to dependencies
import React, { useState, useEffect } from 'react';
import { fetchAnalytics, fetchCourse, saveCourse } from '../services/supabaseClient';
import { fullCourse as defaultCourse } from '../data/fullCourse';
import './AdminDashboard.css';

const AdminDashboard = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' or 'editor'
    const [analyticsData, setAnalyticsData] = useState([]);
    const [editorContent, setEditorContent] = useState('');
    const [saving, setSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');

    useEffect(() => {
        // Load data based on tab
        if (activeTab === 'analytics') {
            fetchAnalytics().then(setAnalyticsData);
        } else if (activeTab === 'editor') {
            loadCourseContent();
        }
    }, [activeTab]);

    const loadCourseContent = async () => {
        setStatusMsg('Loading...');
        const data = await fetchCourse('full_course');
        if (data) {
            setEditorContent(JSON.stringify(data, null, 4));
        } else {
            // Fallback to local default if nothing in DB
            setEditorContent(JSON.stringify(defaultCourse, null, 4));
        }
        setStatusMsg('');
    };

    const handleSaveCourse = async () => {
        try {
            setSaving(true);
            const parsed = JSON.parse(editorContent);
            const success = await saveCourse('full_course', parsed);
            if (success) {
                setStatusMsg('Course saved successfully! Changes are live.');
            } else {
                setStatusMsg('Error saving course to Supabase.');
            }
        } catch (err) {
            setStatusMsg('Invalid JSON. Please check your syntax.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="admin-dashboard fade-in">
            <div className="admin-header">
                <h2>Admin Dashboard</h2>
                <button className="btn btn-outline" onClick={onBack}>Back to App</button>
            </div>

            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('analytics')}
                >
                    Analytics
                </button>
                <button
                    className={`tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
                    onClick={() => setActiveTab('editor')}
                >
                    Course Editor
                </button>
            </div>

            {activeTab === 'analytics' ? (
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
            ) : (
                <div className="card editor-card">
                    <div className="editor-header">
                        <h3>JSON Course Editor</h3>
                        <div className="editor-actions">
                            <span className={`status-msg ${statusMsg.includes('Error') || statusMsg.includes('Invalid') ? 'error' : 'success'}`}>{statusMsg}</span>
                            <button
                                className="btn btn-primary"
                                onClick={handleSaveCourse}
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Changes to Live'}
                            </button>
                        </div>
                    </div>
                    <p className="editor-hint">Edit the JSON below to update the course content immediately.</p>
                    <textarea
                        className="json-editor"
                        value={editorContent}
                        onChange={(e) => setEditorContent(e.target.value)}
                        spellCheck="false"
                    />
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
