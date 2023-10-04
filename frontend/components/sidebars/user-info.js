import auth from "../../models/auth.js";

export default class UserInfo extends HTMLElement {
    constructor() {
        super();

        this.name = "Project Pulse2";
    }

    // connect component
    async connectedCallback() {
        let div = document.createElement("div");
        div.classList.add("side-bars"); // Gör en ruta som visar vem som är inloggad.
        
        this.appendChild(div)
        div.innerHTML=`<h3>User: ${auth.userId}</h3><h3>Role: ${auth.role}</h3><h3>Name: ${auth.name}</h3><button id="logout">Log out</button>`
        document.getElementById("logout").addEventListener("click", (e) => {
            location.hash="";
        })
    }
}