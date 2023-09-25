require("dotenv").config(); 
const mw = require("./middleware/index.js");
const pulse = require("./src/pulse.js");
const express = require('express');
const rf = require("./route-function/routeFunctions.js");
const cors = require('cors');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const app = express();
app.use(cors({origin: 'http://localhost:9000'})) //
app.use(express.json())
// app.use(express.urlencoded({extended: false}))
const port = 1338;

app.use(mw.logIncomingToConsole); // Log requests to console.
// app.use(middleware.apiKeyMiddleware);
// app.use(pulse.compareApiKey); 
// app.get("/", indexRoute);

app.post("/login", rf.loginPost)


// function authToken(req, res, next) {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1]
//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) { return res.sendStatus(403) }
//         req.user = user
//         console.log("🚀 ~ file: server.js:49 ~ jwt.verify ~ user:", user)
//     })
//     next();
// }

app.get("/reports", mw.authToken, rf.getReports);

app.get("/projects", mw.authToken, rf.getProjects);



app.listen(port, logStartUpDetailsToConsole);

/**
 * Log app details to console when starting up.
 * @function logStartUpDetailsToConsole
 * @description Prints available routes in console
 */
function logStartUpDetailsToConsole() {
    let routes = [];

    // Find what routes are supported
    app._router.stack.forEach ((middleware) => {
        if (middleware.route) {
            // Routes registered directly on the app
            routes.push(middleware.route);
        } else if (middleware.name === "router") {
            // Routes added as router middleware
            middleware.handle.stack.forEach((handler) => {
                let route;

                route = handler.route;
                route && routes.push(route);
            });
        }
    });
    console.info(`Server is listening on port ${port}.`);
    console.info("Available routes are:");
    console.info(routes);
}
