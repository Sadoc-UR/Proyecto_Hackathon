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
