import React, { useState } from 'react';
import './EvaluationForm.css';

const EvaluationForm = ({ onComplete }) => {
    const [ratings, setRatings] = useState({
        clarity: 0,
        relevance: 0,
        practical: 0,
        overall: 0
    });
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleRating = (category, value) => {
        setRatings(prev => ({ ...prev, [category]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send to a backend
        console.log('Evaluation submitted:', { ratings, feedback });
        setSubmitted(true);
        setTimeout(() => {
            onComplete();
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="evaluation-submitted">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your feedback has been recorded.</p>
            </div>
        );
    }

    const renderStars = (category) => {
        return [1, 2, 3, 4, 5].map(value => (
            <button
                key={value}
                type="button"
                className={`star-button ${ratings[category] >= value ? 'active' : ''}`}
                onClick={() => handleRating(category, value)}
                aria-label={`Rate ${value} stars`}
            >
                ★
            </button>
        ));
    };

    return (
        <div className="evaluation-form-container">
            <form onSubmit={handleSubmit} className="evaluation-form">
                <div className="evaluation-question">
                    <label>How clear and understandable was the course content?</label>
                    <div className="star-rating">{renderStars('clarity')}</div>
                </div>

                <div className="evaluation-question">
                    <label>How relevant was this course to your professional practice?</label>
                    <div className="star-rating">{renderStars('relevance')}</div>
                </div>

                <div className="evaluation-question">
                    <label>How practical were the scenarios and case studies?</label>
                    <div className="star-rating">{renderStars('practical')}</div>
                </div>

                <div className="evaluation-question">
                    <label>Overall, how would you rate this course?</label>
                    <div className="star-rating">{renderStars('overall')}</div>
                </div>

                <div className="evaluation-question">
                    <label htmlFor="feedback">Additional comments or suggestions:</label>
                    <textarea
                        id="feedback"
                        rows="4"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Your feedback helps us improve this training..."
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={!ratings.overall}
                >
                    Submit Evaluation
                </button>
            </form>
        </div>
    );
};

export default EvaluationForm;
