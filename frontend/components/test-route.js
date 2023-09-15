import auth from "../models/auth.js";
export default class TestRoute extends HTMLElement {
    constructor() {
        super();

        this.name = "TEST";
    }

    //component attributes
    static get observedAttributes() {
        return ["name"]
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
        if (auth.token) {
            this.innerHTML = `<h1>${this.name}</h1> <h1> ${auth.token}${this.name}</h1>`;
        } else {
            this.innerHTML = `<h1>no token..</h1>`;
        }
    }
}