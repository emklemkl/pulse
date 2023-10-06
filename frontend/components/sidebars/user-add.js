"use strict"
/**
 * @module UserAdd
 * @description Holds the user-add component seen on "team"view. 
*/

import auth from "../../models/auth.js";
import team from "../../models/team.js";
export default class UserAdd extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    // connect component
    async connectedCallback() {
        let div = document.createElement("div");
        div.classList.add("side-bars"); // Gör en ruta som visar vem som är inloggad.
        
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
            await reader.readAsText(event.target.files[0])
            reader.onload = async ()=>  {
                const csvContent = reader.result;
                console.log(csvContent);
                let splittedCSV=csvContent.split("\n")
                await splittedCSV.forEach(row => {
                    arrayifiedCsv.push(row.split(","));
                });
                await team.addTeamMember(arrayifiedCsv)
                auth.refreshJs()
            };
        });
        form.appendChild(input);
        div.appendChild(form)
        this.appendChild(div)
    }
}