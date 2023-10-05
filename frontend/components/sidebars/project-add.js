"use strict"
/**
 * @module ProjectAdd
 * @description Holds the user-add component seen on "team"view. 
 */

export default class ProjectAdd extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    // connect component
    async connectedCallback() {
        let div = document.createElement("div");
        div.classList.add("side-bars"); // Gör en ruta som visar vem som är inloggad.
        let button = document.createElement("button")
        button.textContent = "Create Project"
        button.classList.add("create-button");

        
        // When a csv file is selected it will instantly be used to create an account for the user in the db.
        // An email containing informaition regarding change of password will be sent from the server
        button.addEventListener("click", async () => {
            window.location.hash = "create-project"
        });
        // form.appendChild(input);
        div.appendChild(button)
        this.appendChild(div)
    }
}