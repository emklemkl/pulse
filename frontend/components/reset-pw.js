import auth from "../models/auth.js";
import {baseURL} from "../utils.js";
export default class ResetPw extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    async resetPw() {
        const result = await auth.login(
            this.credentials.userId,
            this.credentials.password,
        );
    }

    // connect component
    connectedCallback() {

        auth.token = ""; // Logs out user
        auth.userId = ""; // Logs out user

        let form = document.createElement("form");
        form.classList.add("login");
        
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.login();
        });

        
        // Create PW-input element
        let password = document.createElement("input");
        
        password.setAttribute("placeholder", "Password")
        password.setAttribute("type", "password");
        password.setAttribute("name", "pw");
        password.setAttribute("required", "required");
        password.classList.add("input");

        password.addEventListener("input", (event) => {
            this.credentials = {
                ...this.credentials,
                password: event.target.value
            };
            console.log(event.target.value);
        });

        let password2 = document.createElement("input");
        
        password2.setAttribute("placeholder", "Confirm password")
        password2.setAttribute("type", "password");
        password2.setAttribute("name", "pw");
        password2.setAttribute("required", "required");
        password2.classList.add("input");

        password2.addEventListener("input", (event) => {
            this.credentials = {
                ...this.credentials,
                password2: event.target.value
            };
            console.log(event.target.value);
        });

        let submitButton = document.createElement("input");

        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Log in");
        submitButton.classList.add("button", "green");

        // this.innerHTML = `<h1>${this.name}</h1>`;

        form.appendChild(userId);
        form.appendChild(password);
        form.appendChild(submitButton);
        this.appendChild(form);
    }
}