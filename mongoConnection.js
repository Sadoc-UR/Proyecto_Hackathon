// Try this updated MongoDB connection configuration
const { MongoClient } = require('mongodb');

// Use correct password - this should match your Atlas account
const password = encodeURIComponent("pan"); // Encode the password to handle special characters

const uri = `mongodb+srv://luisangelherrerahdz:${password}@hackaton.qttaxah.mongodb.net/?retryWrites=true&w=majority&appName=Hackaton`;

const client = new MongoClient(uri, {
  // Modified TLS options
  tls: true,
  tlsAllowInvalidCertificates: true, 
  tlsAllowInvalidHostnames: true, // Add this line
  
  // Increased timeouts
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 50000,
  
  // API version
  serverApi: {
    version: '1',
    strict: false, // Change to false for testing
    deprecationErrors: true
  }
});

/**
 * Connects to MongoDB Atlas
 * @returns {Promise<MongoClient>} The connected MongoDB client
 */
async function connectToMongo() {
    try {
      // Connect with retries
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await client.connect();
         
          // Test the connection
          await client.db("admin").command({ ping: 1 });
          console.log("Connected to MongoDB successfully!");
          return client;
        } catch (err) {
          console.warn(`Connection attempt ${attempt} failed: ${err.message}`);
          if (attempt === 3) throw err;
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }


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
