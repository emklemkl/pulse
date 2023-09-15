import Router from "./router.js";

export default class Navigation extends HTMLElement {
    constructor() {
        super();

        this.router = new Router();
    }

    connectedCallback()                       {
        const routes = this.router.routes;

        let navigationLinks = "";

        for (let path in routes) {
            if (!routes[path].hidden) { // Hide unwanted routes
                navigationLinks += `<a href='#${path}'>${routes[path].name}</a>`;
            }
        }
        this.innerHTML = `<nav class="bottom-nav">${navigationLinks}</nav>`;
    }
}
