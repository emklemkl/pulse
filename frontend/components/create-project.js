import auth from "../models/auth.js";
import team from "../models/team.js";
import proj from "../models/proj.js";
export default class CreateProject extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
        this.checkedMembers = [];
    }

    async createProject() {
        console.log(this.projectData);
        console.log(this.checkedMembers);
        // const result = await proj.createProject();
        // console.log("🚀 ~ file: login-form.js:28 ~ LoginForm ~ login ~ result:", result)
        // return result;
    }

    async team() {
        const result = await team.team();
        return result;
    }

    async connectedCallback() {
        const teamMembers = await this.team()
        console.log(teamMembers);
        const availableReportFreq = [1,7,14,30] // Every X days.
        let form = document.createElement("form");

        form.classList.add("create-project");
        
        let divInForm = document.createElement("div");
        let secondDivInForm = document.createElement("div");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.createProject();
        });

        // Create userId input element
        let projectName = document.createElement("input");

        projectName.setAttribute("type", "text")
        projectName.setAttribute("name", "name")
        projectName.setAttribute("required", "required")
        projectName.classList.add("input");
        projectName.setAttribute("placeholder", "Give the project a name")
        projectName.addEventListener("input", (event) => {
            this.projectData = {
                ...this.projectData,
                projectName: event.target.value,
            };
            console.log(event.target.value);
        });
        divInForm.appendChild(projectName)


        let startDate = document.createElement("input");
        startDate.setAttribute("placeholder", "Add project start date")
        startDate.setAttribute("type", "text");
        startDate.setAttribute("name", "start-date");
        startDate.setAttribute("required", "required");
        startDate.addEventListener("click", (event) => {
            event.target.type = "date"
        })
        startDate.classList.add("input");
        startDate.addEventListener("input", (event) => {
            this.projectData = {
                ...this.projectData,
                startDate: event.target.value
            };
            console.log(event.target.value);
        });
        divInForm.appendChild(startDate)
        let submitButton = document.createElement("input");
        
        
        let select = document.createElement("select");
        select.setAttribute("placeholder", "Select reporting frequency")
        select.setAttribute("name", "report");
        select.setAttribute("required", "required");
        select.classList.add("input");
        let option = document.createElement("option");
        option.text = "Select reporting frequency"
        option.setAttribute("selected","true")
        option.setAttribute("disabled","disabled")
        select.appendChild(option);
        availableReportFreq.forEach((freq) => {
            let option = document.createElement("option");
            option.value = freq
            option.text = `Every ${freq} day`
            select.appendChild(option);
        })
        select.addEventListener("change", (event) => {
            this.projectData = {
                ...this.projectData,
                reportFreq: event.target.value
            };
            console.log(event.target.value);
        });
        divInForm.appendChild(select)

        let description = document.createElement("textarea");
        description.setAttribute("placeholder", "Add project-description")
        description.setAttribute("name", "description");
        description.setAttribute("required", "required");
        description.classList.add("input-desc");
        description.addEventListener("input", (event) => {
            this.projectData = {
                ...this.projectData,
                description: event.target.value
            };
            console.log(event.target.value);
        });
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Create");
        submitButton.classList.add("create-button");
        divInForm.appendChild(description)

        teamMembers.forEach((member) => {
            
            let inputContainer = document.createElement("div")
            let chooseTeam = document.createElement("input")
            let label = document.createElement("label")

            inputContainer.classList.add("checkbox-members")

            label.setAttribute("for", `${member.id}`)
            label.setAttribute("value", `${member.id}, ${member.name}`)
            label.innerHTML = `${member.id}, ${member.name}`
            chooseTeam.setAttribute("type", "checkbox")
            chooseTeam.setAttribute("id", `${member.id}`)
            chooseTeam.setAttribute("name", member.id)
            chooseTeam.setAttribute("value", member.id)
            chooseTeam.addEventListener("change", event => {
                if (event.target.checked) {
                    this.checkedMembers.push(event.target.value)
                } else if (!event.target.checked) {
                    const i = this.checkedMembers.indexOf(event.target.value);
                    this.checkedMembers.splice(i, 1);
                }
                console.log(this.checkedMembers);
            })
            inputContainer.appendChild(chooseTeam);
            inputContainer.appendChild(label);
            secondDivInForm.appendChild(inputContainer);
        })

        secondDivInForm.appendChild(submitButton);
        form.appendChild(divInForm);
        form.appendChild(secondDivInForm);
        const userInfo = document.createElement("div");
        userInfo.innerHTML = "<user-info></user-info>";
        this.appendChild(userInfo);
        this.appendChild(form);


    }
}