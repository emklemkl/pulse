import auth from "../models/auth.js";
import proj from "../models/proj.js";
import {baseURL} from "../utils.js";
export default class ReadReport extends HTMLElement {
    constructor() {
        super();
        this.name = "Project Pulse2";
    }

    async report(id = -1) {
        const result = await proj.report(id);
        console.log("🚀 ~ file: login-form.js:28 ~ LoginForm ~ login ~ result:", result)
        return result[0];
    }

    // connect component
    async connectedCallback() {
        let report = await this.report(proj.selectReport);
        // let report = await this.report(100);
        proj.selectReport = 0
        console.log(report);
        let form = document.createElement("form");
        form.classList.add("main-content-background")

        let text = document.createElement("textarea");
        text.innerText = report.submitted_report
        form.appendChild(text)




        this.innerHTML = "<user-info></user-info>"
        this.appendChild(form)

    }
}