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

        if (auth.role !== "PM"){
            document.getElementById(`nav-button-0`).classList.add("hidden")
            document.getElementById(`nav-button-3`).classList.add("hidden")
        }
        // for (let i = 0; i < 4; i++) {
            
        // }
        if (auth.role === "PM") {
            this.innerHTML = `<logged-in class='container' name="Logged in"></logged-in>`;
        } else if (auth.role === "TM") {
            location.hash = "reports";
        }
    }
}