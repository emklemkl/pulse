
import proj from "../models/proj.js";
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
        divUl.innerHTML = "<h3>Submitted reports (click to read and comment)</h3>"
        let reports = await this.reports();
        console.log(reports);
        reports.forEach(report => {
            if (report.sent) {
                let li = document.createElement("li")
                report.read ? li.classList.add("closed-list-tm", "sent") : li.classList.add("closed-list-tm", "not-sent")
                // li.classList.add("closed-list", "unread")
                li.innerHTML = `<h5>Report:${report.reportid} | Project: ${report.name} (${report.id})</h5>Report ${report.submitted_report}`
                li.addEventListener("click", (event) => {
                    location.hash = `read_report`
                    proj.selectReport = report.reportid;
                });
                ul.appendChild(li);
            }
        });
        // this.innerHTML = "<user-info></user-info>"
        divUl.appendChild(ul)
        this.appendChild(divUl);
    }
}