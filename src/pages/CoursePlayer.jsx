
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { saveQuizResult } from '../services/supabaseClient';
import './CoursePlayer.css';

import MediaPlaceholder from '../components/ui/MediaPlaceholder';

const CoursePlayer = ({ courseData, onComplete, onExit, user }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
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
            {/* Top Bar */}
            <header className="course-header">
                <div className="header-left">
                    <button className="btn-icon" onClick={onExit} aria-label="Exit Course">✕</button>
                    <span className="course-title-small">Professional Boundaries Module</span>
                </div>
                <div className="course-progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <span className="slide-counter">{currentSlideIndex + 1} / {courseData.length}</span>
            </header>

            <div className="course-layout">
                {/* Main Content Area */}
                <main className="course-main">
                    <div className="slide-content fade-in">
                        {/* Header */}
                        <h1 className="slide-heading">{currentSlide.title}</h1>

                        {/* Content Body */}
                        <div className="slide-body">
                            <div className="text-content">
                                <ReactMarkdown className="markdown-body">{currentSlide.content || ''}</ReactMarkdown>
                            </div>

                            {/* Media Area */}
                            {currentSlide.media && (
                                <div className="media-area">
                                    <MediaPlaceholder type={currentSlide.media.type} label={currentSlide.media.placeholder} />
                                </div>
                            )}

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
                        </div>

                        {/* Footer Controls for Non-Scenario Slides */}
                        {!isScenario && (
                            <div className="slide-footer">
                                <button className="btn btn-outline" disabled={currentSlideIndex === 0} onClick={handlePrev}>&larr; Back</button>
                                <div className="spacer"></div>
                                <button className="btn btn-primary" onClick={handleNext}>{currentSlideIndex === courseData.length - 1 ? 'Finish Course' : 'Next'}</button>
                            </div>
                        )}
                    </div>
                </main>

                {/* Sidebar / Info Panel */}
                <aside className="course-sidebar">
                    <div className="sidebar-content">
                        <div className="sidebar-header">
                            <h3>Deep Dive</h3>
                        </div>
                        <div className="sidebar-body">
                            {currentSlide.explanation ? (
                                <div className="explanation-text">
                                    <p>{currentSlide.explanation}</p>
                                </div>
                            ) : (
                                <p className="empty-state">No additional notes for this section.</p>
                            )}
                        </div>
                        <div className="sidebar-footer">
                            <div className="instructor-badge">
                                <div className="avatar-placeholder">TE</div>
                                <span>Teaching Council Guidelines</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CoursePlayer;
