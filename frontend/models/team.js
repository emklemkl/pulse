"use strict";
import { apiKey, baseURL } from "../utils.js";
import auth from "./auth.js";


const team = {
    team: async function team() {
        
        
        const response = await fetch(`${baseURL}/team`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                "content-type": "application/json"
            },
        });
        const result = await response.json();

        return result[0];
    },

    addTeamMember: async function addTeamMember(newTeamMembersArray) {
            console.log("addTeamMember:",newTeamMembersArray);
            const response = await fetch(`${baseURL}/add-team-member`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    "content-type": "application/json"
                },
                body: JSON.stringify(newTeamMembersArray)
                });
            const result = await response.json();
            
            // console.log("hej");
            // return result[0];
        },
    
}
export default team;
