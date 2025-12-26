import React from 'react';
import './DiscussionPrompt.css';

const DiscussionPrompt = ({ question }) => {
    if (!question) return null;

    return (
        <div className="discussion-prompt">
            <div className="discussion-icon">💭</div>
            <div className="discussion-content">
                <div className="discussion-label">Discussion / Reflection</div>
                <p className="discussion-question">{question}</p>
            </div>
        </div>
    );
};

export default DiscussionPrompt;
