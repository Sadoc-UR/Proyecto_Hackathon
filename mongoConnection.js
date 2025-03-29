/**
 * This file establishes a connection to a MongoDB database using the MongoDB Node.js driver.
 * 
 * Changes:
 * - Added a function `connectToMongo` to connect to the MongoDB database.
 * - Included error handling and ensured the client is closed after operations.
 * - Added a function `insertFormData` to process form data and insert it into the MongoDB database.
 * 
 * Usage:
 * 1. Ensure the MongoDB package is installed: `npm install mongodb`.
 * 2. Replace <db_password> in the `uri` variable with your actual database password.
 * 3. Import and call the `connectToMongo` function to connect to the database.
 * 4. Use the `insertFormData` function to insert form data into the database.
 * 
 * Example:
 * const { connectToMongo, insertFormData } = require('./mongoConnection');
 * connectToMongo();
 * insertFormData('collectionName', { key: 'value' });
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

/**
 * Processes form data and inserts it into the MongoDB database.
 * 
 * @param {string} collectionName - The name of the MongoDB collection.
 * @param {Object} formData - The data from the form to be inserted.
 * @returns {Object} - The result of the database insertion.
 */
async function insertFormData(collectionName, formData) {
    try {
        await client.connect();
        const database = client.db("HackathonDB"); // Replace with your database name
        const collection = database.collection(collectionName);

        const result = await collection.insertOne(formData);
        console.log(`Data inserted successfully into ${collectionName}:`, result.insertedId);
        return result;
    } catch (error) {
        console.error("Error inserting form data into MongoDB:", error);
        throw error;
    } finally {
        await client.close();
    }
}

module.exports = { connectToMongo, insertFormData };






document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".menu-item");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");
    const closeModal = document.getElementById("close-modal");

    const categoryDescriptions = {
        "transito": "Reporta problemas de tráfico, semáforos dañados o accidentes viales.",
        "seguridad": "Denuncia robos, vandalismo o situaciones sospechosas en tu comunidad.",
        "medioambiente": "Reporta contaminación, basura acumulada o daños ecológicos.",
        "infraestructura": "Denuncia baches, alumbrado público dañado o problemas urbanos.",
        "salud": "Informa sobre problemas en hospitales o emergencias sanitarias.",
        "servicios": "Reporta fallos en agua, luz o cualquier servicio público esencial."
    };

    items.forEach(item => {
        item.addEventListener("click", () => {
            const category = item.getAttribute("data-category");
            modalTitle.textContent = item.textContent;
            modalText.textContent = categoryDescriptions[category];
            modal.classList.remove("hidden");
        });
    });

    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.add("hidden");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".menu-item");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");
    const closeModal = document.getElementById("close-modal");

    const categoryDescriptions = {
        "transito": "Reporta problemas de tráfico, semáforos dañados o accidentes viales.",
        "seguridad": "Denuncia robos, vandalismo o situaciones sospechosas en tu comunidad.",
        "medioambiente": "Reporta contaminación, basura acumulada o daños ecológicos.",
        "infraestructura": "Denuncia baches, alumbrado público dañado o problemas urbanos.",
        "salud": "Informa sobre problemas en hospitales o emergencias sanitarias.",
        "servicios": "Reporta fallos en agua, luz o cualquier servicio público esencial."
    };

    items.forEach(item => {
        item.addEventListener("click", () => {
            const category = item.getAttribute("data-category");
            modalTitle.textContent = item.textContent;
            modalText.textContent = categoryDescriptions[category];
            modal.classList.remove("hidden");
        });
    });

    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.add("hidden");
        }
    });
});
