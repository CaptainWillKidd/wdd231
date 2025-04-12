document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;

    const lastModified = document.lastModified;
    document.getElementById("lastmodified").textContent = `Last Modified: ${lastModified}`;

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navigation");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });
});