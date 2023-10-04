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
                view: "<div class='container'><reports-view></reports-view></div>",
                name: "Reports",
            },
            "projects": {
                view: "<div class='container'><projects-view></projects-view></div>",
                name: "Projects",
            },
            "create-project": {
                view: "<div class='container'><create-project-view></create-project-view></div>",
                name: "Create project",
                hidden: true
            },
            "team": {
                view: "<team-view class='container'></team-view>",
                name: "Team",
            },
            "dummy": {
                view: "<dummy-refresh></dummy-refresh>",
                name: "Dummy",
                hidden: true
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
