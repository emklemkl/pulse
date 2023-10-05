import auth from "../models/auth.js"
import proj from "../models/proj.js"
export default class ReadReportView extends HTMLElement {

    // connect component
    connectedCallback() {

        // if (!proj.selectReport) {
        //     location.hash = "reports";
        // }
        // if (!auth.token) {
        //     location.hash = "";
        // }
        const nav = document.getElementsByTagName("navigation-outlet")[0];
        nav.classList.remove("hidden");
        this.innerHTML = `<read-report class='container'></read-report>`;
    }
}