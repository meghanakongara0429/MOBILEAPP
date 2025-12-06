import React from 'react'
import './ScreenStyles.css'

const OnboardingScreen3 = ({ onNext }) => {
  return (
    <div className="screen">
      <div className="status-bar">
        <span className="time">9:37</span>
        <div className="status-icons">
          <span className="signal">📶</span>
          <span className="wifi">📶</span>
          <span className="battery">🔋</span>
        </div>
      </div>

      <div className="content-area" style={{ minHeight: '30vh' }}>
      </div>

      <div className="purple-section">
        <h1 className="headline">Every call is safe and protected</h1>
        <p className="subtitle">Our community is supportive. We work to keep every user safe and sound</p>

        <div className="pagination">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot active"></span>
        </div>

        <button className="purple-button" onClick={onNext}>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default OnboardingScreen3

