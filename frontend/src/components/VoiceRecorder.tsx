import { useState, useRef, useEffect } from "react";
import type { VoiceRecorderProps } from "../types";

export const VoiceRecorder = ({ onAudioCapture, isConnected }: VoiceRecorderProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
                onAudioCapture(audioBlob);
                chunksRef.current = [];
            }
        }).catch((error) => {
            console.error('Error accessing microphone: ', error);
            setError('Please allow microphone access to use this app!');
        });

        return () => {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
            }
        }
    }, [onAudioCapture]);

    const startRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "inactive") {
            chunksRef.current = [];
            mediaRecorderRef.current.start();
            setIsRecording(true);
            setError(null);
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    }

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
            {error && (
                <div className="w-full bg-red-900 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={!isConnected}
                className={`relative w-44 h-44 rounded-full font-semibold text-white text-lg shadow-2xl transition-all duration-300 transform ${isRecording ? 'bg-linear-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 scale-105' : 'bg-linear-to-br fro-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105'} disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-blue-400`}
            >
                <div className="flex flex-col items-center gap-3">
                    {isRecording ? (
                        <>
                            <div className="w-14 h-14 bg-white rounded-lg"></div>
                            <span className="text-base">Stop Recording</span>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" y1="19" x2="12" y2="23" />
                                <line x1="8" y1="23" x2="16" y2="23" />
                            </svg>
                            <span className="text-base">Start Recording</span>
                        </>
                    )}
                </div>

                {isRecording && (
                    <div className="absolute inset-0 rounded-full bg-red-400 animate-pulse-slow opacity-30"></div>
                )}
            </button>

            <div className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-full border borde-gray-700">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>

                <span className="text-sm text-gray-300">
                    {isConnected ? 'Connected to Server' : 'Disconnected'}
                </span>
            </div>
        </div>
    );
}