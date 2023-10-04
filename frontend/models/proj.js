"use strict";
import { apiKey, baseURL } from "../utils.js";
import auth from "./auth.js";


const proj = {
    reports: async function reports() {
        
        
        const response = await fetch(`${baseURL}/reports`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                "content-type": "application/json"
            },
        });
        const result = await response.json();

        return result[0];
    },

        projects: async function projects() {
            const response = await fetch(`${baseURL}/projects`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    "content-type": "application/json"
                },
            });
            const result = await response.json();
            
            console.log("hej");
            return result[0];
        },
    

        createProject: async function createProject() {
            const response = await fetch(`${baseURL}/create/projects`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    "content-type": "application/json"
                },
            });
            const result = await response.json();
            
            console.log("hej");
            return result[0];
        },
    
}
export default proj;
