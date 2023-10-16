/**
 * @module read-report.js
 * @description Component handels the read and comment part when a PM is logged in.
 */
import proj from "../../models/proj.js";
// import auth from "../models/auth.js";

export default class WriteReport extends HTMLElement {
    constructor() {
        super();
        this.name = "Project Pulse2";
    }

    async report(id = -1) {
        const result = await proj.report(id);
        return result[0];
    }
    
    async writtenReport() {
        await proj.writeReport(this.writeReport, proj.selectReport);
        proj.selectReport = 0;
        proj.selectReport = 0;
    }

    // connect component
    async connectedCallback() {
        let form = document.createElement("form");

        form.classList.add("read-comment")
        form.classList.add("main-content-background")
        form.innerHTML = `<h3>Project ${proj.selectProject} | Report id: ${proj.selectReport}</h3>`
        let div = document.createElement("div")
        let writeReport = document.createElement("textarea");
        writeReport.id = "writeReport"
        writeReport.setAttribute("placeholder", "Leave a comment on the report..")
        writeReport.addEventListener("input", (e) => {
            this.writeReport = {
                ...this.writeReport,
                comment: e.target.value,
            }
        });

        let submit = document.createElement("button")
        submit.classList.add("create-button")
        submit.innerText = "Submit"
        submit.addEventListener("click", async (e) => {
            e.preventDefault()
            await this.writtenReport()
        })

        div.appendChild(writeReport)
        form.appendChild(div)
        form.appendChild(submit)
        this.appendChild(form);
        // this.innerHTML += "<user-info></user-info>"

    }
}