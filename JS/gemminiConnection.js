/**
 * This file establishes a connection with OpenAI's GPT-based model (e.g., ChatGPT) to start a chat.
 * 
 * Changes:
 * - Added the `startChat` function to send prompts to the GPT model and receive responses.
 * - Included a helper function `parseResponseForForm` to parse the GPT response into structured data for HTML forms.
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

/**
 * Starts a chat with Gemmini and processes the response to populate HTML forms.
 * 
 * @param {string} prompt - The user's input or question.
 * @returns {Object} - An object containing structured data for HTML forms.
 */
async function startChat(prompt) {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003", // Replace with the desired model
            prompt: prompt,
            max_tokens: 150,
        });

        const chatResponse = response.data.choices[0].text.trim();
        console.log("Chat response:", chatResponse);

        // Example: Parse the response into structured data for forms
        const formData = parseResponseForForm(chatResponse);
        return formData;
    } catch (error) {
        console.error("Error communicating with Gemmini:", error);
        throw error;
    }
}

/**
 * Parses the chat response into structured data for populating HTML forms.
 * 
 * @param {string} response - The raw response from Gemmini.
 * @returns {Object} - An object containing key-value pairs for form fields.
 */
function parseResponseForForm(response) {
    // Example logic to parse the response (customize as needed)
    const formData = {};
    const lines = response.split('\n');
    lines.forEach(line => {
        const [key, value] = line.split(':').map(item => item.trim());
        if (key && value) {
            formData[key] = value;
        }
    });
    return formData;
}

module.exports = startChat;
