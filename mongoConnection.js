// Ensure you have installed the MongoDB package by running: npm install mongodb
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://luisangelherrerahdz:<db_password>@hackaton.qttaxah.mongodb.net/?retryWrites=true&w=majority&appName=Hackaton"; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

async function connectToMongo() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
        // ...use the client for database operations...
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close(); // Ensure the client is closed after operations
    }
}

module.exports = connectToMongo;
