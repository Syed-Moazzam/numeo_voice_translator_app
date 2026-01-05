import { useWebSocket } from './hooks/useWebSocket'
import { VoiceRecorder } from './components/VoiceRecorder'
import { TranslationDisplay } from './components/TranslationDisplay'

function App() {
  const { isConnected, sendAudio, translation } = useWebSocket();

  const handleAudioCapture = (audioBlob: Blob) => {
    console.log('Audio Captured, size:', audioBlob.size);
    sendAudio(audioBlob);
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900'>
      <div className='max-w-5xl mx-auto px-4 py-12'>
        <header className='text-center mb-16'>
          <h1 className='text-6xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3'>
            Voice Translator
          </h1>

          <p className='text-gray-400 text-xl'>
            Speak naturally and get AI-powered translations in real-time
          </p>
        </header>

        <div className='flex flex-col items-center gap-10'>
          <VoiceRecorder isConnected={isConnected}
            onAudioCapture={handleAudioCapture}
          />

          <TranslationDisplay translation={translation} />
        </div>

        <footer className='mt-16 text-center text-sm text-gray-500'>
          <p>Developed using React, TypeScript, Vite, Tailwind CSS & Socket.IO</p>
        </footer>
      </div>
    </div>
  )
}

export default App;