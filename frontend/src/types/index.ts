import type { Socket } from "socket.io-client";

export interface VoiceRecorderProps {
    onAudioCapture: (audioBlob: Blob) => void;
    isConnected: boolean;
}

export interface TranslationDisplayProps {
    translation: string;
}

export interface UseWebSocketReturn {
    socket: Socket | null;
    isConnected: boolean;
    sendAudio: (audioBlob: Blob) => void;
    translation: string;
};