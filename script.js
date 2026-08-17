// ==========================================
// SMART HEALTHCARE COMPANION
// Dashboard JavaScript
// ==========================================


// ------------------------------------------
// Notification Button
// ------------------------------------------

const notificationButton =
    document.querySelector(".notification-btn");

if (notificationButton) {

    notificationButton.addEventListener("click", () => {

        alert(
            "You have 2 notifications:\n\n" +
            "• Medicine reminder at 8:00 PM\n" +
            "• Doctor appointment tomorrow at 4:00 PM"
        );

    });

}


// ------------------------------------------
// Add Record Button
// ------------------------------------------

const addRecordButton =
    document.querySelector(".welcome-section .primary-btn");

if (addRecordButton) {

    addRecordButton.addEventListener("click", () => {

        alert(
            "Add Record feature will be connected to the Medical Reports module."
        );

    });

}


// ------------------------------------------
// Add Medicine Button
// ------------------------------------------

const addMedicineButton =
    document.querySelector(".outline-btn");

if (addMedicineButton) {

    addMedicineButton.addEventListener("click", () => {

        alert(
            "Medicine form will open here.\n\n" +
            "Later this will send the medicine information " +
            "to the backend API."
        );

    });

}


// ------------------------------------------
// AI Health Summary
// ------------------------------------------

const aiButton =
    document.querySelector(".ai-btn");

if (aiButton) {

    aiButton.addEventListener("click", () => {

        aiButton.innerHTML =
            '<i class="bi bi-hourglass-split"></i> Generating...';

        aiButton.disabled = true;


        setTimeout(() => {

            aiButton.innerHTML =
                '<i class="bi bi-stars"></i> Summary Generated';

            alert(
                "AI Health Summary:\n\n" +
                "Your recent health records are ready " +
                "for review.\n\n" +
                "This is currently demo data. " +
                "The AI API will be integrated later."
            );

        }, 1500);

    });

}


// ------------------------------------------
// Medicine Status
// ------------------------------------------

const medicineItems =
    document.querySelectorAll(".medicine-item");

medicineItems.forEach((item) => {

    item.addEventListener("click", () => {

        const medicineName =
            item.querySelector("strong").textContent;

        console.log(
            "Selected medicine:",
            medicineName
        );

    });

});


// ------------------------------------------
// Navigation
// ------------------------------------------

const navigationLinks =
    document.querySelectorAll(".nav-link");

navigationLinks.forEach((link) => {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        navigationLinks.forEach((item) => {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});