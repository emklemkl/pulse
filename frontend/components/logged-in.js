import auth from "../models/auth.js";
import {baseURL} from "../utils.js";
export default class LoggedIn extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    //component attributes
    static get observedAttributes() {
        return ["name"]
    }

    async test() {
        const response = await fetch(`${baseURL}/`, {
        });
        const result = await response.json();
        console.log(result);
    }

    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) {
            return
        }
        this[property] = newValue;
    }

    // connect component
    connectedCallback() {
        let list = document.createElement("ul")
        // let container = document.createElement("div");

        // form.appendChild(userId);
        // form.appendChild(password);
        // form.appendChild(submitButton);
        this.appendChild(container);
    }
}