import React, { useState } from 'react'
import './ScreenStyles.css'

const ProfileAgeScreen = ({ onNext, nickname }) => {
  const [selectedAge, setSelectedAge] = useState('')

  const ageGroups = [
    '18 to 25',
    '26 to 34',
    '35 to 50',
    'Above 50'
  ]

  return (
    <div className="screen">

      <div className="content-area" style={{ minHeight: '30vh' }}>
      </div>

      <div className="purple-section">
        <h1 className="greeting">Hi {nickname || 'LEMON'}!</h1>
        <p className="question">What's your age group?</p>

        <div className="options-container">
          {ageGroups.map((age, index) => (
            <button
              key={index}
              className={`age-option ${selectedAge === age ? 'selected' : ''}`}
              onClick={() => setSelectedAge(age)}
            >
              {age}
            </button>
          ))}
        </div>

        <button
          className="purple-button"
          onClick={onNext}
          disabled={!selectedAge}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProfileAgeScreen

