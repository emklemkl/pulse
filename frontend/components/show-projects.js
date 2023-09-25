import auth from "../models/auth.js";
import proj from "../models/proj.js";
import {baseURL} from "../utils.js";
export default class ShowProjects extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    //component attributes
    // static get observedAttributes() {
    //     return ["name"]
    // }

    async projects() {
        const result = await proj.projects();
        console.log("🚀 ~ file: login-form.js:28 ~ LoginForm ~ login ~ result:", result)
        return result;
    }

    // attribute change
    // attributeChangedCallback(property, oldValue, newValue) {
    //     if (oldValue === newValue) {
    //         return
    //     }
    //     this[property] = newValue;
    // }

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
        
        // let div = document.createElement("div");
        // div.classList.add("logged-as"); // Gör en ruta som visar vem som är inloggad.
        // div.innerHTML=`<h3>User: ${auth.userId}</h3><h3>Role: ${auth.token}</h3>`
        this.innerHTML = "<user-info></user-info>"
        this.appendChild(ul);
    }
}