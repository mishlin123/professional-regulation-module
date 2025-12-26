import React from 'react';
import './CaseStudyCard.css';

const CaseStudyCard = ({ caseStudy }) => {
    if (!caseStudy) return null;

    return (
        <div className="case-study-card">
            <div className="case-study-header">
                <div className="case-study-icon">⚖️</div>
                <div className="case-study-title-group">
                    <div className="case-study-label">Teaching Council Case Study</div>
                    <h3 className="case-name">{caseStudy.caseName}</h3>
                </div>
            </div>
            <div className="case-study-meta">
                {caseStudy.citation && (
                    <div className="case-citation">
                        <strong>Citation:</strong> {caseStudy.citation}
                    </div>
                )}
                {caseStudy.year && (
                    <div className="case-year">
                        <strong>Year:</strong> {caseStudy.year}
                    </div>
                )}
                {caseStudy.tribunal && (
                    <div className="case-tribunal">
                        <strong>Tribunal:</strong> {caseStudy.tribunal}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CaseStudyCard;
