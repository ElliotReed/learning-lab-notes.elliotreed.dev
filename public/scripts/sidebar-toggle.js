const siteContainer = document.querySelector("[data-site-container]");
const button = document.querySelector("[data-opener]");
const icon = document.getElementById("toggle-icon");

function toggleFunction(e) {
    console.log('here');
    if (e.target === button) {
        siteContainer.classList.toggle("opened");
    } else {
        siteContainer.classList.remove("opened");
    }

    if (siteContainer.classList.contains("opened")) {
        icon?.setAttribute("data-icon", "tabler:chevron-left");
    } else {
        icon?.setAttribute("data-icon", "tabler:chevron-right");
    }
}
document.addEventListener("click", toggleFunction);