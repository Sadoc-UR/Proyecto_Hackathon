/**
 * This file establishes a connection with OpenAI's GPT-based model (e.g., ChatGPT) to start a chat.
 * 
 * Usage:
 * 1. Install the OpenAI library: `npm install openai`.
 * 2. Replace `your_openai_api_key` with your actual OpenAI API key.
 * 3. Import and call the `startChat` function with a prompt to initiate a chat.
 * 
 * Example:
 * const startChat = require('./gemminiConnection');
 * startChat("Hello, how are you?")
 *     .then(response => console.log("Gemmini says:", response))
 *     .catch(error => console.error("Error:", error));
 */

const { Configuration, OpenAIApi } = require('openai');

// Replace with your OpenAI API key
const apiKey = "your_openai_api_key";

const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

async function startChat(prompt) {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003", // Replace with the desired model
            prompt: prompt,
            max_tokens: 150,
        });

        console.log("Chat response:", response.data.choices[0].text.trim());
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error("Error communicating with Gemmini:", error);
        throw error;
    }
}

module.exports = startChat;
