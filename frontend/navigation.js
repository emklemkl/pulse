import Router from "./router.js";
import auth from './models/auth.js';

export default class Navigation extends HTMLElement {
    constructor() {
        super();

        this.router = new Router();
    }

    connectedCallback()                       {
        const routes = this.router.routes;

        let navigationLinks = "";
        let navButtonId = 0;
        let unauthorizedRoutes = [];
        for (let path in routes) {
            if (!routes[path].hidden) { // Hide unwanted routes
                console.log(auth.role);
                    navigationLinks += `<a id=nav-button-${navButtonId} href='#${path}'>${routes[path].name}</a>`;
                    navButtonId++;
                if (!routes[path].access.includes(auth.role)) {
                    unauthorizedRoutes.push(`nav-button-${navButtonId}`)
                } 
                // else if (auth.role !== "PM" && !routes[path].access === "ALL") {
                //     navigationLinks += `<a id=nav-button-${navButtonId} href='#${path}'>${routes[path].name}</a>`;
                //     navButtonId++;
                // }
            }
        }
        this.innerHTML = `<user-info></user-info><nav id="top-nav">${navigationLinks}</nav>`;
        for (let i = 0; i < 4; i++) {
            document.getElementById(`nav-button-${i}`)
            console.log("🚀 ~ file: navigation.js:37 ~ Navigation ~ unauthorizedRoutes.forEach ~ document.getElementById(String(i)):", document.getElementById(`nav-button-${i}`))
        }
    }
}
