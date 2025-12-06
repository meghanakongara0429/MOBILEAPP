import React, { useState } from 'react'
import './ScreenStyles.css'
import { sendOTP } from '../services/otpService'

const LoginScreen = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendOTP = async () => {
    // Remove +91 if user entered it
    const cleanNumber = phoneNumber.replace(/^\+91\s*/, '').replace(/\s+/g, '')
    if (cleanNumber.length < 10) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await sendOTP(cleanNumber)

      if (result.success) {
        // OTP sent successfully, move to next screen with OTP
        onNext({
          phoneNumber: cleanNumber,
          otp: result.otp // Pass OTP for auto-fill
        })
      } else {
        setError(result.message || 'Failed to send OTP. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

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
        <h1 className="headline">Login To Get Started</h1>

        <div className="input-container">
          <input
            type="tel"
            className="phone-input"
            placeholder="+91 Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            maxLength="13"
          />
        </div>

        <p className="info-text">You will receive an OTP on this number</p>

        {error && (
          <p className="error-text" style={{ color: '#ff4444', fontSize: '14px', textAlign: 'center', margin: '10px 0' }}>
            {error}
          </p>
        )}

        <button
          className="purple-button"
          onClick={handleSendOTP}
          disabled={phoneNumber.length < 10 || loading}
        >
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </div>
    </div>
  )
}

export default LoginScreen

