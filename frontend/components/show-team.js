import auth from "../models/auth.js";
import team from "../models/team.js";
import {baseURL} from "../utils.js";
export default class ShowTeam extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    async team() {
        const result = await team.team();

        return result;
    }

    // connect component
    async connectedCallback() {
        let ul = document.createElement("ul");
        let teamRes = await this.team();

        // ------------------------------------------------------Gör en function med eventl. /alerantivt uppdatera i eventl för <input> 
        // -----------------------------------------------------------för att refresha anställda efter uppladdning?
        teamRes.forEach(member => {
            console.log(member);
            let li = document.createElement("li")
            li.classList.add("closed-list")
            li.innerHTML = `<img class="user-image" src = "./../public/user-solid.svg" alt="user"/>
            ${member.name} (${member.id}), ${member.mail}  <button class="li-button">Delete</button>`
            li.addEventListener("click", (event) => {

            });
            ul.appendChild(li);
        });

        const userInfo = document.createElement("div");
        userInfo.innerHTML = "<user-info></user-info>";
        const userAdd = document.createElement("div");
        
        let form = document.createElement("form")
        const label = document.createElement("label");
        label.textContent = "Add team member(s). An automated email will be sent to the new users with instructions on changing passwords";
        form.appendChild(label);
        let input = document.createElement("input")
        input.setAttribute("type", "file")
        input.setAttribute("accept", "csv")

        // When a csv file is selected it will instantly be used to create an account for the user in the db.
        // An email containing informaition regarding change of password will be sent from the server
        input.addEventListener("change", async (event) => {
            const reader = new FileReader();
            let arrayifiedCsv = [];
            reader.readAsText(event.target.files[0])
            reader.onload = async ()=>  {
                const csvContent = reader.result;
                let splittedCSV=csvContent.split("\n")
                splittedCSV.forEach(row => {
                    arrayifiedCsv.push(row.split(","));
                });
                team.addTeamMember(arrayifiedCsv)
            };
            input.value = null;
        });

        // Create userId input element
        let userId = document.createElement("input");
        form.appendChild(input);
        form.classList.add("logged-as")
        userAdd.appendChild(form);

        this.appendChild(userInfo);
        this.appendChild(ul);
        this.appendChild(userAdd);
    }
}