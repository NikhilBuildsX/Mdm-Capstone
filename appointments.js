// ==========================================
// APPOINTMENTS
// ==========================================


const appointmentModal =
    document.getElementById(
        "appointmentModal"
    );

const openAppointmentModal =
    document.getElementById(
        "openAppointmentModal"
    );

const closeAppointmentModal =
    document.getElementById(
        "closeAppointmentModal"
    );

const cancelAppointment =
    document.getElementById(
        "cancelAppointment"
    );


function showAppointmentModal() {

    appointmentModal.classList.add("show");

}


function hideAppointmentModal() {

    appointmentModal.classList.remove("show");

}


openAppointmentModal.addEventListener(
    "click",
    showAppointmentModal
);


closeAppointmentModal.addEventListener(
    "click",
    hideAppointmentModal
);


cancelAppointment.addEventListener(
    "click",
    hideAppointmentModal
);


appointmentModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            appointmentModal
        ) {

            hideAppointmentModal();

        }

    }
);


// ==========================================
// BOOK APPOINTMENT
// ==========================================

const appointmentForm =
    document.getElementById(
        "appointmentForm"
    );


appointmentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const doctor =
            document.getElementById(
                "doctorName"
            ).value.trim();

        const specialization =
            document.getElementById(
                "specialization"
            ).value.trim();

        const date =
            document.getElementById(
                "appointmentDate"
            ).value;

        const time =
            document.getElementById(
                "appointmentTime"
            ).value;

        const clinic =
            document.getElementById(
                "clinic"
            ).value.trim();


        if (
            !doctor ||
            !specialization ||
            !date ||
            !time ||
            !clinic
        ) {

            alert(
                "Please fill in all required fields."
            );

            return;

        }


        const formattedDate =
            formatDate(date);

        const formattedTime =
            convertTime(time);


        const appointmentCard =
            document.createElement("div");


        appointmentCard.className =
            "appointment-card";


        appointmentCard.dataset.status =
            "upcoming";


        appointmentCard.dataset.search =
            (
                doctor +
                " " +
                specialization
            ).toLowerCase();


        appointmentCard.innerHTML = `

            <div class="doctor-section">

                <div class="doctor-avatar">

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


            <div class="appointment-info">

                <div>

                    <i class="bi bi-calendar3"></i>

                    <span>
                        ${formattedDate}
                    </span>

                </div>


                <div>

                    <i class="bi bi-clock"></i>

                    <span>
                        ${formattedTime}
                    </span>

                </div>


                <div>

                    <i class="bi bi-geo-alt"></i>

                    <span>
                        ${clinic}
                    </span>

                </div>

            </div>


            <div class="appointment-right">

                <span
                    class="appointment-status upcoming"
                >
                    Upcoming
                </span>


                <button
                    class="appointment-menu"
                >

                    <i class="bi bi-three-dots-vertical"></i>

                </button>

            </div>

        `;


        document
            .getElementById(
                "appointmentList"
            )
            .appendChild(
                appointmentCard
            );


        appointmentForm.reset();


        hideAppointmentModal();


        updateAppointmentStats();


        alert(
            "Appointment booked successfully!"
        );

    }
);


// ==========================================
// SEARCH
// ==========================================

const appointmentSearch =
    document.getElementById(
        "appointmentSearch"
    );


appointmentSearch.addEventListener(
    "input",
    function() {

        const search =
            appointmentSearch.value
                .toLowerCase()
                .trim();


        const cards =
            document.querySelectorAll(
                ".appointment-card"
            );


        cards.forEach(
            function(card) {

                const data =
                    card.dataset.search;


                if (
                    data.includes(search)
                ) {

                    card.style.display =
                        "grid";

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

const appointmentFilter =
    document.getElementById(
        "appointmentFilter"
    );


appointmentFilter.addEventListener(
    "change",
    function() {

        const selected =
            appointmentFilter.value;


        const cards =
            document.querySelectorAll(
                ".appointment-card"
            );


        cards.forEach(
            function(card) {

                if (
                    selected === "all" ||
                    card.dataset.status ===
                    selected
                ) {

                    card.style.display =
                        "grid";

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

function updateAppointmentStats() {

    const cards =
        document.querySelectorAll(
            ".appointment-card"
        );


    let upcoming = 0;

    let completed = 0;

    let cancelled = 0;


    cards.forEach(
        function(card) {

            const status =
                card.dataset.status;


            if (
                status === "upcoming"
            ) {

                upcoming++;

            }

            else if (
                status === "completed"
            ) {

                completed++;

            }

            else if (
                status === "cancelled"
            ) {

                cancelled++;

            }

        }
    );


    document.getElementById(
        "upcomingCount"
    ).textContent = upcoming;


    document.getElementById(
        "completedCount"
    ).textContent = completed;


    document.getElementById(
        "cancelledCount"
    ).textContent = cancelled;

}


// ==========================================
// DATE
// ==========================================

function formatDate(dateString) {

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
// TIME
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


updateAppointmentStats();