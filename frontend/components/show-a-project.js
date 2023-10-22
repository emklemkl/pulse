import auth from "../models/auth.js";
import proj from "../models/proj.js";
import {baseURL} from "../utils.js";
export default class ShowAProject extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    async projectDetails() {
        const result = await proj.projectDetails();
        console.log("🚀 ~ file: login-form.js:28 ~ LoginForm ~ login ~ result:", result)
        return result;
    }

    async myFunction(e) {
        console.log("");
    }
    // connect component
    async connectedCallback() {
        let projects = await this.projectDetails();
        let ul = document.createElement("ul");
        ul.innerHTML = `<h5>Project: ${projects[0].pname} (${projects[0].pid})</h5>
        <h5>Start: ${projects[0].project_start.slice(0,10)}</h5>
        <h5>End: ${projects[0].project_end.slice(0,10)}</h5>
        <h5>Assigned team members:</h5>`
        
        ul.classList.add("main-content-background")
        projects.forEach(project => {
            console.log(project);
            let li = document.createElement("li")
            li.classList.add("team-view")
            li.innerHTML = `<div><h5>${project.name} (id:${project.id})</h5> 
            <h5>Mail: ${project.mail.slice(0,10)}</h5> 
            <h5>Mail: ${project.phone}</h5> 
            </div>` //  <button class="li-button" onclick="() => this.myFunction()">Open</button>
            ul.appendChild(li);
        });
        ul.innerHTML += `<h5>Description:</h5> <p class="a-p-tag"> ${projects[0].description}</p>`
        
        // const userInfo = document.createElement("div");
        // userInfo.innerHTML = "<user-info></user-info>";
        // const projectAdd = document.createElement("div");
        // projectAdd.innerHTML = "<project-add></project-add>"

        // this.appendChild(userInfo);
        this.appendChild(ul);
        // this.appendChild(projectAdd);
    }
}