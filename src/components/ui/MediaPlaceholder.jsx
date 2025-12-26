
import React from 'react';
import './MediaPlaceholder.css';

const MediaPlaceholder = ({ type, label }) => {
    return (
        <div className={`media-placeholder media-${type}`}>
            <div className="media-icon">
                {type === 'image' && '📷'}
                {type === 'video' && '▶️'}
                {type === 'icon' && '💡'}
            </div>
            <span className="media-label">{label || 'Media Asset'}</span>
            <span className="media-subtext">Future Asset Placeholder</span>
        </div>
    );
};

export default MediaPlaceholder;
