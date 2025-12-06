import React, { useState } from 'react'
import './ScreenStyles.css'

const ProfileGenderScreen = ({ onNext, nickname }) => {
  const [selectedGender, setSelectedGender] = useState('')

  return (
    <div className="screen">

      <div className="content-area" style={{ minHeight: '30vh' }}>
      </div>

      <div className="purple-section">
        <h1 className="greeting">Hi {nickname || 'LEMON'}!</h1>
        <p className="question">Select your gender identity</p>

        <div className="gender-options">
          <button
            className={`gender-option ${selectedGender === 'male' ? 'selected' : ''}`}
            onClick={() => setSelectedGender('male')}
          >
            <div className="gender-icon">♂</div>
            <span>Male</span>
          </button>

          <button
            className={`gender-option ${selectedGender === 'female' ? 'selected' : ''}`}
            onClick={() => setSelectedGender('female')}
          >
            <div className="gender-icon">♀</div>
            <span>Female</span>
          </button>
        </div>

        <button
          className="purple-button"
          onClick={onNext}
          disabled={!selectedGender}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProfileGenderScreen

