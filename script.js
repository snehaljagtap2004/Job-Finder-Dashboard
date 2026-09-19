/* =========================
   JOB FINDER JAVASCRIPT
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       NAVIGATION
    ========================= */

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            console.log(`Opening: ${this.textContent}`);
        });

    });


    /* =========================
       JOB SEARCH
    ========================= */

    const searchForm = document.querySelector("form");

    const jobInput = document.querySelector("#job");
    const locationInput = document.querySelector("#location");
    const jobType = document.querySelector("#job-type");

    const jobCards = document.querySelectorAll(
        "main > section:nth-child(3) > div:first-child > article"
    );


    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const searchText = jobInput.value.toLowerCase().trim();
        const searchLocation = locationInput.value.toLowerCase().trim();
        const selectedType = jobType.value.toLowerCase();

        let foundJobs = 0;

        jobCards.forEach(card => {

            const cardText = card.textContent.toLowerCase();

            const matchesJob =
                searchText === "" ||
                cardText.includes(searchText);

            const matchesLocation =
                searchLocation === "" ||
                cardText.includes(searchLocation);

            let matchesType = true;

            if (selectedType !== "") {

                if (selectedType === "full-time") {
                    matchesType = cardText.includes("full time");
                }

                if (selectedType === "part-time") {
                    matchesType = cardText.includes("part time");
                }

                if (selectedType === "internship") {
                    matchesType = cardText.includes("internship");
                }

                if (selectedType === "remote") {
                    matchesType = cardText.includes("remote");
                }
            }


            if (matchesJob && matchesLocation && matchesType) {

                card.style.display = "block";
                foundJobs++;

            } else {

                card.style.display = "none";

            }

        });


        showSearchResult(foundJobs);

    });


    /* =========================
       SEARCH RESULT MESSAGE
    ========================= */

    function showSearchResult(count) {

        let message = document.querySelector(".search-result");

        if (!message) {

            message = document.createElement("p");

            message.className = "search-result";

            searchForm.parentElement.appendChild(message);

        }

        if (count === 0) {

            message.textContent =
                "No jobs found. Try different keywords or location.";

            message.style.color = "#dc2626";

        } else {

            message.textContent =
                `${count} job${count > 1 ? "s" : ""} found.`;

            message.style.color = "#16a34a";

        }

        message.style.marginTop = "15px";
        message.style.fontWeight = "600";
        message.style.fontSize = "14px";
    }


    /* =========================
       SAVE / UNSAVE JOB
    ========================= */

    const saveButtons = document.querySelectorAll(
        "main > section:nth-child(3) > div:first-child article button:first-of-type"
    );


    saveButtons.forEach(button => {

        button.addEventListener("click", function () {

            const card = this.closest("article");

            const jobTitle =
                card.querySelector("h3").textContent;

            if (this.textContent.trim() === "♡") {

                this.textContent = "♥";
                this.style.color = "#ef4444";

                showNotification(
                    `${jobTitle} saved successfully ❤️`
                );

            } else {

                this.textContent = "♡";
                this.style.color = "";

                showNotification(
                    `${jobTitle} removed from saved jobs`
                );

            }

        });

    });


    /* =========================
       APPLY NOW BUTTON
    ========================= */

    const applyButtons = document.querySelectorAll(
        "main > section:nth-child(3) > div:first-child article > button:last-child"
    );


    applyButtons.forEach(button => {

        button.addEventListener("click", function () {

            const card = this.closest("article");

            const jobTitle =
                card.querySelector("h3").textContent;

            const company =
                card.querySelector("div:first-child p").textContent;

            const confirmApply = confirm(
                `Do you want to apply for ${jobTitle} at ${company}?`
            );


            if (confirmApply) {

                this.textContent = "Applied ✓";
                this.disabled = true;

                this.style.background = "#16a34a";

                showNotification(
                    `Application submitted for ${jobTitle}!`
                );

            }

        });

    });


    /* =========================
       PROFILE EDIT
    ========================= */

    const editProfileButton =
        document.querySelector(
            "aside section:first-child button"
        );


    editProfileButton.addEventListener("click", () => {

        const currentName =
            document.querySelector(
                "aside section:first-child h3"
            ).textContent;

        const newName =
            prompt("Enter your name:", currentName);


        if (newName && newName.trim() !== "") {

            document.querySelector(
                "aside section:first-child h3"
            ).textContent = newName.trim();

            showNotification("Profile updated successfully!");

        }

    });


    /* =========================
       NOTIFICATION BUTTON
    ========================= */

    const notificationButton =
        document.querySelector("header button:first-child");


    notificationButton.addEventListener("click", () => {

        showNotification(
            "You have 3 new job recommendations 🔔"
        );

    });


    /* =========================
       PROFILE BUTTON
    ========================= */

    const profileButton =
        document.querySelector("header button:last-child");


    profileButton.addEventListener("click", () => {

        document.querySelector("aside").scrollIntoView({
            behavior: "smooth"
        });

    });


    /* =========================
       VIEW ALL SAVED JOBS
    ========================= */

    const viewAll =
        document.querySelector(
            "main > section:nth-child(3) > div:first-child > div:first-child a"
        );


    viewAll.addEventListener("click", event => {

        event.preventDefault();

        showNotification("Showing all recommended jobs...");

    });


    /* =========================
       NOTIFICATION FUNCTION
    ========================= */

    function showNotification(message) {

        const notification =
            document.createElement("div");

        notification.textContent = message;

        notification.style.position = "fixed";
        notification.style.bottom = "25px";
        notification.style.right = "25px";
        notification.style.background = "#0f172a";
        notification.style.color = "#ffffff";
        notification.style.padding = "14px 20px";
        notification.style.borderRadius = "10px";
        notification.style.fontSize = "14px";
        notification.style.fontWeight = "500";
        notification.style.zIndex = "9999";
        notification.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.2)";

        notification.style.opacity = "0";
        notification.style.transform = "translateY(20px)";

        document.body.appendChild(notification);


        setTimeout(() => {

            notification.style.transition =
                "all 0.3s ease";

            notification.style.opacity = "1";
            notification.style.transform =
                "translateY(0)";

        }, 10);


        setTimeout(() => {

            notification.style.opacity = "0";
            notification.style.transform =
                "translateY(20px)";

            setTimeout(() => {
                notification.remove();
            }, 300);

        }, 3000);

    }

});