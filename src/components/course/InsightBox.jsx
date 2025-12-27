import React from 'react';
import './InsightBox.css';

/**
 * InsightBox Component
 * Displays professional explanations or 'deep dive' content integrated into the main slide.
 */
const InsightBox = ({ insight, presenter }) => {
    if (!insight) return null;

    return (
        <div className="insight-box fade-in">
            <div className="insight-header">
                <div className="insight-icon">💡</div>
                <span className="insight-label">Professional Insight</span>
            </div>
            <div className="insight-content">
                <p>{insight}</p>
            </div>
            {presenter && (
                <div className="insight-footer">
                    <span className="presenter-note">From {presenter}</span>
                </div>
            )}
        </div>
    );
};

export default InsightBox;
