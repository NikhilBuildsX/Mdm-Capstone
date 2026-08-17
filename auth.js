// ==========================================
// SMART HEALTHCARE COMPANION
// Authentication JavaScript
// ==========================================


// ------------------------------------------
// LOGIN
// ------------------------------------------

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value.trim();


        if (!email || !password) {

            alert("Please enter your email and password.");

            return;
        }


        // Demo authentication

        alert("Login successful!");


        // Redirect to dashboard

        window.location.href = "index.html";

    });

}


// ------------------------------------------
// REGISTER
// ------------------------------------------

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const password =
            document.getElementById("registerPassword").value.trim();

        const terms =
            document.getElementById("terms").checked;


        if (
            !name ||
            !email ||
            !phone ||
            !password
        ) {

            alert("Please fill in all fields.");

            return;
        }


        if (!terms) {

            alert(
                "Please agree to the Terms & Privacy Policy."
            );

            return;
        }


        // Demo registration

        alert(
            "Account created successfully!\n\n" +
            "Welcome to Smart Healthcare Companion."
        );


        // Redirect to login

        window.location.href = "login.html";

    });

}


// ------------------------------------------
// LOGIN PASSWORD TOGGLE
// ------------------------------------------

const togglePassword =
    document.getElementById("togglePassword");


if (togglePassword) {

    togglePassword.addEventListener("click", function() {

        const password =
            document.getElementById("password");

        const icon =
            this.querySelector("i");


        if (password.type === "password") {

            password.type = "text";

            icon.classList.remove("bi-eye");

            icon.classList.add("bi-eye-slash");

        }

        else {

            password.type = "password";

            icon.classList.remove("bi-eye-slash");

            icon.classList.add("bi-eye");

        }

    });

}


// ------------------------------------------
// REGISTER PASSWORD TOGGLE
// ------------------------------------------

const toggleRegisterPassword =
    document.getElementById(
        "toggleRegisterPassword"
    );


if (toggleRegisterPassword) {

    toggleRegisterPassword.addEventListener(
        "click",
        function() {

            const password =
                document.getElementById(
                    "registerPassword"
                );

            const icon =
                this.querySelector("i");


            if (password.type === "password") {

                password.type = "text";

                icon.classList.remove("bi-eye");

                icon.classList.add("bi-eye-slash");

            }

            else {

                password.type = "password";

                icon.classList.remove("bi-eye-slash");

                icon.classList.add("bi-eye");

            }

        }
    );

}