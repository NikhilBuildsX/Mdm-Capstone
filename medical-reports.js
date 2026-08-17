// ==========================================
// MEDICAL REPORTS
// ==========================================

const reportModal =
    document.getElementById("reportModal");

const openReportModal =
    document.getElementById("openReportModal");

const closeReportModal =
    document.getElementById("closeReportModal");

const cancelReport =
    document.getElementById("cancelReport");


// ==========================================
// OPEN / CLOSE MODAL
// ==========================================

function showReportModal() {

    reportModal.classList.add("show");

}

function hideReportModal() {

    reportModal.classList.remove("show");

}


openReportModal.addEventListener(
    "click",
    showReportModal
);


closeReportModal.addEventListener(
    "click",
    hideReportModal
);


cancelReport.addEventListener(
    "click",
    hideReportModal
);


reportModal.addEventListener(
    "click",
    function(event) {

        if (event.target === reportModal) {

            hideReportModal();

        }

    }
);


// ==========================================
// FILE UPLOAD
// ==========================================

const reportFile =
    document.getElementById("reportFile");

const chooseFileBtn =
    document.getElementById("chooseFileBtn");

const selectedFile =
    document.getElementById("selectedFile");

const uploadArea =
    document.getElementById("uploadArea");


chooseFileBtn.addEventListener(
    "click",
    function() {

        reportFile.click();

    }
);


reportFile.addEventListener(
    "change",
    function() {

        if (this.files.length > 0) {

            const file = this.files[0];

            selectedFile.innerHTML = `

                <i class="bi bi-check-circle-fill"></i>

                ${file.name}

            `;

        }

    }
);


// ==========================================
// DRAG & DROP
// ==========================================

uploadArea.addEventListener(
    "dragover",
    function(event) {

        event.preventDefault();

        uploadArea.classList.add("dragging");

    }
);


uploadArea.addEventListener(
    "dragleave",
    function() {

        uploadArea.classList.remove("dragging");

    }
);


uploadArea.addEventListener(
    "drop",
    function(event) {

        event.preventDefault();

        uploadArea.classList.remove("dragging");

        if (event.dataTransfer.files.length > 0) {

            reportFile.files =
                event.dataTransfer.files;

            const file =
                event.dataTransfer.files[0];

            selectedFile.innerHTML = `

                <i class="bi bi-check-circle-fill"></i>

                ${file.name}

            `;

        }

    }
);


// ==========================================
// ADD REPORT
// ==========================================

const reportForm =
    document.getElementById("reportForm");


reportForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const file =
            reportFile.files[0];


        const name =
            document
                .getElementById("reportName")
                .value
                .trim();


        const type =
            document
                .getElementById("reportType")
                .value;


        const date =
            document
                .getElementById("reportDate")
                .value;


        const provider =
            document
                .getElementById("reportProvider")
                .value
                .trim();


        const notes =
            document
                .getElementById("reportNotes")
                .value
                .trim();


        if (!name || !type || !date) {

            alert(
                "Please fill in all required fields."
            );

            return;

        }


        const formattedDate =
            formatReportDate(date);


        const typeName =
            getReportTypeName(type);


        const card =
            document.createElement("div");


        card.className =
            "report-card";


        card.dataset.type =
            type;


        card.dataset.search =
            (
                name +
                " " +
                typeName +
                " " +
                provider
            ).toLowerCase();


        const iconClass =
            getReportIcon(type);


        const typeClass =
            type + "-type";


        card.innerHTML = `

            <div class="report-card-header">

                <div class="report-file-icon ${type}">
                    <i class="bi ${iconClass}"></i>
                </div>

                <button class="report-menu">

                    <i class="bi bi-three-dots-vertical"></i>

                </button>

            </div>


            <div class="report-card-body">

                <h3>
                    ${name}
                </h3>

                <p>
                    ${typeName}
                </p>


                <div class="report-meta">

                    <span>

                        <i class="bi bi-calendar3"></i>

                        ${formattedDate}

                    </span>


                    <span>

                        <i class="bi bi-hospital"></i>

                        ${provider || "Not specified"}

                    </span>

                </div>

            </div>


            <div class="report-card-footer">

                <span class="report-type ${typeClass}">

                    ${typeName}

                </span>


                <button class="view-report-btn">

                    <i class="bi bi-eye"></i>

                    View

                </button>

            </div>

        `;


        document
            .getElementById("reportsGrid")
            .prepend(card);


        reportForm.reset();

        selectedFile.innerHTML = "";


        hideReportModal();


        updateReportStats();

        attachReportEvents();


        alert(
            "Medical report added successfully!"
        );

    }
);


// ==========================================
// SEARCH
// ==========================================

const reportSearch =
    document.getElementById("reportSearch");


reportSearch.addEventListener(
    "input",
    filterReports
);


// ==========================================
// FILTER
// ==========================================

const reportFilter =
    document.getElementById("reportFilter");


reportFilter.addEventListener(
    "change",
    filterReports
);


function filterReports() {

    const search =
        reportSearch
            .value
            .toLowerCase()
            .trim();


    const filter =
        reportFilter.value;


    const cards =
        document.querySelectorAll(
            ".report-card"
        );


    cards.forEach(
        function(card) {

            const cardSearch =
                card.dataset.search || "";


            const cardType =
                card.dataset.type;


            const matchesSearch =
                cardSearch.includes(search);


            const matchesFilter =
                filter === "all" ||
                cardType === filter;


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

function updateReportStats() {

    const cards =
        document.querySelectorAll(
            ".report-card"
        );


    let labReports = 0;


    cards.forEach(
        function(card) {

            if (
                card.dataset.type ===
                "lab"
            ) {

                labReports++;

            }

        }
    );


    document.getElementById(
        "totalReportCount"
    ).textContent =
        cards.length;


    document.getElementById(
        "labReportCount"
    ).textContent =
        labReports;

}


// ==========================================
// VIEW REPORT
// ==========================================

function attachReportEvents() {

    const buttons =
        document.querySelectorAll(
            ".view-report-btn"
        );


    buttons.forEach(
        function(button) {

            button.onclick =
                function() {

                    const card =
                        button.closest(
                            ".report-card"
                        );


                    showReportDetails(card);

                };

        }
    );

}


function showReportDetails(card) {

    const title =
        card.querySelector(
            ".report-card-body h3"
        ).textContent.trim();


    const description =
        card.querySelector(
            ".report-card-body p"
        ).textContent.trim();


    const meta =
        card.querySelectorAll(
            ".report-meta span"
        );


    const date =
        meta[0]
            .textContent
            .trim();


    const provider =
        meta[1]
            .textContent
            .trim();


    const type =
        card.querySelector(
            ".report-type"
        ).textContent.trim();


    document.getElementById(
        "reportViewContent"
    ).innerHTML = `

        <div class="report-view-section">

            <div class="file-preview">

                <i class="bi bi-file-earmark-medical"></i>

                <div>

                    <strong>
                        ${title}
                    </strong>

                    <p>
                        ${type}
                    </p>

                </div>

            </div>

        </div>


        <div class="report-view-section">

            <h4>
                Report Name
            </h4>

            <p>
                ${title}
            </p>

        </div>


        <div class="report-view-section">

            <h4>
                Report Type
            </h4>

            <p>
                ${description}
            </p>

        </div>


        <div class="report-view-section">

            <h4>
                Date
            </h4>

            <p>
                ${date}
            </p>

        </div>


        <div class="report-view-section">

            <h4>
                Hospital / Doctor
            </h4>

            <p>
                ${provider}
            </p>

        </div>


        <button
            class="primary-btn"
            onclick="alert('File preview will be connected to Cloud Storage later.')"
        >

            <i class="bi bi-eye"></i>

            Open Document

        </button>

    `;


    document
        .getElementById(
            "viewReportModal"
        )
        .classList.add("show");

}


// ==========================================
// CLOSE VIEW MODAL
// ==========================================

document
    .getElementById("closeViewReport")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "viewReportModal"
                )
                .classList.remove("show");

        }
    );


document
    .getElementById("viewReportModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                this.classList.remove(
                    "show"
                );

            }

        }
    );


// ==========================================
// HELPERS
// ==========================================

function formatReportDate(dateString) {

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


function getReportTypeName(type) {

    const types = {

        lab: "Lab Report",

        prescription: "Prescription",

        scan: "Scan",

        other: "Other"

    };


    return types[type] || "Other";

}


function getReportIcon(type) {

    const icons = {

        lab: "bi-file-earmark-medical",

        prescription: "bi-file-earmark-text",

        scan: "bi-file-earmark-image",

        other: "bi-file-earmark"

    };


    return icons[type] ||
           "bi-file-earmark";

}


// ==========================================
// INITIALIZE
// ==========================================

attachReportEvents();

updateReportStats();