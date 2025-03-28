/**
 * This file establishes a connection to a MongoDB database using the MongoDB Node.js driver.
 * 
 * Usage:
 * 1. Ensure the MongoDB package is installed: `npm install mongodb`.
 * 2. Replace <db_password> in the `uri` variable with your actual database password.
 * 3. Import and call the `connectToMongo` function to connect to the database.
 * 
 * Example:
 * const connectToMongo = require('./mongoConnection');
 * connectToMongo();
 */

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
