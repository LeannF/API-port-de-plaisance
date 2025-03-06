/**
 * @preventDefault Empêche le rechargement de la page
 * @catwayID recupere le numero du catway
 * @entity récupere l'entité indiqué sur la page (users, catways ou reservations)
 * @reservationId recupere le l'id de la réservation
 * @id id de l'element a modifier
 * @email récupére l'email de l'utilisateur
 * @remove retire la ligne du DOM
 * @replaceChildren remplace la ligne par le formulaire de modification rempli
 * @reload  Recharge la page après succès
 */

document.getElementById("search-form").addEventListener("submit", async (event) => {
    event.preventDefault(); 
    const entity = event.target.closest("[data-entity]").dataset.entity;
    let url = "";

    if (entity === "users") {
        const email = document.getElementById("email").value;
        url = `/users/${email}`;

    } else if (entity === "catways") {
        const catwayId = document.getElementById("catwayNumber").value;
        url = `/catways/${catwayId}`;

    } else if (entity === "reservations") {
        const catwayId = document.getElementById("catwayNumber").value;
        const reservationId = document.getElementById("idReservation").value;
        url = `/catways/${catwayId}/reservations/${reservationId}`;
    }
    try {
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();

        if (response.ok) {
            /** Génére l'affichage des résultats */ 
            const resultsContainer = document.getElementById("resultsContainer");
            if (!resultsContainer) {
                console.error("Container des résultats introuvable !");
            }
            /** Réinitialise les résultats précédents */
            resultsContainer.innerHTML = ""; 
                const itemElement = document.createElement("div");
                if (entity === "users") {
                    itemElement.innerHTML = `<p><strong>Nom :</strong> ${data.userName} | <strong>Email :</strong> ${data.email}</p>`;
                } else if (entity === "catways") {
                    itemElement.innerHTML = `<p><strong>Catway Number :</strong> ${data.catwayNumber} | <strong>Type :</strong> ${data.catwayType} | <strong>Type :</strong> ${data.catwayState}</p>`;
                } else if (entity === "reservations") {
                    itemElement.innerHTML = `<p><strong>Client :</strong> ${data.clientName} | <strong>Bateau :</strong> ${data.boatName} | <strong>Date de début :</strong> ${data.startDate} | <strong>Date de fin :</strong> ${data.endDate}</p>`;
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
        /** Trouve la ligne du bouton */
        const row = event.target.closest("tr"); 
        const catwayId = row.dataset.catway; 
        const entity = row.closest("[data-entity]").dataset.entity; 
        let url = "";

        /** Popup qui demande de confirmer la suppression */
        if (!confirm("Voulez-vous vraiment supprimer cet élément ?")) return; 

        if (entity === "users") {
            const email = row.dataset.email; 
            url = `/users/${email}`;

        } else if (entity === "catways") {
            url = `/catways/${catwayId}`;
            
        } else if (entity === "reservations") {
            const reservationId = row.dataset.id; 
            url = `/catways/${catwayId}/reservations/${reservationId}`;
        }

        try {
            const response = await fetch(url, { method: "DELETE" });

            if (response.ok) {
                row.remove(); 
            } else {
                console.error("Erreur lors de la suppression");
            }
        } catch (error) {
            console.error("Erreur serveur lors de la suppression", error);
        }
    });
});

document.querySelectorAll(".update-btn").forEach(button => {
    button.addEventListener("click", (event) => {
        const id = event.target.dataset.id; 
        const row = document.getElementById(`row-${id}`); 
        const catwayId = row.dataset.catway; 

        let url = "";
        const entity = event.target.closest("[data-entity]").dataset.entity;

        const updateForm = document.createElement("td");
        updateForm.colSpan = 6; 

        /** formulaire modifiant les données par rapport à la page sur laquelle se trouve l'utilisateur */
        switch (entity) {
            case "users":
                const userName = row.children[0].innerText;
                const email = row.children[1].innerText;
                const password = row.children[2].innerText;
                url = `/users/${email}`;

                updateForm.innerHTML = `
                    <form id="update-form-${id}">
                        <input name="userName" value="${userName}">
                        <input name="email" value="${email}">
                        <input name="password" value="${password}">
                        <button type="submit">Valider</button>
                        <button type="button" onclick="cancelUpdate('${id}')">Annuler</button>
                    </form>
                `;
                row.replaceChildren(updateForm);
                break;
            case "catways":
                const catwayState = row.children[2].innerText;
                url = `/catways/${catwayId}`;

                updateForm.innerHTML = `
                    <form id="update-form-${id}">
                        <input name="catwayState" value="${catwayState}">
                        <button type="submit">Valider</button>
                        <button type="button" onclick="cancelUpdate('${id}')">Annuler</button>
                    </form>
                `;
                row.replaceChildren(updateForm);
                break;
            case "reservations":
                const clientName = row.children[1].innerText;
                const boatName = row.children[2].innerText;
                const startDate = row.children[3].innerText;
                const endDate = row.children[4].innerText;
                url = `/catways/${catwayId}/reservations`;

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
                row.replaceChildren(updateForm);
                break;
            default:
                console.error("Entité inconnue");
                return;
        }

        /** Écouteur de soumission du formulaire */ 
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
                } else {
                    console.error("Erreur lors de la mise à jour");
                }
            } catch (error) {
                console.error("Erreur serveur lors de la mise à jour", error);
            }
        });
    });
});