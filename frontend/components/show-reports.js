import auth from "../models/auth.js";
import proj from "../models/proj.js";
import {baseURL} from "../utils.js";
export default class ShowReports extends HTMLElement {
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
        let ul = document.createElement("ul");
        ul.classList.add("main-content-background")
        let divUl = document.createElement("div");
        divUl.innerHTML = "<h3>Submitted reports</h3>"
        let reports = await this.reports();
        reports.forEach(report => {
            let li = document.createElement("li")
            li.classList.add("closed-list", "unread")
            li.textContent = `R:${report.reportid} | ${report.name} \nReport ${report.submitted_report}`
            li.addEventListener("click", (event) => {
                location.hash = `read_report`
                proj.selectReport = report.reportid;
            });
            ul.appendChild(li);

        });

        this.innerHTML = "<user-info></user-info>"
        divUl.appendChild(ul)
        this.appendChild(divUl);
    }
}