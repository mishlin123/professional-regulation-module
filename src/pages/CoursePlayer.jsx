
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { saveQuizResult } from '../services/supabaseClient';
import './CoursePlayer.css';

import MediaPlaceholder from '../components/ui/MediaPlaceholder';

const CoursePlayer = ({ courseData, onComplete, onExit, user }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    // Removed showNotes state as we are integrating it
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [progress, setProgress] = useState(0);

    const currentSlide = courseData[currentSlideIndex];
    const isScenario = currentSlide.type === 'scenario';

    useEffect(() => {
        setSelectedOption(null);
        setShowFeedback(false);
        setProgress(((currentSlideIndex + 1) / courseData.length) * 100);
    }, [currentSlideIndex, courseData.length]);

    const handleNext = () => {
        if (currentSlideIndex < courseData.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);
        } else {
            onComplete();
        }
    };

    const handlePrev = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    };

    const handleOptionSelect = (option) => {
        if (showFeedback) return;
        setSelectedOption(option);
    };

    const handleSubmitAnswer = () => {
        if (selectedOption) {
            setShowFeedback(true);
            saveQuizResult(user?.name || 'Anonymous', 'full_course', currentSlide.id, selectedOption.isCorrect);
        }
    };

    return (
        <div className="course-player">
            {/* Top Bar - Simplified */}
            <div className="course-header">
                <div className="header-left">
                    <button className="btn-icon" onClick={onExit}>✕</button>
                    <span className="course-title-small">Professional Boundaries</span>
                </div>
                <div className="course-progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="slide-counter">{currentSlideIndex + 1} / {courseData.length}</span>
            </div>

            <div className="course-stage">

                {/* Main Presentation Area */}
                <div className="slide-container">
                    <div className="slide-content card fade-in">

                        {/* Header */}
                        <h1 className="slide-heading">{currentSlide.title}</h1>

                        {/* Content Layout */}
                        <div className="slide-body-grid">
                            <div className="text-content">
                                <ReactMarkdown className="markdown-body">{currentSlide.content}</ReactMarkdown>
                            </div>

                            {/* Media Area */}
                            {currentSlide.media && (
                                <div className="media-area">
                                    <MediaPlaceholder type={currentSlide.media.type} label={currentSlide.media.placeholder} />
                                </div>
                            )}
                        </div>

                        {/* Scenario Interaction */}
                        {isScenario && (
                            <div className="scenario-interaction-panel">
                                <h3 className="question-heading">{currentSlide.question}</h3>
                                <div className="options-stack">
                                    {currentSlide.options.map((option) => (
                                        <button
                                            key={option.id}
                                            className={`option-btn ${selectedOption?.id === option.id ? 'selected' : ''} ${showFeedback && option.id === selectedOption.id ? (option.isCorrect ? 'correct' : 'incorrect') : ''}`}
                                            onClick={() => handleOptionSelect(option)}
                                        >
                                            <span className="option-marker">{selectedOption?.id === option.id ? (showFeedback ? (option.isCorrect ? '✓' : '✗') : '●') : '○'}</span>
                                            {option.text}
                                        </button>
                                    ))}
                                </div>

                                {showFeedback && (
                                    <div className={`feedback-message ${selectedOption.isCorrect ? 'success' : 'error'} fade-in`}>
                                        <p>{selectedOption.feedback}</p>
                                    </div>
                                )}

                                <div className="action-row">
                                    {showFeedback ? (
                                        <button className="btn btn-primary btn-lg" onClick={handleNext}>Continue &rarr;</button>
                                    ) : (
                                        <button className="btn btn-primary btn-lg" disabled={!selectedOption} onClick={handleSubmitAnswer}>Submit Answer</button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Integrated Explanation / Key Insight */}
                        {currentSlide.explanation && (
                            <div className="explanation-box">
                                <div className="explanation-header">💡 Key Insight</div>
                                <p>{currentSlide.explanation}</p>
                            </div>
                        )}

                        {/* Standard Navigation */}
                        {!isScenario && (
                            <div className="slide-footer">
                                <button className="btn btn-outline" disabled={currentSlideIndex === 0} onClick={handlePrev}>&larr; Back</button>
                                <div className="spacer"></div>
                                <button className="btn btn-primary" onClick={handleNext}>{currentSlideIndex === courseData.length - 1 ? 'Finish Course' : 'Next &rarr;'}</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;
