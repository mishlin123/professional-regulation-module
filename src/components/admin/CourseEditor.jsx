
import React, { useState, useEffect } from 'react';
import './CourseEditor.css';

const CourseEditor = ({ initialContent, onChange }) => {
    // Parse initial content - ensure it's an array
    const [slides, setSlides] = useState(() => {
        try {
            const parsed = typeof initialContent === 'string' ? JSON.parse(initialContent) : initialContent;
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error("Failed to parse course content", e);
            return [];
        }
    });

    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    // Sync with parent whenever slides change
    useEffect(() => {
        onChange(JSON.stringify(slides, null, 4));
    }, [slides, onChange]);

    const activeSlide = slides[activeSlideIndex] || null;

    // --- Actions ---

    const handleAddSlide = () => {
        const newSlide = {
            id: Date.now(), // simple unique id
            type: 'slide',
            title: 'New Slide',
            content: 'Write your content here...',
            explanation: '',
            media: null
        };
        setSlides([...slides, newSlide]);
        setActiveSlideIndex(slides.length); // Select the new slide
    };

    const handleAddScenario = () => {
        const newScenario = {
            id: Date.now(),
            type: 'scenario',
            title: 'New Scenario',
            content: 'Describe the situation...',
            explanation: '',
            question: 'What do you do?',
            options: [
                { id: 'opt1', text: 'Option 1', feedback: 'Feedback here', isCorrect: false },
                { id: 'opt2', text: 'Option 2', feedback: 'Feedback here', isCorrect: true }
            ]
        };
        setSlides([...slides, newScenario]);
        setActiveSlideIndex(slides.length);
    };

    const handleDelete = (e, index) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this item?')) {
            const newSlides = slides.filter((_, i) => i !== index);
            setSlides(newSlides);
            if (activeSlideIndex >= newSlides.length) {
                setActiveSlideIndex(Math.max(0, newSlides.length - 1));
            }
        }
    };

    const handleMove = (e, index, direction) => {
        e.stopPropagation();
        if (direction === 'up' && index > 0) {
            const newSlides = [...slides];
            [newSlides[index - 1], newSlides[index]] = [newSlides[index], newSlides[index - 1]];
            setSlides(newSlides);
            setActiveSlideIndex(index - 1);
        } else if (direction === 'down' && index < slides.length - 1) {
            const newSlides = [...slides];
            [newSlides[index + 1], newSlides[index]] = [newSlides[index], newSlides[index + 1]];
            setSlides(newSlides);
            setActiveSlideIndex(index + 1);
        }
    };

    const updateSlideField = (field, value) => {
        const newSlides = [...slides];
        newSlides[activeSlideIndex] = { ...newSlides[activeSlideIndex], [field]: value };
        setSlides(newSlides);
    };

    const updateOption = (optIndex, field, value) => {
        const newSlides = [...slides];
        const options = [...newSlides[activeSlideIndex].options];
        options[optIndex] = { ...options[optIndex], [field]: value };
        newSlides[activeSlideIndex].options = options;
        setSlides(newSlides);
    };

    const addOption = () => {
        const newSlides = [...slides];
        const options = [...(newSlides[activeSlideIndex].options || [])];
        options.push({ id: `opt_${Date.now()}`, text: 'New Option', feedback: '', isCorrect: false });
        newSlides[activeSlideIndex].options = options;
        setSlides(newSlides);
    };

    const removeOption = (optIndex) => {
        const newSlides = [...slides];
        const options = newSlides[activeSlideIndex].options.filter((_, i) => i !== optIndex);
        newSlides[activeSlideIndex].options = options;
        setSlides(newSlides);
    };

    if (!activeSlide) return <div className="p-4">No content loaded.</div>;

    return (
        <div className="course-editor-container">
            {/* Sidebar List */}
            <div className="editor-sidebar">
                <div className="sidebar-toolbar">
                    <button className="btn btn-sm btn-outline" onClick={handleAddSlide}>+ Slide</button>
                    <button className="btn btn-sm btn-outline" onClick={handleAddScenario}>+ Scenario</button>
                </div>
                <ul className="slide-list">
                    {slides.map((slide, idx) => (
                        <li
                            key={slide.id || idx}
                            className={`slide-item ${idx === activeSlideIndex ? 'active' : ''}`}
                            onClick={() => setActiveSlideIndex(idx)}
                        >
                            <div className="slide-item-content">
                                <span className="slide-item-title">{idx + 1}. {slide.title}</span>
                                <span className="slide-item-type">{slide.type}</span>
                            </div>
                            <div className="slide-actions">
                                <button className="mini-btn" onClick={(e) => handleMove(e, idx, 'up')} disabled={idx === 0}>↑</button>
                                <button className="mini-btn" onClick={(e) => handleMove(e, idx, 'down')} disabled={idx === slides.length - 1}>↓</button>
                                <button className="mini-btn danger" onClick={(e) => handleDelete(e, idx)}>✕</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Editor Form */}
            <div className="editor-main">
                <div className="editor-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={activeSlide.title || ''}
                            onChange={(e) => updateSlideField('title', e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Content (Markdown Supported)</label>
                        <textarea
                            className="form-control"
                            value={activeSlide.content || ''}
                            onChange={(e) => updateSlideField('content', e.target.value)}
                        />
                        <span className="help-text">Use **bold** for emphasis, * for lists.</span>
                    </div>

                    <div className="form-group">
                        <label>Deep Dive / Explanation</label>
                        <textarea
                            className="form-control"
                            style={{ minHeight: '100px' }}
                            value={activeSlide.explanation || ''}
                            onChange={(e) => updateSlideField('explanation', e.target.value)}
                        />
                    </div>

                    {activeSlide.type === 'slide' && (
                        <div className="form-group">
                            <label>Media Placeholder Label (Optional)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={activeSlide.media?.placeholder || ''}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    updateSlideField('media', val ? { type: 'image', placeholder: val } : null)
                                }}
                                placeholder="e.g. 'Diagram of Regulatory Framework'"
                            />
                        </div>
                    )}

                    {activeSlide.type === 'scenario' && (
                        <>
                            <div className="section-divider"></div>
                            <h3 className="sub-heading">Scenario Configuration</h3>

                            <div className="form-group">
                                <label>Question</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={activeSlide.question || ''}
                                    onChange={(e) => updateSlideField('question', e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Options</label>
                                <div className="options-list">
                                    {(activeSlide.options || []).map((opt, idx) => (
                                        <div key={idx} className="option-editor-item">
                                            <div className="option-header">
                                                <label className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={opt.isCorrect}
                                                        onChange={(e) => updateOption(idx, 'isCorrect', e.target.checked)}
                                                    />
                                                    Is Correct Answer
                                                </label>
                                                <button className="mini-btn danger" onClick={() => removeOption(idx)}>Remove</button>
                                            </div>

                                            <div className="form-group" style={{ marginBottom: '0.5rem' }}>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Option Text"
                                                    value={opt.text}
                                                    onChange={(e) => updateOption(idx, 'text', e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group" style={{ marginBottom: 0 }}>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Feedback when selected"
                                                    value={opt.feedback}
                                                    onChange={(e) => updateOption(idx, 'feedback', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn btn-sm btn-outline" onClick={addOption}>+ Add Option</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseEditor;
