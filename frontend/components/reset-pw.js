import auth from "../models/auth.js";
export default class ResetPw extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    async resetPw() {
        
        const result = await auth.resetPw(
            this.credentials.password,
            location.hash = ""
        );
    }

    check = function() {
        if (document.getElementById('password').value ==
            document.getElementById('confirm_password').value) {
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').innerHTML = 'Matching';
            } else {
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = 'Not matching';
            }
        }

    // connect component
    connectedCallback() {
        const nav = document.getElementsByTagName("navigation-outlet")[0];
        nav.classList.add("hidden");

        let form = document.createElement("form");
        form.classList.add("login");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (document.getElementById('password').value == document.getElementById('confirm_password').value) {
                this.resetPw();
            }
        });

        
        // Create PW-input element
        let password = document.createElement("input");
        
        password.setAttribute("placeholder", "Password")
        password.setAttribute("type", "password");
        password.id = "password"
        password.setAttribute("name", "pw");
        password.setAttribute("required", "required");
        password.classList.add("input");

        password.addEventListener("input", (event) => {
            this.credentials = {
                ...this.credentials,
                password: event.target.value
            };
            this.check()
        });

        let password2 = document.createElement("input");
        
        password2.setAttribute("placeholder", "Confirm password")
        password2.setAttribute("type", "password");
        password2.id = "confirm_password"
        password2.setAttribute("name", "pw");
        password2.setAttribute("required", "required");
        password2.classList.add("input");

        password2.addEventListener("input", (event) => {
            this.credentials = {
                ...this.credentials,
                password2: event.target.value
            };
            this.check()
        });

        let span = document.createElement("span")
        span.id = "message"
        let submitButton = document.createElement("input");

        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Done");
        submitButton.classList.add("button", "green");

        // this.innerHTML = `<h1>${this.name}</h1>`;

        form.appendChild(password);
        form.appendChild(password2);
        form.appendChild(span)
        form.appendChild(submitButton);
        this.appendChild(form);
    }
}