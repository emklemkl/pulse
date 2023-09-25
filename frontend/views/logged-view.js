import auth from "../models/auth.js"
export default class LoggedInView extends HTMLElement {

    // connect component
    connectedCallback() {
        if (!auth.token) {
            location.hash = "";
        }
        // Remove the hidden-class from navbar when logged in
        const nav = document.getElementsByTagName("navigation-outlet")[0];
        nav.classList.remove("hidden");
        if (auth.token) {
            this.innerHTML = `<logged-in class='container' name="Logged in"></logged-in>`;
        } else if (auth.token === "TM") {
            location.hash = "test";
        }
    }
}