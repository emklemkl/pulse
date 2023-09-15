import auth from "../models/auth.js"
export default class LoggedInView extends HTMLElement {

    // connect component
    connectedCallback() {
        if (!auth.token) {
            location.hash = "";
        }
        
        this.innerHTML = `<logged-in name="Logged in"></logged-in>`;
    }
}