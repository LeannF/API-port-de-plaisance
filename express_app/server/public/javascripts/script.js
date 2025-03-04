document.getElementById("search-form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const entity = event.target.closest("[data-entity]").dataset.entity;
    const email = document.getElementById("email").value;

    let url = "";

    if (entity === "users") {
        url = `/users/${email}`;

    } else if (entity === "catways") {
        url = `/catways/${catwayId}`;

    } else if (entity === "reservations") {
        let reservationId = event.target.dataset.id;
        url = `/catways/${catwayId}/reservations/${reservationId}`;
    }

    try {
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();

        if (response.ok) {
            // Générer l'affichage des résultats
            const resultsContainer = document.getElementById("resultsContainer");
            if (!resultsContainer) {
                console.error("Container des résultats introuvable !");
            }
            resultsContainer.innerHTML = ""; // Réinitialiser les résultats précédents
                const itemElement = document.createElement("div");
                if (entity === "users") {
                    itemElement.innerHTML = `<p><strong>Nom :</strong> ${data.userName} | <strong>Email :</strong> ${data.email}</p>`;
                } else if (entity === "catways") {
                    itemElement.innerHTML = `<p><strong>Catway Number :</strong> ${data.catwayNumber} | <strong>Type :</strong> ${data.catwayType} | <strong>Type :</strong> ${data.catwayType}</p>`;
                } else if (entity === "reservations") {
                    itemElement.innerHTML = `<p><strong>Client :</strong> ${data.clientName} | <strong>Bateau :</strong> ${data.boatName}</p>`;
                }
                resultsContainer.appendChild(itemElement);
        } else {
            document.getElementById("resultsContainer").innerHTML = "<p>Aucun résultat trouvé</p>";
        }
    } catch (error) {
        console.error("Erreur :", error);
        document.getElementById("resultsContainer").innerHTML = "<p>Une erreur est survenue.</p>";
    }
});


document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", async (event) => {
        const row = event.target.closest("tr"); // Trouver la ligne du bouton
        const catwayId = row.dataset.catway; // Id du catway
        const entity = row.closest("[data-entity]").dataset.entity; // Type d'entité (user, catway, reservation)
        let url = "";

        if (!confirm("Voulez-vous vraiment supprimer cet élément ?")) return; // Confirmer la suppression

        if (entity === "users") {
            const email = row.dataset.email; // Récupérer l'email de l'utilisateur
            url = `/users/${email}`;
        } else if (entity === "catways") {
            url = `/catways/${catwayId}`;
        } else if (entity === "reservations") {
            const reservationId = row.dataset.id; // ID de la réservation
            url = `/catways/${catwayId}/reservations/${reservationId}`;
        }

        try {
            const response = await fetch(url, { method: "DELETE" });

            if (response.ok) {
                row.remove(); // Supprimer la ligne du DOM
            } else {
                console.error("Erreur lors de la suppression");
            }
        } catch (error) {
            console.error("Erreur serveur lors de la suppression", error);
        }
    });
});


/*document.querySelectorAll(".update-btn").forEach(button => {
    button.addEventListener("click", async (event) => {
        const id = event.target.dataset.id;
        const entity = event.target.closest("[data-entity]").dataset.entity;
        let url = "";

        if (entity === "users") {
            const email = event.target.dataset.email;
            url = `/users/${email}`;
        } else if (entity === "catways") {
            url = `/catways/${id}`;
        } else if (entity === "reservations") {
            const catwayId = event.target.closest("tr").dataset.catway;
            url = `/catways/${catwayId}/reservations`;
        }

        const data = { name: "Nouveau Nom" }; // Exemple de données à mettre à jour

        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                location.reload();
            }
        } catch (error) {
            console.error(`Erreur mise à jour de ${entity} :`, error);
        }
    });
});*/


/*document.querySelectorAll(".update-btn").forEach(button => {
    button.addEventListener("click", (event) => {
        const id = event.target.dataset.id; // ID de l'élément à modifier
        const updateRoute = event.target.dataset.route; // Récupération de la route

        console.log("Route d'update :", updateRoute);
        console.log("ID :", id);

        const row = document.getElementById(`row-${id}`);

        // Récupérer les données actuelles
        const clientName = row.children[1].innerText;
        const boatName = row.children[2].innerText;
        const startDate = row.children[3].innerText;
        const endDate = row.children[4].innerText;

        // Création du formulaire de mise à jour
        const updateForm = document.createElement("td");
        updateForm.colSpan = 6;
        updateForm.innerHTML = `
            <form id="update-form-${id}">
                <input name="clientName" value="${clientName}">
                <input name="boatName" value="${boatName}">
                <input name="startDate" type="date" value="${startDate}">
                <input name="endDate" type="date" value="${endDate}">
                <button type="submit">Valider</button>
                <button type="button" onclick="cancelUpdate('${id}')">Annuler</button>
            </form>
        `;

        // Remplacer la ligne actuelle par le formulaire
        row.replaceChildren(updateForm);

        // Écouteur d'événement pour soumission du formulaire
        document.getElementById(`update-form-${id}`).addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(url, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });
    
                if (response.ok) {
                    location.reload();
                }
            } catch (error) {
                console.error(`Erreur mise à jour de ${entity} :`, error);
            }
        });
    });
});*/

document.querySelectorAll(".update-btn").forEach(button => {
    button.addEventListener("click", (event) => {
        const id = event.target.dataset.id; // ID de l'élément à modifier
        const row = document.getElementById(`row-${id}`); // Trouver la ligne

        let url = "";
        const entity = event.target.closest("[data-entity]").dataset.entity;

        const updateUserForm = document.createElement("td");
        updateUserForm.colSpan = 6; // Remplacer la ligne entière

        switch (entity) {
            case "users":
                const userName = row.children[0].innerText;
                const email = row.children[1].innerText;
                const password = row.children[2].innerText;
                url = `/users/${email}`;

                updateUserForm.innerHTML = `
                    <form id="update-form-${id}">
                        <input name="userName" value="${userName}">
                        <input name="email" value="${email}">
                        <input name="password" value="${password}">
                        <button type="submit">Valider</button>
                        <button type="button" onclick="cancelUpdate('${id}')">Annuler</button>
                    </form>
                `;
                row.replaceChildren(updateUserForm);
                break;
            case "catways":
                const catwayNumber = row.children[1].innerText;
                const catwayType = row.children[2].innerText;
                const catwayState = row.children[3].innerText;
                url = `/catways/${id}`;

                updateCatwayForm.innerHTML = `
                    <form id="update-form-${id}">
                        <input name="catwayNumber" value="${catwayNumber}">
                        <select name="catwayType" value="${catwayType}">
                            <option value="long">Long</option>
                            <option value="short">Short</option>
                        </select>
                        <input name="catwayState" value="${catwayState}">
                        <button type="submit">Valider</button>
                        <button type="button" onclick="cancelUpdate('${id}')">Annuler</button>
                    </form>
                `;
                row.replaceChildren(updateCatwayForm);
                break;
            case "reservations":
                const clientName = row.children[1].innerText;
                const boatName = row.children[2].innerText;
                const startDate = row.children[3].innerText;
                const endDate = row.children[4].innerText;
                url = `/catways/${id}/reservations`;

                updateReservationForm.innerHTML = `
                    <form id="update-form-${id}">
                        <input name="clientName" value="${clientName}">
                        <input name="boatName" value="${boatName}">
                        <input name="startDate" type="date" value="${startDate}">
                        <input name="endDate" type="date" value="${endDate}">
                        <button type="submit">Valider</button>
                        <button type="button" onclick="cancelUpdate('${id}')">Annuler</button>
                    </form>
                `;
                row.replaceChildren(updateReservationForm);
                break;
            default:
                console.error("Entité inconnue");
                return;
        }

        // Écouteur de soumission du formulaire
        document.getElementById(`update-form-${id}`).addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(url, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    location.reload(); // Recharger la page après succès
                } else {
                    console.error("Erreur lors de la mise à jour");
                }
            } catch (error) {
                console.error("Erreur serveur lors de la mise à jour", error);
            }
        });
    });
});

