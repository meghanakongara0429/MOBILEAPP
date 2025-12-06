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

            <svg className="purple-arc" viewBox="0 0 400 200">
                <path
                    d="
      M0 80 
      C100 0 300 0 400 80 
      C300 160 100 160 0 80 
      Z
    "
                    fill="url(#purpleGradient)"
                />
            </svg>
            <div
                className={`purple-section ${active === "bottom" ? "highlighted" : ""}`}
                onClick={() => setActive("bottom")}
            >

                <h1 className="headline">Talk to someone who cares about you</h1>
                <p className="subtitle">Talk to people who understand you and don't judge</p>

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

