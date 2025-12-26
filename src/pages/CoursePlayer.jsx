
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { saveQuizResult } from '../services/supabaseClient';
import './CoursePlayer.css';

import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import PresenterBadge from '../components/course/PresenterBadge';
import DiscussionPrompt from '../components/course/DiscussionPrompt';
import CaseStudyCard from '../components/course/CaseStudyCard';
import EvaluationForm from '../components/course/EvaluationForm';
import Certificate from '../components/course/Certificate';

const CoursePlayer = ({ courseData, onComplete, onExit, user }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [progress, setProgress] = useState(0);

    const currentSlide = courseData[currentSlideIndex];
    const isScenario = currentSlide.type === 'scenario';
    const isEvaluation = currentSlide.type === 'evaluation';
    const isCertificate = currentSlide.type === 'certificate';
    const isBreak = currentSlide.type === 'break';

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

    const handleEvaluationComplete = () => {
        handleNext();
    };

    // Special slide type: Evaluation
    if (isEvaluation) {
        return (
            <div className="course-player">
                <header className="course-header">
                    <div className="header-left">
                        <button className="btn-icon" onClick={onExit} aria-label="Exit Course">✕</button>
                        <span className="course-title-small">Professional Boundaries for Teachers</span>
                    </div>
                    <div className="course-progress-container">
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className="slide-counter">{currentSlideIndex + 1} / {courseData.length}</span>
                </header>

                <div className="course-layout single-column">
                    <main className="course-main">
                        <div className="slide-content fade-in">
                            <h1 className="slide-heading">{currentSlide.title}</h1>
                            <ReactMarkdown className="markdown-body">{currentSlide.content || ''}</ReactMarkdown>
                            <EvaluationForm onComplete={handleEvaluationComplete} />
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    // Special slide type: Certificate
    if (isCertificate) {
        return (
            <div className="course-player">
                <header className="course-header">
                    <div className="header-left">
                        <span className="course-title-small">Professional Boundaries for Teachers</span>
                    </div>
                    <div className="course-progress-container">
                        <div className="progress-bar" style={{ width: '100%' }}></div>
                    </div>
                    <span className="slide-counter">Complete</span>
                </header>

                <div className="course-layout single-column">
                    <main className="course-main">
                        <div className="slide-content fade-in">
                            <Certificate userName={user?.name} onContinue={onComplete} />
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="course-player">
            {/* Top Bar */}
            <header className="course-header">
                <div className="header-left">
                    <button className="btn-icon" onClick={onExit} aria-label="Exit Course">✕</button>
                    <span className="course-title-small">Professional Boundaries for Teachers</span>
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
                        {/* Presenter Badge */}
                        {currentSlide.presenter && (
                            <PresenterBadge presenter={currentSlide.presenter} />
                        )}

                        {/* Header */}
                        <h1 className="slide-heading">{currentSlide.title}</h1>
                        {currentSlide.subtitle && (
                            <h2 className="slide-subheading">{currentSlide.subtitle}</h2>
                        )}

                        {/* Content Body */}
                        <div className="slide-body">
                            {/* Case Study Card */}
                            {currentSlide.caseStudy && (
                                <CaseStudyCard caseStudy={currentSlide.caseStudy} />
                            )}

                            <div className="text-content">
                                <ReactMarkdown className="markdown-body">{currentSlide.content || ''}</ReactMarkdown>
                            </div>

                            {/* Discussion Prompt */}
                            {currentSlide.isDiscussion && currentSlide.discussionQuestion && (
                                <DiscussionPrompt question={currentSlide.discussionQuestion} />
                            )}

                            {/* Media Area */}
                            {currentSlide.media && (
                                <div className="media-area">
                                    <MediaPlaceholder type={currentSlide.media.type} label={currentSlide.media.placeholder} />
                                </div>
                            )}

                            {/* Break Slide Special Layout */}
                            {isBreak && (
                                <div className="break-notice">
                                    <div className="break-icon">☕</div>
                                    <p className="break-text">Take a moment to reflect and refresh</p>
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
                                <button className="btn btn-primary" onClick={handleNext}>{currentSlideIndex === courseData.length - 1 ? 'Finish Course' : 'Next &rarr;'}</button>
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
                            {currentSlide.presenter && (
                                <div className="instructor-badge">
                                    <div className="avatar-placeholder">
                                        {currentSlide.presenter === 'Rachel' ? 'RK' : 'BT'}
                                    </div>
                                    <span>{currentSlide.presenter === 'Rachel' ? 'Rachel Kent' : 'Bindy Tatham'}</span>
                                </div>
                            )}
                            {!currentSlide.presenter && (
                                <div className="instructor-badge">
                                    <div className="avatar-placeholder">PI</div>
                                    <span>Professional Insight</span>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CoursePlayer;
