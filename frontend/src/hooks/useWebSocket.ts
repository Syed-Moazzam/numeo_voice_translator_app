import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { UseWebSocketReturn } from '../types';

export const useWebSocket = (): UseWebSocketReturn => {
    const [isConnected, setIsConnected] = useState(false);
    const [translation, setTranslation] = useState('');
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io('http://localhost:3000', {
            transports: ['websocket'],
            reconnection: true,
        });

        socketRef.current.on('connect', () => {
            console.log('Connected to WebSocket Server');
            setIsConnected(true);
        });

        socketRef.current.on('disconnect', () => {
            console.log('Disconnected from WebSocket Server');
            setIsConnected(false);
        });

        socketRef.current.on('translation', (data: { text: string }) => {
            console.log('Received Translation:', data);
            setTranslation(data.text);
        });

        socketRef.current.on('error', (error: any) => {
            console.log('WebSocket Error:', error);
        });

        return () => {
            socketRef.current?.disconnect();
        }
    }, []);

    const sendAudio = (audioBlob: Blob) => {
        if (socketRef.current && isConnected) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Audio = reader.result as string;
                socketRef.current?.emit('audio', { audio: base64Audio });
            };
            reader.readAsDataURL(audioBlob);
        }
    }

    return {
        socket: socketRef.current,
        isConnected,
        sendAudio,
        translation
    };
}