"use strict";
import { apiKey, baseURL } from "../utils.js";

const proj = {

    reports: async function reports() {

        const response = await fetch(`${baseURL}/reports`, {
            method: "GET",
            headers: {
                'Authorization': apiKey,
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
                    'Authorization': apiKey,
                    "content-type": "application/json"
                },
            });
            const result = await response.json();
            
            console.log("hej");
            return result[0];
        },
    
}
export default proj;
