const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

let translationCount = 0;

io.on('connection', (socket) => {
    console.log('[Server] Client Connected:', socket.id);

    socket.on('audio', async () => {
        console.log('[Server] Received audio from:', socket.id);

        translationCount++;

        const mockTranslations = [
            `Translation #${translationCount}: "Hello! This is a mock translation of your speech."`,
            `Translation #${translationCount}: "In Production environment, this would use OpenAI for transcription."`,
            `Translation #${translationCount}: "Then GPT would translate the transcribed text."`,
            `Translation #${translationCount}: "Each recording currently generates a unique translation count to replicate real-time translations experience."`,
            `Translation #${translationCount}: "The system is working correctly and processing your audio data."`,
        ];

        const translation = mockTranslations[(translationCount - 1) % mockTranslations.length];

        setTimeout(() => {
            socket.emit('translation', { text: translation, language: 'en', timestamp: new Date().toISOString() });
            console.log('[Server] Sent Translation:', translation);
        }, 500);
    });

    socket.on('disconnect', () => {
        console.log('[Server] Client disconnected:', socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log('Voice Translator Server running on PORT:', PORT);
});