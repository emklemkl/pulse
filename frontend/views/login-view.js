import auth from "../models/auth.js";
export default class LoginView extends HTMLElement {

    // connect component
    connectedCallback() {
        auth.token = ""; // Logs out user
        auth.userId = ""; // Logs out user
        const nav = document.getElementsByTagName("navigation-outlet")[0];
        nav.classList.add("hidden");
        this.innerHTML = `<login-form name="Login form"></login-form>`;
    }
}