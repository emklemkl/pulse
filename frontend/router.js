export default class Router extends HTMLElement {
    constructor() {
        super();
        
        this.currentRoute = "";

        this.allRoutes = {
            "": {
                view: "<div class='container'><login-view></login-view></div>",
                name: "Log out",
                hidden: true
            },
            "overview": {
                view: "<div class='container'><logged-view></logged-view></div>", // Behövs containerdiven?
                name: "Overview",
            },
            "reports": {
                view: "<div class='container'><test-route></test-route></div>",
                name: "Reports",
            },
            "projects": {
                view: "<div class='container'><projects-view></projects-view></div>",
                name: "Projects",
            },
            "team": {
                view: "<test-route class='container'></test-route>",
                name: "Team",
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
