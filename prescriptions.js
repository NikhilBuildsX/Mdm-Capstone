// ==========================================
// PRESCRIPTIONS
// ==========================================

const prescriptionModal =
    document.getElementById("prescriptionModal");

const openPrescriptionModal =
    document.getElementById("openPrescriptionModal");

const closePrescriptionModal =
    document.getElementById("closePrescriptionModal");

const cancelPrescription =
    document.getElementById("cancelPrescription");


// ==========================================
// OPEN / CLOSE ADD MODAL
// ==========================================

function showPrescriptionModal() {

    prescriptionModal.classList.add("show");

}


function hidePrescriptionModal() {

    prescriptionModal.classList.remove("show");

}


openPrescriptionModal.addEventListener(
    "click",
    showPrescriptionModal
);


closePrescriptionModal.addEventListener(
    "click",
    hidePrescriptionModal
);


cancelPrescription.addEventListener(
    "click",
    hidePrescriptionModal
);


prescriptionModal.addEventListener(
    "click",
    function(event) {

        if (event.target === prescriptionModal) {
            hidePrescriptionModal();
        }

    }
);


// ==========================================
// ADD PRESCRIPTION
// ==========================================

const prescriptionForm =
    document.getElementById("prescriptionForm");


prescriptionForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const doctor =
            document
                .getElementById("prescriptionDoctor")
                .value
                .trim();


        const specialization =
            document
                .getElementById("prescriptionSpecialization")
                .value
                .trim();


        const date =
            document
                .getElementById("prescriptionDate")
                .value;


        const diagnosis =
            document
                .getElementById("prescriptionDiagnosis")
                .value
                .trim();


        const medicinesText =
            document
                .getElementById("prescriptionMedicines")
                .value
                .trim();


        const notes =
            document
                .getElementById("prescriptionNotes")
                .value
                .trim();


        if (
            !doctor ||
            !specialization ||
            !date ||
            !diagnosis ||
            !medicinesText
        ) {

            alert(
                "Please fill in all required fields."
            );

            return;

        }


        const medicines =
            medicinesText
                .split("\n")
                .map(item => item.trim())
                .filter(item => item.length > 0);


        const formattedDate =
            formatPrescriptionDate(date);


        const card =
            document.createElement("div");


        card.className =
            "prescription-card";


        card.dataset.status =
            "active";


        card.dataset.search =
            (
                doctor +
                " " +
                specialization +
                " " +
                diagnosis +
                " " +
                medicinesText
            ).toLowerCase();


        let medicineHTML = "";


        medicines.forEach(
            function(medicine) {

                medicineHTML += `

                    <span>
                        <i class="bi bi-capsule"></i>
                        ${medicine}
                    </span>

                `;

            }
        );


        card.innerHTML = `

            <div class="prescription-card-top">

                <div class="prescription-doctor">

                    <div class="prescription-doctor-icon">
                        <i class="bi bi-person"></i>
                    </div>

                    <div>

                        <h3>
                            ${doctor}
                        </h3>

                        <p>
                            ${specialization}
                        </p>

                    </div>

                </div>


                <span class="prescription-status active">
                    Active
                </span>

            </div>


            <div class="prescription-details">

                <div>

                    <span>Prescription Date</span>

                    <strong>
                        ${formattedDate}
                    </strong>

                </div>


                <div>

                    <span>Diagnosis</span>

                    <strong>
                        ${diagnosis}
                    </strong>

                </div>


                <div>

                    <span>Medicines</span>

                    <strong>
                        ${medicines.length} Medicine${medicines.length > 1 ? "s" : ""}
                    </strong>

                </div>

            </div>


            <div class="medicine-preview">

                ${medicineHTML}

            </div>


            <div class="prescription-actions">

                <button class="view-prescription-btn">

                    <i class="bi bi-eye"></i>

                    View Prescription

                </button>


                <button class="print-prescription-btn">

                    <i class="bi bi-printer"></i>

                </button>

            </div>

        `;


        document
            .getElementById("prescriptionList")
            .prepend(card);


        prescriptionForm.reset();


        hidePrescriptionModal();


        updatePrescriptionStats();


        attachCardEvents();


        alert(
            "Prescription added successfully!"
        );

    }
);


// ==========================================
// SEARCH
// ==========================================

const prescriptionSearch =
    document.getElementById("prescriptionSearch");


prescriptionSearch.addEventListener(
    "input",
    filterPrescriptions
);


// ==========================================
// FILTER
// ==========================================

const prescriptionFilter =
    document.getElementById("prescriptionFilter");


prescriptionFilter.addEventListener(
    "change",
    filterPrescriptions
);


function filterPrescriptions() {

    const search =
        prescriptionSearch
            .value
            .toLowerCase()
            .trim();


    const filter =
        prescriptionFilter.value;


    const cards =
        document.querySelectorAll(
            ".prescription-card"
        );


    cards.forEach(
        function(card) {

            const cardSearch =
                card.dataset.search || "";


            const cardStatus =
                card.dataset.status;


            const matchesSearch =
                cardSearch.includes(search);


            const matchesFilter =
                filter === "all" ||
                cardStatus === filter;


            if (
                matchesSearch &&
                matchesFilter
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


// ==========================================
// STATISTICS
// ==========================================

function updatePrescriptionStats() {

    const cards =
        document.querySelectorAll(
            ".prescription-card"
        );


    let active = 0;

    let medicines = 0;


    cards.forEach(
        function(card) {

            if (
                card.dataset.status ===
                "active"
            ) {

                active++;

            }


            const medicineText =
                card.querySelector(
                    ".prescription-details div:nth-child(3) strong"
                );


            if (medicineText) {

                const number =
                    parseInt(
                        medicineText.textContent
                    );


                if (!isNaN(number)) {

                    medicines += number;

                }

            }

        }
    );


    document.getElementById(
        "totalPrescriptionCount"
    ).textContent = cards.length;


    document.getElementById(
        "activePrescriptionCount"
    ).textContent = active;


    document.getElementById(
        "medicineCount"
    ).textContent = medicines;

}


// ==========================================
// VIEW PRESCRIPTION
// ==========================================

function attachCardEvents() {

    const buttons =
        document.querySelectorAll(
            ".view-prescription-btn"
        );


    buttons.forEach(
        function(button) {

            button.onclick = function() {

                const card =
                    button.closest(
                        ".prescription-card"
                    );


                showPrescriptionDetails(card);

            };

        }
    );


    const printButtons =
        document.querySelectorAll(
            ".print-prescription-btn"
        );


    printButtons.forEach(
        function(button) {

            button.onclick = function() {

                window.print();

            };

        }
    );

}


function showPrescriptionDetails(card) {

    const doctor =
        card.querySelector(
            ".prescription-doctor h3"
        ).textContent.trim();


    const specialization =
        card.querySelector(
            ".prescription-doctor p"
        ).textContent.trim();


    const details =
        card.querySelectorAll(
            ".prescription-details div"
        );


    const date =
        details[0]
            .querySelector("strong")
            .textContent.trim();


    const diagnosis =
        details[1]
            .querySelector("strong")
            .textContent.trim();


    const medicineElements =
        card.querySelectorAll(
            ".medicine-preview span"
        );


    let medicinesHTML = "";


    medicineElements.forEach(
        function(medicine) {

            medicinesHTML += `

                <div class="view-medicine">

                    <span>
                        ${medicine.textContent.trim()}
                    </span>

                    <i class="bi bi-capsule"></i>

                </div>

            `;

        }
    );


    document.getElementById(
        "prescriptionViewContent"
    ).innerHTML = `

        <div class="prescription-view-content">

            <div class="view-section">

                <h4>DOCTOR</h4>

                <p>
                    <strong>${doctor}</strong><br>
                    ${specialization}
                </p>

            </div>


            <div class="view-section">

                <h4>PRESCRIPTION DATE</h4>

                <p>
                    ${date}
                </p>

            </div>


            <div class="view-section">

                <h4>DIAGNOSIS</h4>

                <p>
                    ${diagnosis}
                </p>

            </div>


            <div class="view-section">

                <h4>MEDICINES</h4>

                ${medicinesHTML}

            </div>

        </div>

    `;


    document
        .getElementById(
            "viewPrescriptionModal"
        )
        .classList.add("show");

}


// ==========================================
// CLOSE VIEW MODAL
// ==========================================

document
    .getElementById("closeViewModal")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "viewPrescriptionModal"
                )
                .classList.remove("show");

        }
    );


document
    .getElementById("viewPrescriptionModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                this
            ) {

                this.classList.remove(
                    "show"
                );

            }

        }
    );


// ==========================================
// DATE FORMAT
// ==========================================

function formatPrescriptionDate(
    dateString
) {

    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ==========================================
// INITIALIZE
// ==========================================

attachCardEvents();

updatePrescriptionStats();