require("dotenv").config(); 
const mw = require("./middleware/index.js");
const express = require('express');
const rf = require("./route-function/routeFunctions.js");
const cors = require('cors');
const app = express();
const pulse = require("./src/pulse.js")

app.use(cors({origin: 'http://localhost:9000'})) //
app.use(express.json())
// app.use(express.urlencoded({extended: false}))

const port = 1338;

app.use(mw.logIncomingToConsole); // Log requests to console.

app.post("/login", rf.loginPost) // overview

app.get("/project_details/:id", mw.authToken, rf.getProjDetails);
app.get("/reports", mw.authToken, rf.getReports);
app.get("/reports_tm/:id", mw.authToken, rf.getTmReports);
app.get("/report/:id", mw.authToken, rf.getReport);
app.post("/submit/report", mw.authToken, rf.submitReport); //          ############

app.get("/team", mw.authToken, rf.getTeam);

app.post("/reset/pw", mw.authToken, rf.setNewPw);
app.post("/add-team-member", mw.authToken, rf.addTeamMembers);
app.post("/add_comment/report", mw.authToken, rf.addComment);

app.get("/projects", mw.authToken, rf.getProjects);
app.get("/my_projects/:id", mw.authToken, rf.getTmProjects);


app.post("/create/project", mw.authToken, rf.createProject);

app.listen(port, logStartUpDetailsToConsole);


async function sendReminderMails() {
    // console.log("SEND A MAIL!");
    // runs every 60 sec and runs on init.
    const allReports = await pulse.getAllReports(true)
    let soonDue = []
    let reportIdAndUserMail = []
    for (const report of allReports) {
        const dueDate = new Date(report.due_date);
        const now = new Date();
        now.setDate(now.getDate() + 1)
        if (now > dueDate) {
            soonDue.push(report)
        }
    }
    const allTeamMembers = await pulse.getTeamMembers()
    for (const due of soonDue) {
        console.log(due);
        for (const member of allTeamMembers[0]) {
            if (due.submitted_by_user === member.id && due.reminded == null) {
                reportIdAndUserMail.push([due.submitted_by_user, member.mail])
                pulse.sendMail(member.mail, `Reminder report ${due.id}`, `Report ${due.id} is due at ${due.due_date}`, `Report ${due.id} in project ${due.proj_id_report} is due at ${due.due_date}`)

                await pulse.setReminded(due.id)
            }
        }
    }
}

sendReminderMails();
setInterval(sendReminderMails, 60*1000);

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
