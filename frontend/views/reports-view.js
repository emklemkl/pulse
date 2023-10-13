import auth from "../models/auth.js"
export default class ReportsView extends HTMLElement {

    // connect component
    connectedCallback() {
        if (!auth.token) {
            location.hash = "";
        }
        const nav = document.getElementsByTagName("navigation-outlet")[0];
        nav.classList.remove("hidden");
        // auth.role = "TM"
        // console.log("CURRENT ROLE:", auth.role);
        // if (auth.role === "TM") {
            this.innerHTML = `<show-tm-reports class='container'></show-tm-reports>`;
        // } else if (auth.role === "PM") {
            // this.innerHTML = `<show-reports class='container'></show-reports>`;
        // }
    }
}