import auth from "../models/auth.js";
import proj from "../models/proj.js";
import {baseURL} from "../utils.js";
export default class ShowReports extends HTMLElement {
    constructor() {
        super();
        this.name = "Project Pulse2";
    }

    // static get observedAttributes()


    async projects() {
        const result = await proj.projects();
        console.log("🚀 ~ file: login-form.js:28 ~ LoginForm ~ login ~ result:", result)
        return result;
    }

    // attributeChangedCallback(property, oldValue, newValue) 

    // connect component
    async connectedCallback() {
        let ul = document.createElement("ul");
        let projects = await this.projects();
        projects.forEach(project => {
            console.log(project);
            let li = document.createElement("li")
            li.classList.add("closed-list")
            li.innerHTML = `${project.name} (id:${project.id}) \nTotal reports: ${project.total_reports}  <button class="li-button">Open</button>`
            li.addEventListener("click", (event) => {

            });
            ul.appendChild(li);

        });
        
        const userInfo = document.createElement("div");
        userInfo.innerHTML = "<user-info></user-info>";

        this.appendChild(userInfo);
        this.appendChild(ul);
    }
}