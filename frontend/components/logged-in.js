
import proj from "../models/proj.js";
import auth from "../models/auth.js";
export default class LoggedIn extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    async reports() {
        const result = await proj.reports();
        return result;
    }

    // connect component
    async connectedCallback() {
        if (auth.role === "PM") {
            document.getElementById("nav-button-0").classList.remove("hidden");
            document.getElementById("nav-button-3").classList.remove("hidden");
        }

        let ul = document.createElement("ul");
        ul.classList.add("main-content-background")
        let divUl = document.createElement("div");
        divUl.innerHTML = "<h3>Report overview (click report for quick read)</h3>"
        let reports = await this.reports();
        console.log(reports);
        reports.forEach(report => {
            if ( report.sent) {

                let li = document.createElement("li")
                report.read ? li.classList.add("closed-list-tm", "read") : li.classList.add("closed-list-tm", "not-sent")
                li.textContent = `R:${report.reportid} | Project ${report.name} (id:${report.id}) \nReport ${report.submitted_report}`
                li.addEventListener("click", (event) => {
                    event.target.classList.toggle("closed-list");
                    event.target.classList.toggle("open-list");
                });
                ul.appendChild(li);
            }
        });

        // this.innerHTML = "<user-info></user-info>"
        divUl.appendChild(ul)
        this.appendChild(divUl);
    }
}