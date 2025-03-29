/**
 * Conexión actualizada con Google's Gemini API (Marzo 2025)
 */
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Configuración de la API de Gemini
const API_KEY = "AIzaSyA9lX5ruXZWcmk09GGw5zOyf5se1rUCb3o";
const genAI = new GoogleGenerativeAI(API_KEY);

// El historial de chat para mantener el contexto de la conversación
let chatHistory = [];

/**
 * Inicia o continúa una conversación con Gemini
 * 
 * @param {string} message - El mensaje del usuario
 * @returns {string} - La respuesta de Gemini
 */
async function chatWithGemini(message) {
    try {
        // Versión actualizada: intenta obtener un modelo más reciente
        // Google puede haber actualizado los nombres de sus modelos
        const modelName = "gemini-1.5-pro"; // Prueba con un nombre de modelo actualizado
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
                return result.response.text();
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
 */
function resetChatHistory() {
    chatHistory = [];
}

module.exports = { chatWithGemini, resetChatHistory };