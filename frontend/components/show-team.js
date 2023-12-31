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
        ul.classList.add("main-content-background")
        let teamRes = await this.team();

        teamRes.forEach(member => {
            console.log(member);
            let li = document.createElement("li")
            li.classList.add("team-view")
            li.innerHTML = `<img class="user-image" src = "./../public/user-solid.svg" alt="user"/>
            ${member.name} (${member.id}), ${member.mail}  <button class="li-button">Delete</button>`
            li.addEventListener("click", (event) => {

            });
            ul.appendChild(li);
        });

        // const userInfo = document.createElement("div");
        // userInfo.innerHTML = "<user-info></user-info>";
        const userAdd = document.createElement("div");
        userAdd.innerHTML = "<user-add></user-add>"

        // this.appendChild(userInfo);
        this.appendChild(ul);
        this.appendChild(userAdd);
    }
}