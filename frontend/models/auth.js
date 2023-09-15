"use strict";
import { baseURL } from "./../utils.js";

const auth = {
    token: "PM",

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

        // token får vara en användares roll tillsvidare
        auth.token = result.role;
        return result;
    }
}
export default auth;
