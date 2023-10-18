import auth from "./models/auth.js";

export default class Router extends HTMLElement {
    constructor() {
        super();
        
        this.currentRoute = "";
        this.query = "";
        this.allRoutes = {
            "": {
                view: "<div class='container'><login-view></login-view></div>",
                name: "Log out",
                hidden: true
            },
            "overview": {
                view: "<div class='container'><logged-view></logged-view></div>", // Behövs containerdiven?
                name: "Overview",
                access: "PM"
            },
            "reports": {
                view: "<div class='container'><reports-view></reports-view></div>",
                name: "Reports",
                access: "PMTM"
            },
            "read_report": {
                view: "<div class='container'><read-report-view></read-report-view></div>",
                name: "Read report",
                hidden: true
            },
            "write_report": {
                view: "<div class='container'><write-tm-report></write-tm-report></div>",
                name: "Write report",
                hidden: true
            },
            "projects": {
                view: "<div class='container'><projects-view></projects-view></div>",
                name: "Projects",
                access: "PMTM"
            },
            "create-project": {
                view: "<div class='container'><create-project-view></create-project-view></div>",
                name: "Create project",
                hidden: true,
            },
            "reset-pw": {
                view: "<div class='container'><reset-pw></reset-pw></div>",
                name: "ResetPw",
                hidden: true,
            },
            "team": {
                view: "<team-view class='container'></team-view>",
                name: "Team",
                access: "PM"
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
        const hashParts = location.hash.split('?');
        auth.jwtForReset = hashParts[1]
        this.currentRoute = hashParts[0].replace("#", "")
        this.render();

        // this.currentRoute = location.hash.replace("#", "")
        // this.render();
    }

    render() {
        this.innerHTML = this.routes[this.currentRoute].view || "<not-found></not-found>";
    }
}
