import React, { useRef, useEffect, useState } from 'react'
import './VideoBackground.css'

const VideoBackground = ({ currentStep, getStepVideoRange }) => {
  const videoRef = useRef(null)
  const [videoSrc, setVideoSrc] = useState('')
  const previousStepRef = useRef(-1)
  const videoRangeRef = useRef({ start: 0, end: null })

  useEffect(() => {
    // Video will be provided by user, using placeholder for now
    // User should place their video file in public/video.mp4
    setVideoSrc('/video.mp4')
  }, [])

  // Seek video to specific time when step changes and set up segment loop
  useEffect(() => {
    const video = videoRef.current
    if (!video || !getStepVideoRange) return

    // Only seek if step actually changed
    if (previousStepRef.current !== currentStep) {
      const range = getStepVideoRange(currentStep)
      videoRangeRef.current = range

      const seekToTime = range.start / 1000 // Convert milliseconds to seconds
      video.currentTime = seekToTime
      previousStepRef.current = currentStep

      // Ensure video is playing
      video.play().catch(err => {
        console.log('Video play error:', err)
      })
    }
  }, [currentStep, getStepVideoRange])

  // Monitor video time and loop within segment
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const currentTimeMs = video.currentTime * 1000 // Convert to milliseconds
      const range = videoRangeRef.current

      // If video reached the end of the segment, loop back to start of segment
      if (range.end !== null && currentTimeMs >= range.end) {
        const startTime = range.start / 1000
        video.currentTime = startTime
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [currentStep])

  // Initialize video on mount
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Wait for video to load
    const handleLoadedData = () => {
      video.currentTime = 0
      video.play().catch(err => {
        console.log('Video autoplay prevented:', err)
      })
    }

    video.addEventListener('loadeddata', handleLoadedData)

    // If already loaded, play immediately
    if (video.readyState >= 2) {
      handleLoadedData()
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [videoSrc])

  return (
    <div className="video-background">
      <video
        ref={videoRef}
        className="background-video"
        src={videoSrc}
        autoPlay
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>
    </div>
  )
}

export default VideoBackground

