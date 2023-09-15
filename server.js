const middleware = require("./middleware/index.js");
const pulse = require("./src/pulse.js");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({origin: 'http://localhost:9000'})) //
app.use(express.json())
// app.use(express.urlencoded({extended: false}))
const port = 1338;
app.set("view engine", "ejs")

app.use(middleware.logIncomingToConsole); // Log requests to console.
app.get("/", indexRoute);

app.get("/reports", getReports);

app.post("/login", loginPost);

async function loginPost(req, res) {
    console.log("LOGIN POST ROUTE");
    console.log("req.body",req.body);
    let loginStatus = await pulse.loginAuth(req.body.userId, req.body.password)
    res.json(loginStatus);
}

async function getReports(req, res) {
    let res2 = await pulse.getAllReports()
    console.log(res2);
    let data = {};
    data.title = "Start";
    res.send(res2);
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
