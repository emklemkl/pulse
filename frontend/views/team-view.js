import auth from "../models/auth.js"
export default class TeamView extends HTMLElement {

    // connect component
    connectedCallback() {
        console.log("asdsaddsads",auth.token);
        // if (!auth.token) {
        //     location.hash = "";
        // }
        // Remove the hidden-class from navbar when logged in
        const nav = document.getElementsByTagName("navigation-outlet")[0];
        nav.classList.remove("hidden");
        if (auth.token) {
            this.innerHTML = `<show-team class='container' name="Logged in"></show-team>`;
        } else if (auth.token === "TM") {
            location.hash = "test";
        }
    }
}