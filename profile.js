// ==========================================
// PROFILE PAGE
// ==========================================

const editProfileBtn =
    document.getElementById("editProfileBtn");

const cancelEdit =
    document.getElementById("cancelEdit");

const profileActions =
    document.getElementById("profileActions");

const profileForm =
    document.getElementById("profileForm");


// All editable fields

const editableFields = [

    "fullName",
    "email",
    "phone",
    "dob",
    "gender",
    "bloodGroup",
    "address"

];


// Store original values

let originalValues = {};


// ==========================================
// ENABLE EDIT MODE
// ==========================================

editProfileBtn.addEventListener(
    "click",
    function() {

        originalValues = {};

        editableFields.forEach(
            function(id) {

                const field =
                    document.getElementById(id);

                originalValues[id] =
                    field.value;

                field.disabled = false;

            }
        );


        profileActions.classList.add(
            "show"
        );


        editProfileBtn.style.display =
            "none";

    }
);


// ==========================================
// CANCEL EDIT
// ==========================================

cancelEdit.addEventListener(
    "click",
    function() {

        editableFields.forEach(
            function(id) {

                const field =
                    document.getElementById(id);

                field.value =
                    originalValues[id];

                field.disabled = true;

            }
        );


        profileActions.classList.remove(
            "show"
        );


        editProfileBtn.style.display =
            "inline-flex";

    }
);


// ==========================================
// SAVE PROFILE
// ==========================================

profileForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document
                .getElementById("fullName")
                .value
                .trim();


        if (!name) {

            alert(
                "Please enter your name."
            );

            return;

        }


        // Update displayed name

        document.getElementById(
            "displayName"
        ).textContent = name;


        // Disable fields

        editableFields.forEach(
            function(id) {

                document.getElementById(
                    id
                ).disabled = true;

            }
        );


        profileActions.classList.remove(
            "show"
        );


        editProfileBtn.style.display =
            "inline-flex";


        alert(
            "Profile updated successfully!"
        );


        /*
            LATER:

            Replace the alert above with:

            fetch("/api/profile", {
                method: "PUT",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: ...,
                    phone: ...
                })
            });

            This will connect the frontend
            to your backend API.
        */

    }
);


// ==========================================
// PROFILE PHOTO
// ==========================================

const changeAvatarBtn =
    document.getElementById(
        "changeAvatarBtn"
    );

const avatarInput =
    document.getElementById(
        "avatarInput"
    );


changeAvatarBtn.addEventListener(
    "click",
    function() {

        avatarInput.click();

    }
);


avatarInput.addEventListener(
    "change",
    function() {

        const file =
            this.files[0];

        if (!file) {
            return;
        }


        if (!file.type.startsWith("image/")) {

            alert(
                "Please select an image file."
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function(event) {

                const avatar =
                    document.querySelector(
                        ".profile-avatar-large"
                    );


                avatar.style.backgroundImage =
                    `url(${event.target.result})`;

                avatar.style.backgroundSize =
                    "cover";

                avatar.style.backgroundPosition =
                    "center";

                avatar.style.color =
                    "transparent";

            };


        reader.readAsDataURL(file);

    }
);