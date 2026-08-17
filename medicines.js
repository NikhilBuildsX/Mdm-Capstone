// ==========================================
// SMART HEALTHCARE COMPANION
// Medicines JavaScript
// ==========================================


// ==========================================
// MODAL
// ==========================================

const modal =
    document.getElementById("medicineModal");

const openModal =
    document.getElementById("openMedicineModal");

const closeModal =
    document.getElementById("closeMedicineModal");

const cancelModal =
    document.getElementById("cancelMedicine");


function showModal() {

    modal.classList.add("show");

}


function hideModal() {

    modal.classList.remove("show");

}


openModal.addEventListener(
    "click",
    showModal
);


closeModal.addEventListener(
    "click",
    hideModal
);


cancelModal.addEventListener(
    "click",
    hideModal
);


// Close when clicking outside

modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            hideModal();

        }

    }
);


// ==========================================
// ADD MEDICINE
// ==========================================

const medicineForm =
    document.getElementById("medicineForm");


medicineForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "medicineName"
            ).value.trim();

        const dosage =
            document.getElementById(
                "medicineDosage"
            ).value.trim();

        const frequency =
            document.getElementById(
                "medicineFrequency"
            ).value;

        const time =
            document.getElementById(
                "medicineTime"
            ).value;

        const startDate =
            document.getElementById(
                "startDate"
            ).value;

        const endDate =
            document.getElementById(
                "endDate"
            ).value;


        if (
            !name ||
            !dosage ||
            !frequency ||
            !time ||
            !startDate ||
            !endDate
        ) {

            alert(
                "Please fill in all required fields."
            );

            return;

        }


        // Convert time

        let displayTime =
            convertTime(time);


        // Convert dates

        const formattedStart =
            formatDate(startDate);

        const formattedEnd =
            formatDate(endDate);


        // Create medicine card

        const medicineCard =
            document.createElement("div");

        medicineCard.className =
            "medicine-card";

        medicineCard.dataset.status =
            "pending";

        medicineCard.dataset.name =
            name.toLowerCase();


        medicineCard.innerHTML = `

            <div class="medicine-card-header">

                <div class="medicine-main-icon blue-bg">

                    <i class="bi bi-capsule"></i>

                </div>

                <div class="medicine-actions">

                    <button
                        class="icon-btn edit-btn"
                    >
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button
                        class="icon-btn delete-btn"
                    >
                        <i class="bi bi-trash3"></i>
                    </button>

                </div>

            </div>


            <h3>${name}</h3>

            <p class="medicine-description">
                Medication
            </p>


            <div class="medicine-details">

                <div>

                    <i class="bi bi-capsule"></i>

                    <span>
                        ${dosage}
                    </span>

                </div>


                <div>

                    <i class="bi bi-arrow-repeat"></i>

                    <span>
                        ${frequency}
                    </span>

                </div>


                <div>

                    <i class="bi bi-calendar3"></i>

                    <span>
                        ${formattedStart}
                        –
                        ${formattedEnd}
                    </span>

                </div>

            </div>


            <div class="medicine-card-footer">

                <div class="reminder">

                    <i class="bi bi-alarm"></i>

                    <strong>
                        ${displayTime}
                    </strong>

                </div>


                <button
                    class="status pending mark-taken"
                >

                    <i class="bi bi-circle"></i>

                    Mark Taken

                </button>

            </div>

        `;


        document
            .getElementById("medicineList")
            .appendChild(medicineCard);


        // Reset form

        medicineForm.reset();


        hideModal();


        attachMedicineEvents();


        updateStatistics();


        alert(
            `${name} has been added successfully.`
        );

    }
);


// ==========================================
// MARK MEDICINE AS TAKEN
// ==========================================

function attachTakenEvents() {

    const buttons =
        document.querySelectorAll(
            ".mark-taken"
        );


    buttons.forEach(
        function(button) {

            button.onclick = function() {

                const card =
                    button.closest(
                        ".medicine-card"
                    );


                if (
                    card.dataset.status === "taken"
                ) {

                    return;

                }


                card.dataset.status =
                    "taken";


                button.classList.remove(
                    "pending"
                );

                button.classList.add(
                    "taken"
                );


                button.innerHTML = `

                    <i class="bi bi-check-circle-fill"></i>

                    Taken

                `;


                updateStatistics();

            };

        }
    );

}


// ==========================================
// DELETE MEDICINE
// ==========================================

function attachDeleteEvents() {

    const buttons =
        document.querySelectorAll(
            ".delete-btn"
        );


    buttons.forEach(
        function(button) {

            button.onclick = function() {

                const card =
                    button.closest(
                        ".medicine-card"
                    );


                const medicineName =
                    card.querySelector(
                        "h3"
                    ).textContent;


                const confirmed =
                    confirm(
                        `Delete ${medicineName}?`
                    );


                if (confirmed) {

                    card.remove();

                    updateStatistics();

                }

            };

        }
    );

}


// ==========================================
// EDIT BUTTON
// ==========================================

function attachEditEvents() {

    const buttons =
        document.querySelectorAll(
            ".edit-btn"
        );


    buttons.forEach(
        function(button) {

            button.onclick = function() {

                const card =
                    button.closest(
                        ".medicine-card"
                    );


                const medicineName =
                    card.querySelector(
                        "h3"
                    ).textContent;


                alert(
                    `Edit feature for ${medicineName} will be connected to the backend later.`
                );

            };

        }
    );

}


// ==========================================
// SEARCH
// ==========================================

const searchInput =
    document.getElementById(
        "medicineSearch"
    );


searchInput.addEventListener(
    "input",
    function() {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();


        const cards =
            document.querySelectorAll(
                ".medicine-card"
            );


        cards.forEach(
            function(card) {

                const name =
                    card.dataset.name ||
                    card
                        .querySelector("h3")
                        .textContent
                        .toLowerCase();


                if (
                    name.includes(search)
                ) {

                    card.style.display =
                        "block";

                }

                else {

                    card.style.display =
                        "none";

                }

            }
        );

    }
);


// ==========================================
// FILTER
// ==========================================

const filter =
    document.getElementById(
        "medicineFilter"
    );


filter.addEventListener(
    "change",
    function() {

        const selected =
            filter.value;


        const cards =
            document.querySelectorAll(
                ".medicine-card"
            );


        cards.forEach(
            function(card) {

                const status =
                    card.dataset.status;


                if (
                    selected === "all" ||
                    selected === status
                ) {

                    card.style.display =
                        "block";

                }

                else {

                    card.style.display =
                        "none";

                }

            }
        );

    }
);


// ==========================================
// STATISTICS
// ==========================================

function updateStatistics() {

    const cards =
        document.querySelectorAll(
            ".medicine-card"
        );


    let taken = 0;

    let pending = 0;


    cards.forEach(
        function(card) {

            if (
                card.dataset.status ===
                "taken"
            ) {

                taken++;

            }

            else {

                pending++;

            }

        }
    );


    document.getElementById(
        "totalMedicines"
    ).textContent =
        cards.length;


    document.getElementById(
        "takenMedicines"
    ).textContent =
        taken;


    document.getElementById(
        "pendingMedicines"
    ).textContent =
        pending;

}


// ==========================================
// TIME FORMAT
// ==========================================

function convertTime(time) {

    const [hours, minutes] =
        time.split(":");


    const date =
        new Date();


    date.setHours(
        Number(hours)
    );

    date.setMinutes(
        Number(minutes)
    );


    return date.toLocaleTimeString(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );

}


// ==========================================
// DATE FORMAT
// ==========================================

function formatDate(dateString) {

    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short"
        }
    );

}


// ==========================================
// INITIALIZE EVENTS
// ==========================================

function attachMedicineEvents() {

    attachTakenEvents();

    attachDeleteEvents();

    attachEditEvents();

}


attachMedicineEvents();

updateStatistics();