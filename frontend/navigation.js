import Router from "./router.js";

export default class Navigation extends HTMLElement {
    constructor() {
        super();

        this.router = new Router();
    }

    connectedCallback()                       {
        const routes = this.router.routes;

        let navigationLinks = "";
        let navButtonId = 0;
        for (let path in routes) {
            if (!routes[path].hidden) { // Hide unwanted routes
                navigationLinks += `<a id=nav-button-${navButtonId} href='#${path}'>${routes[path].name}</a>`;
                navButtonId++;
            }
        }
        this.innerHTML = `<user-info></user-info><nav id="top-nav">${navigationLinks}</nav>`;
    }
}
