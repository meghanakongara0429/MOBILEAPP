import React, { useState } from 'react'
import './ScreenStyles.css'

const ProfileNicknameScreen = ({ onNext }) => {
  const [nickname, setNickname] = useState('')

  const handleNext = () => {
    if (nickname.trim()) {
      onNext({ nickname: nickname.trim().toUpperCase() })
    }
  }

  return (
    <div className="screen">

      <div className="content-area" style={{ minHeight: '30vh' }}>
      </div>

      <div className="purple-section">
        <h1 className="headline">Complete Your Profile</h1>

        <div className="input-container">
          <label className="input-label">Nick Name *</label>
          <input
            type="text"
            className="text-input"
            placeholder="Enter your nick name"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <button
          className="purple-button"
          onClick={handleNext}
          disabled={!nickname.trim()}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProfileNicknameScreen

