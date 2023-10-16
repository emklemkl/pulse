"use strict";
/**
 * @module routeFunctions
 * @author Emil Karlsson
 */

require("dotenv").config(); 
const jwt = require('jsonwebtoken');
const pulse = require("./../src/pulse.js");

/**
 * @function loginPost
 * @param {*} req 
 * @param {*} res
 * @description Handles the login auth process. if succeful it responds with a json success token.
 */
async function loginPost(req, res) {
    let loginStatus = await pulse.loginAuth(req.body.userId, req.body.password)
    if (loginStatus.status === "ok") {
        const user = {userId: req.body.userId, name: loginStatus.name, role: loginStatus.role}
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,  {
            expiresIn: '24h'
        });
        res.json(accessToken);
    } else {
        res.json(loginStatus)
    }
}

async function getReports(req, res) {
    let res2 = await pulse.getAllReports()
        res.json(res2);
}

async function getTmReports(req, res) {
    let res2 = await pulse.getAllTmReports(req.params.id)
        res.json(res2);
}

async function getReport(req, res) {
    let res2 = await pulse.getReport(req.params.id)
    console.log(res2[0]);
    res.json(res2);
}

async function addTeamMembers(req, res) {
    let res2 = await pulse.addTeamMembers(req.body)
        res.json(res2);
}

async function addComment(req, res) {
    console.log(req.body);
    let res2 = await pulse.addComment(req.body)
        res.json(res2);
}

async function submitReport(req, res) {
    console.log(req.body);
    let res2 = await pulse.submitReport(req.body)
        res.json(res2);
}

async function getProjects(req, res) {
    let res2 = await pulse.getAllProjects()
    res.json(res2);
}


async function createProject(req, res) {
    console.log("res.body",req.body);
    const projId = await pulse.createNewProject(req.body)
    await pulse.generateReports(req.body.startDate, req.body.endDate, req.body.reportFreq, req.body.projectTeam, projId)
    res.json({status: "Project added"});
}

async function getTeam(req, res) {
    let res2 = await pulse.getTeamMembers()
    res.json(res2);

}

async function indexRoute(req, res) {
    let res2 = await pulse.getAllEmployees()
    console.log(res2);
    let data = {};
    data.title = "Start";
    res.json({test: "test2"});
}

module.exports = {
    loginPost: loginPost,
    getReports: getReports,
    getProjects: getProjects,
    indexRoute: indexRoute,
    getTeam: getTeam,
    addTeamMembers: addTeamMembers,
    createProject: createProject,
    // getProject: getProject,
    getReport: getReport,
    addComment: addComment,
    submitReport: submitReport,
    getTmReports: getTmReports,
} 