export default class Router extends HTMLElement {
    constructor() {
        super();
        
        this.currentRoute = "";

        this.allRoutes = {
            "": {
                view: "<div class='container'><login-view></login-view></div>",
                name: "Proj",
            },
            "logged": {
                view: "<div class='container'><logged-view></logged-view></div>",
                name: "Logged in",
            },
            "test": {
                view: "<test-route></test-route>",
                name: "test",
            }
        };
    }

    get routes() {
        return this.allRoutes;
    }

    // connect component
    connectedCallback() {
        window.addEventListener('hashchange', () => {
            this.resolveRoute()
        });

        this.resolveRoute();
    }

    resolveRoute() {
        this.currentRoute = location.hash.replace("#", "")
        this.render();
    }

    render() {
        this.innerHTML = this.routes[this.currentRoute].view || "<not-found></not-found>";
    }
}
