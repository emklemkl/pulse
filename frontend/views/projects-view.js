import auth from "../models/auth.js"
export default class ProjectsView extends HTMLElement {

    // connect component
    connectedCallback() {
        if (!auth.token) {
            location.hash = "";
        }
        const nav = document.getElementsByTagName("navigation-outlet")[0];
        nav.classList.remove("hidden");
        this.innerHTML = `<show-projects class='container'></show-projects`;
    }
}