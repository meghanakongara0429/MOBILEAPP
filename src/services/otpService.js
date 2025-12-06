// OTP Service - Handles OTP generation and sending
// For production, replace sendOTP function with actual API call to your backend

// Store OTPs temporarily (in production, this should be on backend)
const otpStore = new Map()

// Generate random 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

// Send OTP to phone number
export const sendOTP = async (phoneNumber) => {
  try {
    // Clean phone number
    const cleanedNumber = phoneNumber.replace(/\D/g, '')
    
    if (cleanedNumber.length < 10) {
      throw new Error('Invalid phone number')
    }

    // Generate OTP
    const otp = generateOTP()
    
    // Store OTP with timestamp (expires in 5 minutes)
    otpStore.set(cleanedNumber, {
      otp,
      timestamp: Date.now(),
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    })

    // TODO: Replace this with actual API call to your backend
    // Example:
    // const response = await fetch('/api/send-otp', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ phoneNumber: cleanedNumber, otp })
    // })
    
    // For now, log to console (remove in production)
    console.log(`📱 OTP sent to +91${cleanedNumber}: ${otp}`)
    console.log('⚠️ In production, replace this with actual SMS API call')
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      success: true,
      message: 'OTP sent successfully',
      // Don't send OTP in response in production
      // This is only for testing
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    }
  } catch (error) {
    console.error('Error sending OTP:', error)
    return {
      success: false,
      message: error.message || 'Failed to send OTP'
    }
  }
}

// Verify OTP
export const verifyOTP = (phoneNumber, enteredOTP) => {
  try {
    const cleanedNumber = phoneNumber.replace(/\D/g, '')
    const stored = otpStore.get(cleanedNumber)
    
    if (!stored) {
      return {
        success: false,
        message: 'OTP not found. Please request a new OTP.'
      }
    }
    
    // Check if OTP expired
    if (Date.now() > stored.expiresAt) {
      otpStore.delete(cleanedNumber)
      return {
        success: false,
        message: 'OTP has expired. Please request a new OTP.'
      }
    }
    
    // Verify OTP
    if (stored.otp === enteredOTP) {
      // Remove OTP after successful verification
      otpStore.delete(cleanedNumber)
      return {
        success: true,
        message: 'OTP verified successfully'
      }
    } else {
      return {
        success: false,
        message: 'Invalid OTP. Please try again.'
      }
    }
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return {
      success: false,
      message: 'Error verifying OTP'
    }
  }
}

// Resend OTP
export const resendOTP = async (phoneNumber) => {
  return await sendOTP(phoneNumber)
}

