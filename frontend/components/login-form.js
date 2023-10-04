import auth from "../models/auth.js";
import {baseURL} from "../utils.js";
export default class LoginForm extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    // //component attributes
    // static get observedAttributes() {
    //     return ["name"]
    // }

    async test() {
        const response = await fetch(`${baseURL}/`, {
        });
        const result = await response.json();
        console.log(result);
    }

    async login() {
        const result = await auth.login(
            this.credentials.userId,
            this.credentials.password,
        );

        if (auth.token) {
            location.hash = "overview";
            console.log("Login Gick bra",auth.token);
        } 
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

        // Create userId input element
        let userId = document.createElement("input");

        userId.setAttribute("type", "number")
        userId.setAttribute("min", "1000")
        userId.setAttribute("name", "user")
        userId.setAttribute("required", "required")
        userId.classList.add("input");
        userId.setAttribute("placeholder", "Employee Id: 10XX")
        userId.addEventListener("input", (event) => {
            this.credentials = {
                ...this.credentials,
                userId: event.target.value,
            };
            console.log(event.target.value);
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