// import auth from "../models/auth.js";
import proj from "../../models/proj.js";
// import {baseURL} from "../utils.js";
export default class ShowTMProjects extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    async myProject() {
        const result = await proj.myProjects();
        console.log("🚀 ~ file: login-form.js:28 ~ LoginForm ~ login ~ result:", result)
        return result;
    }
    // connect component
    async connectedCallback() {
        let div = document.createElement("div");
        div.classList.add("main-content-background")
        let projects = await this.myProject();
        console.log(projects);
        projects.forEach(project => {
            let div2 = document.createElement("div")
            let h3 = document.createElement("h4")
            let p = document.createElement("p")
            p.classList.add("closed")
            p.addEventListener("click", (event) => {
                event.target.classList.toggle("closed");
                event.target.classList.toggle("open");
                event.stopPropagation();
            });
            h3.innerHTML = `Project: ${project.name}, Id: ${project.id}). Click the text below to read the description.`
            p.innerHTML += `${project.description}`
            div2.appendChild(h3)
            div2.appendChild(p)
            div.appendChild(div2)
        });
        
        const userInfo = document.createElement("div");
        userInfo.innerHTML = "<user-info></user-info>";
        const projectAdd = document.createElement("div");
        projectAdd.innerHTML = "<project-add></project-add>"

        // this.appendChild(userInfo);
        // this.innerHTML= " TM PROJ"
        this.appendChild(div);
        // this.appendChild(projectAdd);
        // const divs = document.getElementsByClassName("tm-proj-list")
        // for (const div of divs) {
        //     div.addEventListener("click", (event) => {
        //         event.target.classList.toggle("closed");
        //         event.target.classList.toggle("open");
        //         event.stopPropagation();
        //     });
        // }
    }
}