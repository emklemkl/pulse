import auth from "../models/auth.js"
export default class CreateProjectView extends HTMLElement {

    // connect component
    connectedCallback() {
        if (!auth.token) {
            location.hash = "";
        }
        const nav = document.getElementsByTagName("navigation-outlet")[0];
        nav.classList.remove("hidden");
        this.innerHTML = `<create-project class='container'></create-project`;
    }
}