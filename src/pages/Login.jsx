
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import './Login.css';

const Login = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        try {
            const userData = { name: name.trim() };
            // Optional: Save user to DB if we had a users table
            onLogin(userData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card fade-in">
                <div className="logo-area">
                    <h1>Professional Insight</h1>
                    <p>Digital Training Portal</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Enter your Full Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. John Doe"
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? 'Accessing...' : 'Enter Dashboard'}
                    </button>
                </form>
                <div className="login-footer">
                    <p>Secure Login • 2025 Edition</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
