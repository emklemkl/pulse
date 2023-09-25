const middleware = require("./middleware/index.js");
const pulse = require("./src/pulse.js");
const express = require('express');
const rf = require("./route-function/routeFunctions.js");
const cors = require('cors');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const failAuth = {status: "fail", apiKey: "unauthorized"}
const app = express();
app.use(cors({origin: 'http://localhost:9000'})) //
app.use(express.json())
// app.use(express.urlencoded({extended: false}))
const port = 1338;

app.use(middleware.logIncomingToConsole); // Log requests to console.
app.use(middleware.apiKeyMiddleware);
// app.use(pulse.compareApiKey); 
app.get("/", indexRoute);

app.get("/reports", rf.getReports);

app.get("/projects", rf.getProjects);

app.post("/login", rf.loginPost);

/**
 * @function loginPost
 * @param {*} req 
 * @param {*} res
 * @description Handles the login auth process. if succeful it responds with a json success token.
 */
async function loginPost(req, res) {
    let loginStatus = await pulse.loginAuth(req.body.userId, req.body.password, req.headers.authorization)
        res.json(loginStatus);
}

async function getReports(req, res) {
    let res2 = await pulse.getAllReports()
        res.json(res2);

}
async function getProjects(req, res) {
    let res2 = await pulse.getAllProjects()
        res.json(res2);

}

async function indexRoute(req, res) {
    let res2 = await pulse.getAllEmployees()
    console.log(res2);
    let data = {};
    data.title = "Start";
    res.json({test: "test2"});
}

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
