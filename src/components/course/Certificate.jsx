import React from 'react';
import './Certificate.css';

const Certificate = ({ userName, onContinue }) => {
    const currentDate = new Date().toLocaleDateString('en-NZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="certificate-container">
            <div className="certificate" id="certificate-content">
                <div className="certificate-border">
                    <div className="certificate-content">
                        <div className="certificate-header">
                            <h1>Certificate of Attendance</h1>
                            <div className="certificate-subtitle">Professional Development</div>
                        </div>

                        <div className="certificate-body">
                            <p className="certificate-awarded-to">This is to certify that</p>
                            <h2 className="certificate-name">{userName || 'Participant'}</h2>
                            <p className="certificate-has-completed">has successfully completed</p>
                            <h3 className="certificate-course-title">Professional Boundaries for Teachers</h3>
                            <p className="certificate-subtitle-text">The Dos, the Don'ts and the In-Betweens</p>
                        </div>

                        <div className="certificate-footer">
                            <div className="certificate-date">
                                Date: {currentDate}
                            </div>
                            <div className="certificate-presenters">
                                <div className="presenter-signature">
                                    <div className="signature-line">Rachel Kent</div>
                                    <div className="signature-title">Facilitator</div>
                                </div>
                                <div className="presenter-signature">
                                    <div className="signature-line">Bindy Tatham</div>
                                    <div className="signature-title">Facilitator</div>
                                </div>
                            </div>
                            <div className="certificate-org">
                                <strong>Professional Insight</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="certificate-actions no-print">
                <button className="btn btn-outline" onClick={handlePrint}>
                    🖨️ Print Certificate
                </button>
                <button className="btn btn-primary" onClick={onContinue}>
                    Continue →
                </button>
            </div>
        </div>
    );
};

export default Certificate;
