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


