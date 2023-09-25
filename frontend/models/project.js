"use strict";
import { apiKey, baseURL } from "./../utils.js";
import auth from "./auth.js";

const project = {

    projects: async function projects() {
        const response = await fetch(`${baseURL}/projects`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                "content-type": "application/json"
            },
        });
        const result = await response.json();

        return result[0];
    },
}
export default project;
