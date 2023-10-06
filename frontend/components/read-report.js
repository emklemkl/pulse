/**
 * @module read-report.js
 * @description Component handels the read and comment part when a PM is logged in.
 */
import proj from "../models/proj.js";
import auth from "../models/auth.js";

export default class ReadReport extends HTMLElement {
    constructor() {
        super();
        this.name = "Project Pulse2";
    }

    async report(id = -1) {
        const result = await proj.report(id);
        return result[0];
    }
    
    async addComment() {
        await proj.addComment(this.readAndComment);
    }

    // connect component
    async connectedCallback() {
        const report = await this.report(proj.selectReport); 
        this.readAndComment = {reportId: proj.selectReport}

        this.readAndComment = {
            ...this.readAndComment,
            isRead: false,
        };
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
        if (report.comments) {
            text.innerHTML = `${report.submitted_report}\n\nComment: \n${report.comments}` //         1 skapa addComment() 2 Lägg till nya kommentarer här?
        } else {
            text.innerHTML = `${report.submitted_report}` //         1 skapa addComment() 2 Lägg till nya kommentarer här?
        }

        /**
         * PM can create a comment on a read submitted report.
         */
        let comment = document.createElement("textarea");
        comment.id = "comment"
        comment.setAttribute("placeholder", "Leave a comment on the report..")
        comment.addEventListener("input", (e) => {
            this.readAndComment = {
                ...this.readAndComment,
                comment: e.target.value,
            }
                
        })
        
        label.setAttribute("for", `is-read`)
        label.setAttribute("value", `test`)
        label.innerHTML = `<h4>Read:</h4>`
        let checkbox = document.createElement("input");
        checkbox.setAttribute("class", `is-read`)
        checkbox.setAttribute("name", "is-read")
        checkbox.setAttribute("type", "checkbox")

        checkbox.addEventListener("change", (event) => {
            this.readAndComment = {
                ...this.readAndComment,
                isRead: event.target.checked,
            };
        });

        let submit = document.createElement("button")
        submit.classList.add("create-button")
        submit.innerText = "Save"
        submit.addEventListener("click", async (e) => {
            e.preventDefault()
            await this.addComment()
            auth.refreshJs()
            
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