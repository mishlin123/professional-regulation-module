import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onLogin({ name });
        }
    };

    return (
        <div className="login-container fade-in">
            <div className="card login-card">
                <div className="login-header text-center">
                    <div className="login-logo">PR</div>
                    <h1>Professional Regulation</h1>
                    <p className="text-muted">Teacher Training Module</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="name">Enter your name to begin</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="e.g. John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Enter Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
