import React, { useState, useRef, useEffect } from 'react'
import './ScreenStyles.css'
import { verifyOTP, resendOTP } from '../services/otpService'

const OTPScreen = ({ onNext, phoneNumber, sentOTP }) => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [isAutoFetching, setIsAutoFetching] = useState(false)
  const [timer, setTimer] = useState(59) // Countdown timer
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState('')
  const inputRefs = useRef([])

  // Format phone number for display (e.g., 9381687830 -> +91-938*****30)
  const formatPhoneNumber = (num) => {
    if (!num || num.length < 10) return '+91-938*****30' // Default fallback
    const cleaned = num.replace(/\D/g, '') // Remove non-digits
    if (cleaned.length < 10) return '+91-938*****30'

    const first4 = cleaned.substring(0, 4)
    const last2 = cleaned.substring(cleaned.length - 2)
    return `+91-${first4}*****${last2}`
  }

  useEffect(() => {
    // Show "Auto fetching OTP" text immediately
    setIsAutoFetching(true)

    // Auto-fill actual OTP after 2 seconds if available
    const autoFillTimer = setTimeout(() => {
      if (sentOTP && sentOTP.length === 4) {
        // Auto-fill the actual OTP that was sent
        const otpArray = sentOTP.split('')
        setOtp(otpArray)
      } else {
        // If no OTP available, keep empty for manual entry
        // User can enter manually
      }
    }, 2000)

    // Start countdown timer
    const countdownInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearTimeout(autoFillTimer)
      clearInterval(countdownInterval)
    }
  }, [sentOTP])

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const enteredOTP = otp.join('')

    if (enteredOTP.length !== 4) {
      setError('Please enter 4-digit OTP')
      return
    }

    setError('')

    const result = verifyOTP(phoneNumber, enteredOTP)

    if (result.success) {
      // OTP verified, move to next screen
      onNext()
    } else {
      setError('OTP is incorrect')
      // Clear OTP on error
      setOtp(['', '', '', ''])
      inputRefs.current[0]?.focus()
    }
  }

  const handleResend = async () => {
    if (timer > 0) return

    setIsResending(true)
    setError('')

    try {
      const result = await resendOTP(phoneNumber)

      if (result.success) {
        // Reset timer
        setTimer(59)
        setOtp(['', '', '', ''])
        // Auto-fill new OTP after 2 seconds
        if (result.otp && result.otp.length === 4) {
          setTimeout(() => {
            const otpArray = result.otp.split('')
            setOtp(otpArray)
          }, 2000)
        }
      } else {
        setError(result.message || 'Failed to resend OTP')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsResending(false)
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
        <h1 className="headline">Verify Mobile Number</h1>

        <p className="info-text">OTP has been sent to {formatPhoneNumber(phoneNumber)}</p>

        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              className="otp-input"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength="1"
              inputMode="numeric"
            />
          ))}
        </div>

        <p className="auto-fetch-text">Auto Matching OTP</p>

        {error && (
          <p className="error-text" style={{ color: '#ff4444', fontSize: '14px', textAlign: 'center', margin: '10px 0' }}>
            {error}
          </p>
        )}

        <button
          className="purple-button"
          onClick={handleVerify}
          disabled={!otp.every(digit => digit !== '')}
        >
          Verify OTP
        </button>

        <div className="resend-container">
          <span className="resend-text">Didn't receive OTP?</span>
          {timer > 0 ? (
            <span className="resend-timer">Retry in 00:{timer.toString().padStart(2, '0')}</span>
          ) : (
            <button
              className="resend-link"
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending ? 'Sending...' : 'Resend OTP'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OTPScreen

