import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { saveQuizResult } from '../services/supabaseClient';
import './CoursePlayer.css';

const CoursePlayer = ({ courseData, onComplete, onExit, user }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [showNotes, setShowNotes] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [progress, setProgress] = useState(0);

    const currentSlide = courseData[currentSlideIndex];
    const isScenario = currentSlide.type === 'scenario';

    useEffect(() => {
        // Reset state when slide changes
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
            <div className="course-header">
                <div className="course-progress">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="header-controls">
                    <button className="btn btn-sm btn-outline" onClick={onExit}>Exit Course</button>
                    <span className="slide-counter">Slide {currentSlideIndex + 1} / {courseData.length}</span>
                </div>
            </div>

            <div className="course-content-wrapper">
                {/* Main Slide Content */}
                <div className={`slide-viewer ${showNotes ? 'with-notes' : 'full-width'}`}>
                    <div className="slide-card">
                        <h1 className="slide-title">{currentSlide.title}</h1>

                        <div className="slide-body">
                            <ReactMarkdown>{currentSlide.content}</ReactMarkdown>
                        </div>

                        {isScenario && (
                            <div className="interaction-area">
                                <h3 className="question-text">{currentSlide.question}</h3>
                                <div className="options-grid">
                                    {currentSlide.options.map((option) => (
                                        <div
                                            key={option.id}
                                            className={`course-option ${selectedOption?.id === option.id ? 'selected' : ''} ${showFeedback && option.id === selectedOption.id ? (option.isCorrect ? 'correct' : 'incorrect') : ''}`}
                                            onClick={() => handleOptionSelect(option)}
                                        >
                                            {option.text}
                                        </div>
                                    ))}
                                </div>

                                {showFeedback && (
                                    <div className={`feedback-box ${selectedOption.isCorrect ? 'success' : 'error'}`}>
                                        <strong>{selectedOption.isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {selectedOption.feedback}
                                    </div>
                                )}

                                <div className="action-row">
                                    {!showFeedback ? (
                                        <button className="btn btn-primary" disabled={!selectedOption} onClick={handleSubmitAnswer}>Submit Answer</button>
                                    ) : (
                                        <button className="btn btn-primary" onClick={handleNext}>Next Slide &rarr;</button>
                                    )}
                                </div>
                            </div>
                        )}

                        {!isScenario && (
                            <div className="navigation-footer">
                                <button className="btn btn-outline" disabled={currentSlideIndex === 0} onClick={handlePrev}>&larr; Previous</button>
                                <button className="btn btn-primary" onClick={handleNext}>{currentSlideIndex === courseData.length - 1 ? 'Finish Course' : 'Next Slide \u2192'}</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Presenter Notes Sidebar */}
                {showNotes && (
                    <div className="notes-sidebar">
                        <div className="notes-header">
                            <h4>Presenter Notes</h4>
                            <button className="btn-close-notes" onClick={() => setShowNotes(false)}>&times;</button>
                        </div>
                        <div className="notes-content">
                            <p>{currentSlide.speakerNotes || "No notes for this slide."}</p>
                        </div>
                    </div>
                )}
            </div>

            {!showNotes && (
                <button className="btn-show-notes" onClick={() => setShowNotes(true)}>Show Notes</button>
            )}
        </div>
    );
};

export default CoursePlayer;
