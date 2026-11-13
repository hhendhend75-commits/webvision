// MOBILE MENU
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navigation.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// CURRENT YEAR
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// REGISTRATION -> SEND EMAIL -> WELCOME SCREEN
const registrationForm = document.getElementById("registrationForm");
const welcomeScreen = document.getElementById("welcomeScreen");
const backHome = document.getElementById("backHome");

if (registrationForm && welcomeScreen) {
    registrationForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = registrationForm.querySelector('[type="submit"]');
        const originalText = submitButton ? submitButton.textContent : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        try {
            const formData = new FormData(registrationForm);
            // Collect all selected interests
const interests = [];

registrationForm.querySelectorAll(
    'input[name="interests"]:checked'
).forEach(function (checkbox) {
    interests.push(checkbox.value);
});

formData.set("interests", interests.join(", "));

            // Web3Forms Access Key
            formData.append("access_key", "d0c092a6-0a73-4c0f-aec4-b00fc2df5940");

            // Email subject
            formData.append("subject", "New WebVision Club Registration");

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            console.log("Web3Forms response:", result);

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Email sending failed");
            }

            // Show welcome screen only after successful sending
            welcomeScreen.classList.add("is-visible");
            welcomeScreen.setAttribute("aria-hidden", "false");
            document.body.classList.add("welcome-open");

            registrationForm.reset();

        } catch (error) {
            alert("Erreur d'envoi ! Vérifie ta connexion et réessaie.");
            console.error(error);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }
    });
}

// BACK TO THE WEBSITE
if (backHome && welcomeScreen) {
    backHome.addEventListener("click", function () {
        welcomeScreen.classList.remove("is-visible");
        welcomeScreen.setAttribute("aria-hidden", "true");
        document.body.classList.remove("welcome-open");

        const homeSection = document.getElementById("home");
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: "smooth" });
        }
    });
}