import React from 'react';
import './PresenterBadge.css';

const PresenterBadge = ({ presenter }) => {
    if (!presenter) return null;

    const getPresenterInfo = (name) => {
        const presenters = {
            Rachel: {
                fullName: 'Rachel Kent',
                initials: 'RK',
                color: '#4F46E5' // Indigo
            },
            Bindy: {
                fullName: 'Bindy Tatham',
                initials: 'BT',
                color: '#7C3AED' // Purple
            }
        };
        return presenters[name];
    };

    const info = getPresenterInfo(presenter);
    if (!info) return null;

    return (
        <div className="presenter-badge" style={{ borderColor: info.color }}>
            <div className="presenter-avatar" style={{ backgroundColor: info.color }}>
                {info.initials}
            </div>
            <span className="presenter-name">{info.fullName}</span>
        </div>
    );
};

export default PresenterBadge;
