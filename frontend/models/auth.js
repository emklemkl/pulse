"use strict";
import { apiKey, baseURL } from "./../utils.js";

const auth = {
    token: "",

    login: async function login(userId, password) {
        const user = {
            userId: userId,
            password: password
        };
        const response = await fetch(`${baseURL}/login`, {
            body: JSON.stringify(user),
            headers: {
                'Authorization': apiKey,
                "content-type": "application/json"
            },
            method: "POST"
        });
        const result = await response.json();
        console.log(result);
        // token får vara en användares roll tillsvidare
        auth.token = result.role;
        auth.userId = userId;
        auth.name = result.name;
        return result;
    }
}
export default auth;
