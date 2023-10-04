import auth from "../models/auth.js"
export default class ReportsView extends HTMLElement {

    // connect component
    connectedCallback() {
        // if (!auth.token) {
        //     location.hash = "";
        // }
        const nav = document.getElementsByTagName("navigation-outlet")[0];
        nav.classList.remove("hidden");
        this.innerHTML = `<show-reports class='container'></show-reports`;
    }
}