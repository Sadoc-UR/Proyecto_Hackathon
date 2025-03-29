/**
 * Servidor Express para manejar las solicitudes de chat con Gemini
 */

const express = require('express');
const cors = require('cors');
const { chatWithGemini, resetChatHistory } = require('./geminiConnection');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para procesar mensajes del chat
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'El mensaje es requerido' });
        }
        
        const reply = await chatWithGemini(message);
        res.json({ reply });
    } catch (error) {
        console.error('Error en la ruta de chat:', error);
        res.status(500).json({ 
            error: 'Error al procesar el mensaje',
            details: error.message 
        });
    }
});

// Ruta para reiniciar el historial de chat
app.post('/reset-chat', (req, res) => {
    resetChatHistory();
    res.json({ message: 'Historial de chat reiniciado' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});