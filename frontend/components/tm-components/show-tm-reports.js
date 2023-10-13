import auth from "../../models/auth.js";
import proj from "../../models/proj.js";
import {baseURL} from "../../utils.js";
export default class ShowTMReports extends HTMLElement {
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
        divUl.innerHTML = "<h3>TM VIEW</h3>"
        let reports = await this.reports();
        reports.forEach(report => {
            let li = document.createElement("li")
            li.classList.add("closed-list", "unread")
            // report.read ? li.classList.add("closed-list", "read") : li.classList.add("closed-list", "unread")
            li.classList.add("closed-list", "unread")
            li.textContent = `Create a report`
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