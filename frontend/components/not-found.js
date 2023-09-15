export default class NotFound extends HTMLElement {
    constructor() {
        super();

        this.name = "Not found";
    }

    // connect component
    connectedCallback() {
        this.innerHTML = `<h1>${this.name}</h1>`;
    }
}