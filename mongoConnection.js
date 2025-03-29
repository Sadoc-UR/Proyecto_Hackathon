const { MongoClient } = require('mongodb');

// Use environment variables for sensitive information in a production environment
const password = encodeURIComponent("pan");

const uri = `mongodb+srv://luisangelherrerahdz:${password}@hackaton.qttaxah.mongodb.net/?retryWrites=true&w=majority&appName=Hackaton`;

const client = new MongoClient(uri, {
  // MongoDB connection options
  tls: true,
  // Be careful with these options in production - they reduce security
  tlsAllowInvalidCertificates: false, // Change to false in production
  
  // Reasonable timeouts
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 30000,
  
  // API version
  serverApi: {
    version: '1',
    strict: true, // Set to true for production
    deprecationErrors: true
  }
});

/**
 * Connects to MongoDB Atlas
 * @returns {Promise<MongoClient>} The connected MongoDB client
 */
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = {
  connectToMongo,
  insertFormData,
  storeChatMessage
};


/**
 * Insert form data into the specified collection
 * @param {string} collectionName - Name of the collection
 * @param {object} data - Form data to insert
 * @returns {Promise<object>} Result of the insert operation
 */
async function insertFormData(collectionName, data) {
  try {
    await client.connect();
    const db = client.db("Denuncias");
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    console.error(`Error inserting data to ${collectionName}:`, error);
    throw error;
  }
}


/**
 * Store chat messages in the database
 * @param {string} userId - User session ID
 * @param {string} userMessage - Message from the user
 * @param {string} aiResponse - Response from the AI
 * @returns {Promise<object>} Result of the insert operation
 */
async function storeChatMessage(userId, userMessage, aiResponse) {
  try {
    await client.connect();
    const db = client.db("Denuncias");
    const collection = db.collection("ChatLogs");
   
    const chatLog = {
      userId,
      timestamp: new Date(),
      userMessage,
      aiResponse
    };
   
    const result = await collection.insertOne(chatLog);
    return result;
  } catch (error) {
    console.error("Error storing chat message:", error);
    throw error;
  }
}


module.exports = {
  connectToMongo,
  insertFormData,
  storeChatMessage
};
