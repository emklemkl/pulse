"use strict"
const pulse = require("./../src/pulse.js");
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

module.exports = {
    loginPost: loginPost,
    getReports: getReports,
    getProjects: getProjects,
    indexRoute: indexRoute,
} 