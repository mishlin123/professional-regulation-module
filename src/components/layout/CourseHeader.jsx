import React from 'react';
import './CourseHeader.css';

/**
 * Clean, Persistent Course Header Component
 * Features:
 * - Fixed/Sticky at the top
 * - No scroll-linked transformations (prevents glitching)
 * - Professional layout
 */
const CourseHeader = ({
    courseTitle = 'Course Title',
    currentSlide = 1,
    totalSlides = 10,
    onExit,
}) => {
    // Calculate progress percentage
    const progressPercent = (currentSlide / totalSlides) * 100;

    return (
        <header className="course-header" role="banner">
            <div className="header-content">
                {/* Left Section - Course Info */}
                <div className="header-left">
                    <div className="course-title-section">
                        <h1 className="course-title">{courseTitle}</h1>
                        <span className="slide-counter">
                            Slide <span className="slide-number">{currentSlide}</span> of{' '}
                            <span className="total-slides">{totalSlides}</span>
                        </span>
                    </div>
                </div>

                {/* Center Section - Progress Bar */}
                <div className="progress-section">
                    <div
                        className="progress-container"
                        role="progressbar"
                        aria-valuenow={progressPercent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <div
                            className="progress-bar"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                </div>

                {/* Right Section - Actions */}
                <div className="header-right">
                    <button
                        className="btn-exit"
                        onClick={onExit}
                        title="Exit course (Esc)"
                        aria-label="Exit course"
                    >
                        <span className="exit-icon">✕</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default CourseHeader;