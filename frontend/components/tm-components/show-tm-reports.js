import auth from "../../models/auth.js";
import proj from "../../models/proj.js";
export default class ShowTMReports extends HTMLElement {
    constructor() {
        super();
        this.name = "Project Pulse2";
    }

    async tmReports() {
        const result = await proj.getTmReports();
        return result;
    }

    // connect component
    async connectedCallback() {
        let ul = document.createElement("ul");
        ul.classList.add("main-content-background")
        let ul2 = document.createElement("ul");
        ul2.classList.add("main-content-background")
        let divUl = document.createElement("div");
        ul.innerHTML = "<h3>Upcoming reports:</h3>"
        ul2.innerHTML = "<h3>Submitted reports:</h3>"
        let reports = await this.tmReports();
        const userId = parseInt(auth.userId)
        let projectsOrganize = [];
        const now = new Date();
        for (const i of reports) {
            if (projectsOrganize.includes(i.proj_id_report)) {
                continue;
            }
            projectsOrganize.push(i.proj_id_report)
        }
        for (const report of reports) 
        {
            const dueDate = new Date(report.due_date);
            const year = dueDate.getFullYear();
            const month = String(dueDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to the month since it's zero-based
            const day = String(dueDate.getDate()).padStart(2, '0');
            const yyyymmdd = `${year}-${month}-${day}`;
            let li = document.createElement("li")
            if (report.sent === null &&  dueDate.setHours(dueDate.getHours + 23) < now) {   ////////////////////////////////////////////////////////////// FUnkar detta som det ska? 
                li.classList.add("closed-list-tm", "late")
            }
            if (report.sent === null && parseInt(report.submitted_by_user) === userId) {
                li.classList.add("closed-list-tm", "not-sent")
                li.textContent = `Project: ${report.proj_id_report} | Due date: ${yyyymmdd} 29:59`
                li.addEventListener("click", (_) => {
                    proj.selectReport = report.id; // Saves the report id for submission on write-tm-reports.
                    proj.selectProject = report.proj_id_report; // Saves the report id for submission on write-tm-reports.
                    location.hash = `write_report`
            });
            ul.appendChild(li);
            } else if (report.sent !== null && parseInt(report.submitted_by_user) === userId) {
                li.classList.add("closed-list-tm", "sent")
                li.textContent = `Project: ${report.proj_id_report} | Due date: ${yyyymmdd} 29:59`
                ul2.appendChild(li);
            }
        };

        // this.innerHTML = "<user-info></user-info>"
        divUl.appendChild(ul)
        divUl.appendChild(ul2)
        this.appendChild(divUl);
    }
}