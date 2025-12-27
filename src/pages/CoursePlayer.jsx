import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { saveQuizResult } from '../services/supabaseClient';
import './CoursePlayer.css';
import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import CourseHeader from '../components/layout/CourseHeader';
import PresenterBadge from '../components/course/PresenterBadge';
import DiscussionPrompt from '../components/course/DiscussionPrompt';
import CaseStudyCard from '../components/course/CaseStudyCard';
import EvaluationForm from '../components/course/EvaluationForm';
import Certificate from '../components/course/Certificate';
import InsightBox from '../components/course/InsightBox';

/**
 * CoursePlayer Component
 * Clean, single-screen layout with integrated content and simplified scrolling.
 * Features:
 * - Single main scrollable area (no nested scrollbars)
 * - Persistent header and footer
 * - Support for multiple slide types (regular, scenario, evaluation, certificate, break)
 * - Mobile responsive
 */
const CoursePlayer = ({ courseData, onComplete, onExit, user }) => {
    // ============================================
    // STATE MANAGEMENT
    // ============================================
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [progress, setProgress] = useState(0);

    // ============================================
    // VALIDATION & CURRENT SLIDE SETUP
    // ============================================
    if (!Array.isArray(courseData) || courseData.length === 0) {
        return <div className="course-player-loading">Loading course...</div>;
    }

    const currentSlide = courseData[currentSlideIndex];
    const totalSlides = courseData.length;

    // ============================================
    // SLIDE TYPE DETECTION (COMPUTED ONCE)
    // ============================================
    const isScenario = currentSlide.type === 'scenario';
    const isEvaluation = currentSlide.type === 'evaluation';
    const isCertificate = currentSlide.type === 'certificate';
    const isBreak = currentSlide.type === 'break';

    // ============================================
    // EFFECTS
    // ============================================
    useEffect(() => {
        // Reset state on slide change
        setSelectedOption(null);
        setShowFeedback(false);

        // Update progress
        setProgress(((currentSlideIndex + 1) / totalSlides) * 100);

        // Scroll main content area to top
        const container = document.querySelector('.course-main-scroll-area');
        if (container) {
            container.scrollTo(0, 0);
        }
    }, [currentSlideIndex, totalSlides]);

    // ============================================
    // EVENT HANDLERS
    // ============================================
    const handleNext = () => {
        if (currentSlideIndex < totalSlides - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);
        } else if (onComplete) {
            onComplete();
        }
    };

    const handlePrev = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    };

    const handleOptionSelect = (option) => {
        if (showFeedback) return; // Prevent changing selection after feedback
        setSelectedOption(option);
    };

    const handleSubmitAnswer = () => {
        if (selectedOption) {
            setShowFeedback(true);
            saveQuizResult(
                user?.name || 'Anonymous',
                'full_course',
                currentSlide.id,
                selectedOption.isCorrect
            );
        }
    };

    const handleEvaluationComplete = () => {
        handleNext();
    };

    // ============================================
    // SPECIAL CASE: EVALUATION SLIDE
    // ============================================
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
                    <span className="slide-counter">{currentSlideIndex + 1} / {totalSlides}</span>
                </header>
                <div className="course-layout single-column">
                    <main className="course-main">
                        <div className="slide-content fade-in">
                            <h1 className="slide-heading">{currentSlide.title}</h1>
                            <div className="markdown-body">
                                <ReactMarkdown>{currentSlide.content || ''}</ReactMarkdown>
                            </div>
                            <EvaluationForm onComplete={handleEvaluationComplete} />
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    // ============================================
    // SPECIAL CASE: CERTIFICATE SLIDE
    // ============================================
    if (isCertificate) {
        return (
            <div className="course-player">
                <header className="course-header">
                    <div className="header-left">
                        <button className="btn-icon" onClick={onExit} aria-label="Exit Course">✕</button>
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

    // ============================================
    // MAIN LAYOUT: STANDARD, SCENARIO, BREAK
    // ============================================
    return (
        <div className="course-player">
            {/* Top Header Bar */}
            <header className="course-header">
                <div className="header-left">
                    <button className="btn-icon" onClick={onExit} aria-label="Exit Course">✕</button>
                    <span className="course-title-small">Professional Boundaries for Teachers</span>
                </div>
                <div className="course-progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="spacer"></div>
                <span className="slide-counter">{currentSlideIndex + 1} / {totalSlides}</span>
            </header>

            {/* Main Viewport */}
            <div className="course-viewport">
                {/* Scrollable Content Area */}
                <div className="course-main-scroll-area">
                    <div className="slide-container">
                        <section className="slide-content-area fade-in">
                            {/* Presenter Badge */}
                            {currentSlide.presenter && (
                                <PresenterBadge presenter={currentSlide.presenter} />
                            )}

                            {/* Main Content */}
                            <article className="slide-body">
                                <h1 className="slide-heading">{currentSlide.title}</h1>

                                {currentSlide.subtitle && (
                                    <h2 className="slide-subheading">{currentSlide.subtitle}</h2>
                                )}

                                {/* Case Study Card */}
                                {currentSlide.caseStudy && (
                                    <CaseStudyCard caseStudy={currentSlide.caseStudy} />
                                )}

                                {/* Main Text Content */}
                                <div className="text-content markdown-body">
                                    <ReactMarkdown>{currentSlide.content || ''}</ReactMarkdown>
                                </div>

                                {/* Discussion Prompt */}
                                {currentSlide.isDiscussion && currentSlide.discussionQuestion && (
                                    <DiscussionPrompt question={currentSlide.discussionQuestion} />
                                )}

                                {/* Media Area */}
                                {currentSlide.media && (
                                    <div className="media-area">
                                        <MediaPlaceholder
                                            type={currentSlide.media.type}
                                            label={currentSlide.media.placeholder}
                                        />
                                    </div>
                                )}

                                {/* Break Slide Special Layout */}
                                {isBreak && (
                                    <div className="break-notice">
                                        <div className="break-icon">☕</div>
                                        <p className="break-text">
                                            {currentSlide.content?.replace(/#.*/g, '').trim() || 'Take a moment to reflect and refresh'}
                                        </p>
                                    </div>
                                )}

                                {/* Scenario Interaction Panel */}
                                {isScenario && (
                                    <div className="scenario-interaction-panel">
                                        <h3 className="question-heading">{currentSlide.question}</h3>
                                        <div className="options-stack">
                                            {currentSlide.options?.map((option, idx) => {
                                                const isSelected = selectedOption?.id === option.id;
                                                const isCorrect = showFeedback && option.isCorrect;
                                                const isIncorrect = showFeedback && isSelected && !option.isCorrect;

                                                return (
                                                    <button
                                                        key={option.id || idx}
                                                        className={`option-btn ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isIncorrect ? 'incorrect' : ''}`}
                                                        onClick={() => handleOptionSelect(option)}
                                                        disabled={showFeedback}
                                                    >
                                                        <span className="option-letter">{String.fromCharCode(65 + idx)}.</span>
                                                        <span className="option-text">{option.text}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Feedback Message */}
                                        {showFeedback && (
                                            <div className={`feedback-message ${selectedOption?.isCorrect ? 'success' : 'error'} fade-in`}>
                                                <div className={`status ${selectedOption?.isCorrect ? 'status--success' : 'status--error'}`}>
                                                    {selectedOption?.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                                                </div>
                                                <p className="mt-8">{selectedOption?.feedback}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Insight Box / Explanation */}
                                {currentSlide.explanation && (
                                    <InsightBox
                                        insight={currentSlide.explanation}
                                        presenter={currentSlide.presenter}
                                    />
                                )}
                            </article>
                        </section>
                    </div>
                </div>

                {/* Persistent Footer Bar */}
                {!isEvaluation && !isCertificate && (
                    <footer className="course-footer-bar">
                        <div className="footer-content">
                            <button
                                className="btn btn--outline"
                                disabled={currentSlideIndex === 0}
                                onClick={handlePrev}
                            >
                                ← Back
                            </button>
                            <div className="spacer"></div>

                            {isScenario && !showFeedback ? (
                                <button
                                    className="btn btn--primary"
                                    disabled={!selectedOption}
                                    onClick={handleSubmitAnswer}
                                >
                                    Submit Answer
                                </button>
                            ) : (
                                <button
                                    className="btn btn--primary"
                                    onClick={handleNext}
                                >
                                    {currentSlideIndex === totalSlides - 1 ? 'Finish Course' : 'Next →'}
                                </button>
                            )}
                        </div>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default CoursePlayer;