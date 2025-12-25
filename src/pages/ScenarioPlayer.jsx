import React, { useState } from 'react';
import { scenarios } from '../scenarios/data';
import Layout from '../components/layout/Layout';
import './ScenarioPlayer.css';

const ScenarioPlayer = ({ scenarioId, onComplete, onBack }) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    if (!scenario) return <div>Scenario not found</div>;

    const handleOptionClick = (option) => {
        if (showFeedback) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (selectedOption) {
            setShowFeedback(true);
        }
    };

    const handleContinue = () => {
        onComplete();
    };

    return (
        <div className="scenario-player fade-in">
            <button className="btn btn-outline mb-4" onClick={onBack}>
                &larr; Back to Dashboard
            </button>

            <div className="card scenario-card">
                <div className="scenario-header">
                    <span className={`badge badge-${scenario.difficulty.toLowerCase()}`}>{scenario.difficulty}</span>
                    <h1 className="scenario-title">{scenario.title}</h1>
                </div>

                <div className="scenario-context">
                    <h3>The Situation</h3>
                    <p>{scenario.context}</p>
                </div>

                <div className="scenario-options">
                    <h3>What would you do?</h3>
                    <div className="options-list">
                        {scenario.options.map((option) => (
                            <div
                                key={option.id}
                                className={`option-item ${selectedOption?.id === option.id ? 'selected' : ''} ${showFeedback && option.id === selectedOption.id ? (option.isCorrect ? 'correct' : 'incorrect') : ''}`}
                                onClick={() => handleOptionClick(option)}
                            >
                                <div className="option-text">{option.text}</div>
                                {showFeedback && selectedOption?.id === option.id && (
                                    <div className="feedback-text">
                                        <strong>Feedback:</strong> {option.feedback}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="scenario-footer">
                    {!showFeedback ? (
                        <button
                            className="btn btn-primary"
                            disabled={!selectedOption}
                            onClick={handleSubmit}
                        >
                            Submit Decision
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={handleContinue}
                        >
                            Return to Dashboard
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScenarioPlayer;
