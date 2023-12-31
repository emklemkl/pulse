import auth from "../models/auth.js";
import proj from "../models/proj.js";
import {baseURL} from "../utils.js";
export default class ShowProjects extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    async projects() {
        const result = await proj.projects();
        console.log("🚀 ~ file: login-form.js:28 ~ LoginForm ~ login ~ result:", result)
        return result;
    }

    async myFunction(e) {
        proj.selectProject = e.target.value
        location.hash = "project_details"
    }
    // connect component
    async connectedCallback() {
        let ul = document.createElement("ul");
        ul.classList.add("main-content-background")
        let projects = await this.projects();
        projects.forEach(project => {
            console.log(project);
            let li = document.createElement("li")
            let button = document.createElement("button")
            button.classList.add("li-button")
            button.value = project.id
            button.textContent = "Details"
            button.addEventListener("click", (e) => this.myFunction(e));
            li.classList.add("team-view")
            li.innerHTML = `<div><h5>${project.name} (id:${project.id})</h5> 
                <h5>Start: ${project.project_start.slice(0, 10)}</h5> 
                <h5>End: ${project.project_end.slice(0, 10)}</h5>
                </div>` //  <button class="li-button" onclick="() => this.myFunction()">Open</button>
                li.appendChild(button)
            ul.appendChild(li);
        });
        
        // const userInfo = document.createElement("div");
        // userInfo.innerHTML = "<user-info></user-info>";
        const projectAdd = document.createElement("div");
        projectAdd.innerHTML = "<project-add></project-add>"

        // this.appendChild(userInfo);
        this.appendChild(ul);
        this.appendChild(projectAdd);
    }
}