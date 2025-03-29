/**  
 * Servidor Express para manejar las solicitudes de chat con Gemini
 * Integrado con MongoDB para almacenamiento de datos
 */




const express = require('express');
const cors = require('cors');
const { chatWithGemini, resetChatHistory } = require('./geminiConnection');
const { connectToMongo, insertFormData } = require('./mongoConnection');


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
// En tu archivo server.js, actualiza la configuración de CORS
app.use(cors({
    origin: '*', // En producción, restringe esto a tu dominio real
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Verificar la conexión a MongoDB al iniciar
connectToMongo()
    .then(client => {
        console.log('MongoDB connection verified successfully');
        client.close();
    })
    .catch(err => {
        console.error('Failed to verify MongoDB connection:', err);
    });


// Middleware para obtener la IP del cliente
const getClientInfo = (req) => {
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'unknown';
    return `${clientIP}-${userAgent.substring(0, 20)}`;
};


// Ruta para procesar mensajes del chat
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
       
        if (!message) {
            return res.status(400).json({ error: 'El mensaje es requerido' });
        }
       
        // Obtener identificador del cliente para seguimiento de sesión
        const clientId = getClientInfo(req);
       
        const reply = await chatWithGemini(message, clientId);
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
    const clientId = getClientInfo(req);
    resetChatHistory(clientId);
    res.json({ message: 'Historial de chat reiniciado' });
});


// Ruta para enviar reportes de tránsito
app.post('/submit-transito', async (req, res) => {
    try {
        const formData = req.body;
       
        // Validar datos del formulario
        if (!formData.name || !formData.date || !formData.incident) {
            return res.status(400).json({
                error: 'Datos incompletos. Por favor complete los campos requeridos.'
            });
        }
       
        // Añadir metadatos
        formData.createdAt = new Date();
        formData.status = 'pending';
        formData.ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
       
        // Guardar en MongoDB
        const result = await insertFormData('Transito', formData);
       
        res.json({
            success: true,
            message: 'Reporte enviado correctamente',
            id: result.insertedId
        });
    } catch (error) {
        console.error('Error al procesar el formulario:', error);
        res.status(500).json({
            error: 'Error al guardar los datos',
            details: error.message
        });
    }
});


// Manejo de errores global
// CORS configuration
app.use(cors({
    origin: ['http://yourdomain.com', 'http://localhost:3000'], // Restrict to specific domains
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error('Error no controlado:', err);
    res.status(500).json({
      error: 'Error interno del servidor',
      // Don't expose detailed error messages in production
      details: process.env.NODE_ENV === 'development' ? err.message : 'Error interno'
    });
  });


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
