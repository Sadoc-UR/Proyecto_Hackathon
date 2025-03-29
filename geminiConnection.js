/**
 * Conexión actualizada con Google's Gemini API (Marzo 2025)
 * Integrada con MongoDB para almacenamiento de conversaciones
 */
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { storeChatMessage } = require('./mongoConnection');
const crypto = require('crypto');


// Configuración de la API de Gemini
const API_KEY = "AIzaSyA9lX5ruXZWcmk09GGw5zOyf5se1rUCb3o"; // En producción, usar variables de entorno
const genAI = new GoogleGenerativeAI(API_KEY);


// El historial de chat para mantener el contexto de la conversación
let chatHistory = [];


// Map to store user session IDs
const userSessions = new Map();


/**
 * Genera un ID de sesión único para cada usuario
 * @param {string} identifier - Identificador de cliente (IP, cookie, etc.)
 * @returns {string} - ID de sesión
 */
function getUserSessionId(identifier) {
    if (!userSessions.has(identifier)) {
        // Crear un nuevo ID de sesión si no existe
        const sessionId = crypto.randomUUID();
        userSessions.set(identifier, sessionId);
    }
    return userSessions.get(identifier);
}


/**
 * Inicia o continúa una conversación con Gemini
 *
 * @param {string} message - El mensaje del usuario
 * @param {string} userIdentifier - Identificador del usuario (IP, cookie, etc.)
 * @returns {string} - La respuesta de Gemini
 */
async function chatWithGemini(message, userIdentifier = 'anonymous') {
    try {
        // Obtener o crear ID de sesión para el usuario
        const userId = getUserSessionId(userIdentifier);
       
        // Versión actualizada: intenta obtener un modelo más reciente
        const modelName = "gemini-1.5-pro";
        const model = genAI.getGenerativeModel({ model: modelName });
       
        // Añadir el mensaje del usuario al historial
        chatHistory.push({ role: "user", parts: [{ text: message }] });
       
        // Crear una nueva sesión de chat con el historial actual
        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
            },
        });
       
        // Obtener la respuesta
        const result = await chat.sendMessage(message);
        const response = result.response.text();
       
        // Añadir la respuesta al historial
        chatHistory.push({ role: "model", parts: [{ text: response }] });
       
        // Limitar el tamaño del historial para no exceder los límites de tokens
        if (chatHistory.length > 10) {
            // Conservar solo los últimos 10 mensajes
            chatHistory = chatHistory.slice(chatHistory.length - 10);
        }
       
        // Guardar el mensaje y la respuesta en MongoDB
        try {
            await storeChatMessage(userId, message, response);
        } catch (dbError) {
            console.warn("No se pudo guardar el mensaje en la base de datos:", dbError);
            // Continuamos con la respuesta aunque falle el guardado
        }
       
        return response;
    } catch (error) {
        console.error("Error al comunicarse con Gemini:", error);
       
        // Intentar con otro nombre de modelo si el primero falla
        if (error.status === 404 && error.message.includes("not found")) {
            try {
                // Intenta con el modelo original, pero con un endpoint diferente
                const fallbackModel = genAI.getGenerativeModel({
                    model: "gemini-pro",
                    apiVersion: "v1" // Prueba diferentes versiones de API
                });
               
                // Crea una nueva sesión sin el historial para simplificar
                const simpleChat = fallbackModel.startChat({
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1000,
                    }
                });
               
                const result = await simpleChat.sendMessage(message);
                const fallbackResponse = result.response.text();
               
                // Guardar el mensaje y la respuesta en MongoDB
                try {
                    const userId = getUserSessionId(userIdentifier);
                    await storeChatMessage(userId, message, fallbackResponse);
                } catch (dbError) {
                    console.warn("No se pudo guardar el mensaje en la base de datos:", dbError);
                }
               
                return fallbackResponse;
            } catch (fallbackError) {
                console.error("Error en el modelo de respaldo:", fallbackError);
                return "Lo siento, no pude conectar con ninguno de los modelos disponibles. Verifica los modelos disponibles y actualiza tu código.";
            }
        }
       
        return "Lo siento, hubo un error al procesar tu mensaje. Inténtalo de nuevo más tarde.";
    }
}


/**
 * Reinicia el historial de chat
 * @param {string} userIdentifier - Identificador del usuario
 */
function resetChatHistory(userIdentifier = 'anonymous') {
    if (userIdentifier === 'all') {
        // Reiniciar todos los historiales
        chatHistory = [];
        userSessions.clear();
    } else {
        // Reiniciar solo el historial del usuario específico
        chatHistory = [];
        if (userSessions.has(userIdentifier)) {
            userSessions.delete(userIdentifier);
        }
    }
}


module.exports = {
    chatWithGemini,
    resetChatHistory,
    getUserSessionId
};
