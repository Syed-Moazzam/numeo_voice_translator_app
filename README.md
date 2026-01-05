# Voice Translator App
Real-time voice translation app built using React, Vite, Tailwind CSS, and Socket.IO.

## Tech Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, Socket.IO
- Audio: MediaRecorder API (WebM format)
- Real-time Communication: Socket.IO WebSocket

## Setup & Run

### Frontend
```bash
npm install
npm run dev
```

Runs on 'http://localhost:5173'

### Backend
```bash
cd backend
npm install
npm start
```

Runs on 'http://localhost:3000'

## How The App Works
1. User clicks "Start Recording" button ---> MediaRecorder captures audio
2. User clicks "Stop Recording" button ---> Audio blob gets created
3. Audio converted to base64 ---> sent via WebSocket to the backend
4. Backend processes audio ---> Returns translation (currently mocked)
5. Translation gets displayed in real-time on our UI

## Assumptions and Trade-offs
- Audio format: WebM (good browser support, may need to convert it for some AI APIs)
- Real-time approach: Audio sent when the recording stops (not continuous streaming)
- Mock Translation: Backend returns numbered mock responses; obviously production would integrate OpenAI + GPT,
- State Management: React hooks only (useState, useRef) - sufficient for this scope
- No authentication: Single-user demo app
- Tailwind CSS: Used for easy and fast development + styling