"use strict";
import { apiKey, baseURL } from "./../utils.js";
import proj from "./proj.js";


const auth = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDAxIiwibmFtZSI6IkphbmUgRG9lIiwicm9sZSI6IlRNIiwiaWF0IjoxNjk3NjE3ODg0LCJleHAiOjE2OTc3MDQyODR9.ekDqVM6o0ueDqS9m6mSOdVYg-kAnM1W46T0l8fHM2Xk"
    // token: ""
    ,
    refreshThisPage: "",
    jwtForReset: "",
    refreshJs: function refreshJs() {
        auth.refreshThisPage = window.location.hash;
        window.location.hash = "dummy"
    },

    resetPw: async function resetPw(password) {
        const parsedJwt = this.parseJwt(this.jwtForReset)
        const user = {
            password: password,
            id: parsedJwt.userId
        };
        const response = await fetch(`${baseURL}/reset/pw`, {
            body: JSON.stringify(user),
            headers: {
                'Authorization': `Bearer ${this.jwtForReset}`,
                "content-type": "application/json"
            },
            method: "POST"
        });
        const result = await response.json();

        // Function for parsing JWT into human readable text.

    },

    login: async function login(userId, password) {
        const user = {
            userId: userId,
            password: password
        };
        const response = await fetch(`${baseURL}/login`, {
            body: JSON.stringify(user),
            headers: {
                // 'my-api-key': apiKey,
                "content-type": "application/json"
            },
            method: "POST"
        });
        const result = await response.json();

        // Function for parsing JWT into human readable text.
        function parseJwt(result) {
            console.log(result);
            if (!result) {
            return;
            }
            const base64Url = result.split(".")[1];
            const base64 = base64Url.replace("-", "+").replace("_", "/");
            return JSON.parse(window.atob(base64));
        }
        
          // loggedin user
        const decodedToken = parseJwt(result)
        
        // JWT is set as the token for user.
        auth.token = result;

        auth.role = decodedToken.role;
        // auth.role = "TM";
        auth.userId = decodedToken.userId;
        auth.name = decodedToken.name;
        return result;
    },
    parseJwt: function parseJwt(result) {
        console.log(result);
        if (!result) {
        return;
        }
        const base64Url = result.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    }
}
export default auth;
