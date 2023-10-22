import auth from "../models/auth.js"
export default class ProjectsView extends HTMLElement {

    // connect component
    connectedCallback() {
        if (!auth.token) {
            location.hash = "";
        }
        // auth.role = "TM"
        // auth.userId = 1001
        const nav = document.getElementsByTagName("navigation-outlet")[0];
        nav.classList.remove("hidden");
        if (auth.role === "PM") {
            this.innerHTML = `<show-projects class='container'></show-projects>`;
        } else if (auth.role === "TM") {
            this.innerHTML = `<show-tm-projects class='container'></show-tm-projects>`;
        }
    }
}