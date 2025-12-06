import React from 'react'
import './ScreenStyles.css'
import { useState } from 'react';


const OnboardingScreen1 = ({ onNext }) => {
    const [active, setActive] = useState(null);
    return (
        <div
            className="screen">
            <div className="status-bar">
                <span className="time">9:37</span>
                <div className="status-icons">
                    <span className="signal">📶</span>
                    <span className="wifi">📶</span>
                    <span className="battery">🔋</span>
                </div>
            </div>

            <div
                className="content-area"
            >
            </div>
            <div
                className={`purple-section ${active === "bottom" ? "highlighted" : ""}`}
                onClick={() => setActive("bottom")}
            >

                <h3 className="headline">Talk to someone who cares about you</h3>
                <p className="subtitle">Talk to people who understand you and </p>
                <p className='subtitle'>don't judge</p>
                <div className="pagination">
                    <span className="dot active"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>

                <button className="purple-button" onClick={onNext}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default OnboardingScreen1

