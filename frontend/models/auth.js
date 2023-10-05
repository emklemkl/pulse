"use strict";
import { apiKey, baseURL } from "./../utils.js";


const auth = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDAwIiwicm9sZSI6IlBNIiwiaWF0IjoxNjk2NDg5OTU4LCJleHAiOjE2OTY1NzYzNTh9.00DHUSojQSBBBEqOnM5vGjyjKOdSBwhK3BJ4wXTWlcg"
    // token: ""
    ,
    refreshThisPage: "",
    

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
        console.log(decodedToken);
        console.log(decodedToken);
        console.log(decodedToken);
        console.log(decodedToken);
        console.log(decodedToken);
        console.log(decodedToken);
        console.log(decodedToken);
        console.log(decodedToken);
        console.log(decodedToken);
        // JWT is set as the token for user.
        auth.token = result;

        auth.role = decodedToken.role;
        auth.userId = decodedToken.userId;
        auth.name = decodedToken.name;
        return result;
    }
}
export default auth;
