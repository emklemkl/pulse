import auth from "../models/auth.js";
import proj from "../models/proj.js";
import {baseURL} from "../utils.js";
export default class LoggedIn extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    //component attributes
    // static get observedAttributes() {
    //     return ["name"]
    // }

    async reports() {
        const result = await proj.reports();
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
        let divUl = document.createElement("div");
        divUl.innerHTML = "<h3>Recently submitted reports</h3>"
        let reports = await this.reports();
        reports.forEach(report => {
            let li = document.createElement("li")
            li.classList.add("closed-list", "unread")
            li.textContent = `R:${report.reportid} | Project ${report.name} (id:${report.id}) \nReport ${report.submitted_report}`
            li.addEventListener("click", (event) => {
                event.target.classList.toggle("closed-list");
                event.target.classList.toggle("open-list");
            });
            ul.appendChild(li);

        });
        
        // let div = document.createElement("div");
        // div.classList.add("logged-as"); // Gör en ruta som visar vem som är inloggad.
        // div.innerHTML=`<h3>User: ${auth.userId}</h3><h3>Role: ${auth.token}</h3>`
        this.innerHTML = "<user-info></user-info>"
        divUl.appendChild(ul)
        this.appendChild(divUl);
    }
}