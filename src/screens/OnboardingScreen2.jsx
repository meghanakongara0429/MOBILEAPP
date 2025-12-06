import React from 'react'
import './ScreenStyles.css'

const OnboardingScreen2 = ({ onNext }) => {
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
        <h1 className="headline">Your identity is always safe</h1>
        <p className="subtitle">Your info is safe Say anything you want</p>

        <div className="pagination">
          <span className="dot"></span>
          <span className="dot active"></span>
          <span className="dot"></span>
        </div>

        <button className="purple-button" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  )
}

export default OnboardingScreen2

