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
    
    async addComment() {

        // const result = await proj.addComment(repId, comment, pmId="optional");
        // return result[0];
    }

    // connect component
    async connectedCallback() {
        proj.selectReport = 100 
        const report = await this.report(proj.selectReport); 
        let form = document.createElement("form");
        let label = document.createElement("label")

        form.classList.add("read-comment")
        form.classList.add("main-content-background")
        
        // Two divs for better formatting below the report text
        let div = document.createElement("div")
        let div2 = document.createElement("div") 
        div2.classList.add("col")
        let h3 = document.createElement("h3");
        h3.textContent = `Report: ${report.id}, Project: ${report.proj_id_report}`
        
        let text = document.createElement("textarea");
        text.setAttribute("readonly", "true")
        text.classList.add("read-text")
        text.innerText = report.submitted_report //         1 skapa addComment() 2 Lägg till nya kommentarer här?

        let comment = document.createElement("textarea");
        comment.setAttribute("placeholder", "Leave a comment on the report..")
        comment.addEventListener("input", (e) => {
            console.log(e.target.value);                // 2 Fånga kommentaren här
        })
        
        label.setAttribute("for", `is-read`)
        label.setAttribute("value", `test`)
        label.innerHTML = `<h4>Read:</h4>`
        let checkbox = document.createElement("input");
        checkbox.setAttribute("class", `is-read`)
        checkbox.setAttribute("name", "is-read")
        checkbox.setAttribute("type", "checkbox")

        checkbox.addEventListener("change", (event) => {
            this.isRead = event.target.checked;
        });

        let submit = document.createElement("button")
        submit.classList.add("create-button")
        submit.innerText = "Save"
        submit.addEventListener("click", (e) => {
            this.addComment()
        })

        form.appendChild(h3)
        form.appendChild(text)
        div.appendChild(comment)
        div2.appendChild(label)
        div2.appendChild(checkbox)
        div2.appendChild(submit)
        div.appendChild(div2)
        form.appendChild(div)




        this.innerHTML = "<user-info></user-info>"
        this.appendChild(form)

    }
}