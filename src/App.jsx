import React, { useState, useRef, useEffect } from 'react'
import VideoBackground from './components/VideoBackground'
import OnboardingScreen1 from './screens/OnboardingScreen1'
import OnboardingScreen2 from './screens/OnboardingScreen2'
import OnboardingScreen3 from './screens/OnboardingScreen3'
import LoginScreen from './screens/LoginScreen'
import OTPScreen from './screens/OTPScreen'
import ProfileNicknameScreen from './screens/ProfileNicknameScreen'
import ProfileAgeScreen from './screens/ProfileAgeScreen'
import ProfileGenderScreen from './screens/ProfileGenderScreen'
import './App.css'

const BREAKPOINTS = {
    STEP1_END: 2000,   // 2000ms
    STEP2_END: 4208,   // 4208ms
    STEP3_END: 6875    // 6875ms
}

// Calculate start and end time for each step based on breakpoints
const getStepVideoRange = (stepIndex) => {
    switch (stepIndex) {
        case 0:
            return { start: 0, end: BREAKPOINTS.STEP1_END }  // Step 1: 0ms to 2000ms
        case 1:
            return { start: BREAKPOINTS.STEP1_END, end: BREAKPOINTS.STEP2_END }  // Step 2: 2000ms to 4208ms
        case 2:
            return { start: BREAKPOINTS.STEP2_END, end: BREAKPOINTS.STEP3_END }  // Step 3: 4208ms to 6875ms
        case 3:
            return { start: BREAKPOINTS.STEP3_END, end: null }  // Step 4 (Login): 6875ms onwards (no end)
        default:
            return { start: BREAKPOINTS.STEP3_END, end: null }  // Other steps: 6875ms onwards
    }
}

function App() {
    const [currentStep, setCurrentStep] = useState(0)
    const [direction, setDirection] = useState('forward')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [sentOTP, setSentOTP] = useState('')
    const [nickname, setNickname] = useState('')

    const steps = [
        { component: OnboardingScreen1 },
        { component: OnboardingScreen2 },
        { component: OnboardingScreen3 },
        { component: LoginScreen },
        { component: OTPScreen },
        { component: ProfileNicknameScreen },
        { component: ProfileAgeScreen },
        { component: ProfileGenderScreen },
    ]

    const handleNext = (data) => {
        if (currentStep < steps.length - 1) {
            // If phone number is passed, store it
            if (data && data.phoneNumber) {
                setPhoneNumber(data.phoneNumber)
            }
            // If OTP is passed, store it
            if (data && data.otp) {
                setSentOTP(data.otp)
            }
            // If nickname is passed, store it
            if (data && data.nickname) {
                setNickname(data.nickname)
            }
            setDirection('forward')
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setDirection('backward')
            setCurrentStep(currentStep - 1)
        }
    }

    return (
        <div className="app">
            <VideoBackground
                currentStep={currentStep}
                getStepVideoRange={getStepVideoRange}
            />
            <div className="screen-container">
                {steps.map((step, index) => {
                    const Component = step.component
                    const isActive = index === currentStep
                    const isPrevious = index < currentStep
                    const slideClass = isPrevious && direction === 'backward' ? 'slide-back' : ''
                    return (
                        <div
                            key={index}
                            className={`screen-wrapper ${isActive ? 'active' : 'inactive'} ${slideClass}`}
                        >
                            <Component
                                onNext={handleNext}
                                onBack={handleBack}
                                currentStep={currentStep}
                                phoneNumber={phoneNumber}
                                sentOTP={sentOTP}
                                nickname={nickname}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default App

