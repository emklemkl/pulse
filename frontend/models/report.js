"use strict";
import { baseURL } from "./../utils.js";

const report = {

    reports: async function reports() {

        const response = await fetch(`${baseURL}/login`, {
            method: "GET"
        });
        const result = await response.json();

        return result;
    },
    login: async function login(userId, password) {
        const user = {
            userId: userId,
            password: password
        };
        const response = await fetch(`${baseURL}/login`, {
            body: JSON.stringify(user),
            headers: {
                "content-type": "application/json"
            },
            method: "POST"
        });
        const result = await response.json();

        return result;
    }
}
export default report;
