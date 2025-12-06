# Mobile Application with Video Background

A React-based mobile application with onboarding flow, login, OTP verification, and profile completion screens. Features a video background with breakpoints at specific timestamps.

## Features

- 3 Onboarding screens with pagination
- Login screen with phone number input
- OTP verification screen with auto-fetch
- Profile completion (nickname, age group, gender)
- Video background with breakpoints at:
  - Step 1 end: 2000ms
  - Step 2 end: 4208ms
  - Step 3 end: 6875ms

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add your video file:
   - Place your video file in the `public` folder
   - Name it `video.mp4`
   - Update the video path in `src/components/VideoBackground.jsx` if needed

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
mobile/
├── public/
│   └── video.mp4 (add your video here)
├── src/
│   ├── components/
│   │   ├── VideoBackground.jsx
│   │   └── VideoBackground.css
│   ├── screens/
│   │   ├── OnboardingScreen1.jsx
│   │   ├── OnboardingScreen2.jsx
│   │   ├── OnboardingScreen3.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── OTPScreen.jsx
│   │   ├── ProfileNicknameScreen.jsx
│   │   ├── ProfileAgeScreen.jsx
│   │   ├── ProfileGenderScreen.jsx
│   │   └── ScreenStyles.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Video Breakpoints

The video background automatically syncs with the onboarding screens:
- At 2000ms: Shows Onboarding Screen 1
- At 4208ms: Shows Onboarding Screen 2
- At 6875ms: Shows Onboarding Screen 3

After the onboarding screens, users can manually navigate through login and profile screens.

## Customization

- Update colors in `ScreenStyles.css`
- Modify breakpoint timings in `App.jsx`
- Replace character emojis with actual 3D models or images
- Add your video file to the `public` folder

