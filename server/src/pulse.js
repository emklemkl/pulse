"use strict";
/**
 * @module pulse
 * @author Emil Karlsson
 */
require("dotenv").config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const config = require("../config/db/pulse.json");
const mysql = require("promise-mysql");
const bcrypt = require('bcrypt');
const saltRounds = 10;

let res;
let sql;

/**
 * @function getAllEmployees
 * @returns Employees found in db
 */
async function getAllEmployees() {
    sql = "SELECT * FROM user_data";
    const db = await mysql.createConnection(config);

    res = await db.query(sql);
    // console.log(res[0]);
    return res[0];
}

/**
 * @function getAllReports
 * @returns Gets all sent reports from db
 */
async function getAllReports(raw=false) {
    sql = "CALL p_get_all_reports()";
    const db = await mysql.createConnection(config);
    res = await db.query(sql);

    if (raw) {
        sql = "SELECT * FROM REPORTS;";
        const db = await mysql.createConnection(config);
        res = await db.query(sql);
    }
    return res;
}

/**
 * @function getReport
 * @returns Gets a specifik report from db
 */
async function getReport(report_id) {
    sql = "CALL p_get_a_report(?)";
    const db = await mysql.createConnection(config);
    res = await db.query(sql, [report_id]);
    return res;
}

/**
 * @function getReport
 * @returns Gets a specifik report from db
 */
async function getAllTmReports(user_id) {
    sql = "CALL p_get_all_tm_reports(?)";
    const db = await mysql.createConnection(config);
    res = await db.query(sql, [user_id]);
    return res;
}

/**
 * @function getTmProjects
 * @returns Gets a specifik report from db
 */
async function getTmProjects(user_id) {
    sql = "CALL p_get_all_tm_projects(?)";
    const db = await mysql.createConnection(config);
    res = await db.query(sql, [user_id]);
    return res;
}

/**
 * @function getAllProjects
 * @returns Projects found in db
 */
async function getAllProjects() {
    sql = "CALL p_get_all_projects()";
    const db = await mysql.createConnection(config);
    res = await db.query(sql);
    console.log(res[0]);
    return res;
}

/**
 * @function getTeamMembers
 * @returns Returns a db response with all registered team member that have the role TM
 */
async function getTeamMembers() {
    sql = "CALL p_get_all_team_members()";
    const db = await mysql.createConnection(config);
    res = await db.query(sql);
    return res;
}

/**
 * @function getTeamMembers
 * @returns Returns a db response with all registered team member that have the role TM
 */
async function addTeamMembers(user_info) {
    sql = "CALL p_add_new_team_members(?,?,?,?,?,?,?)";
    const [ , ...users] = user_info
    const defaultPassword = await encrypt("test");
    for (const user of users) {
        user.push(defaultPassword);
        const db = await mysql.createConnection(config);
        res = await db.query(sql, user);
        console.log("p_add_team_members RES:",res[0][0].name);

        const userNewPwData = {userId: res[0][0].id, name: res[0][0].name, role: res[0][0].name.role}
        const accessToken = jwt.sign(userNewPwData, process.env.ACCESS_TOKEN_SECRET,  {
            expiresIn: '10m'
        });
        sendMail(user[1], 'Choose password','Welcome',`<b>Welcome ${user[0]},<br/>please follow this 
        <form> <a href="http://localhost:9000">link</a> to choose a password <br>
        If the link is'nt working please copy "http://localhost:9000/#reset-pw?${accessToken}" into to your address bar.</b>`);
    };    
}
// users.forEach(async user =>  {
//     user.push(defaultPassword);
//     console.log(user);
//     console.log("🚀 ~ file: pulse.js:98 ~ addTeamMembers ~ user:", user)
//     const db = await mysql.createConnection(config);
//     res = await db.query(sql, user);
//     console.log("p_add_team_members RES:",res[0]);

//     const userss = {userId: req.body.userId, name: loginStatus.name, role: loginStatus.role}
//     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,  {
//         expiresIn: '24h'
//     });
//     sendMail(user[1], 'Choose password','Welcome',`<b>Welcome ${user[0]},<br/>please follow this 
//     <a href="http://localhost:9000">link</a> to choose a password <br>
//     If the link is'nt working please copy "http://localhost:9000" into to addressbar.</b>`);
//     return res;
// });    

/**
 * @function loginAuth
 * @returns JSON 
 */
async function loginAuth(id, pw) {
    sql = "CALL p_find_matching_user(?)";
    const db = await mysql.createConnection(config);
    res = await db.query(sql,[id]);
    const isPwValid = await comparePassWord(pw, res[0][0].password);
    if (isPwValid) {
        return {role: res[0][0].role, name: res[0][0].name, status: "ok"};
    }
    return {status: "fail"};
}

/**
 * @function createNewProject
 */
async function createNewProject(setup) {
    sql = "CALL p_add_new_project(?,?,?,?,?)";
    const db = await mysql.createConnection(config);
    res = await db.query(sql,[setup.projectName, setup.startDate, setup.endDate, setup.reportFreq, setup.description]);
    await assignTeamMemberToProj(res[0][0].inserted_id, setup.projectTeam)
    return res[0][0].inserted_id
} 

function addXDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
}

/**
 * @function generateReports
 */
async function generateReports(startDate, endDate, freq, team, projId) {
    let start= new Date(startDate);
    let deadline = new Date(endDate);
    deadline.setDate(deadline.getDate() + 1)
    const reportFrequency = parseInt(freq)
    const db = await mysql.createConnection(config);
    let yyyymmdd;
    while (deadline > start) {
        sql = "CALL p_create_reports(?,?,?)";
        if (start.getDay() !== 6 && start.getDay() !== 0) {
            const year = start.getFullYear();
            const month = String(start.getMonth() + 1).padStart(2, '0'); // Adding 1 to the month since it's zero-based
            const day = String(start.getDate()).padStart(2, '0');
            yyyymmdd = `${year}-${month}-${day}`;
            for (const id of team) { 
                try {
                    res = await db.query(sql, [projId, id, yyyymmdd]);
                    console.log('Query successful:', res);
                } catch (error) {
                    console.error('Error executing query:', error);

                }
            }
        }
        start.setDate(start.getDate() + reportFrequency)
    }
} 

/**
 * @function submitReport
 */
async function submitReport(text) {
    sql = "CALL p_submit_report(?,?)";
    const db = await mysql.createConnection(config);
    res = await db.query(sql,Object.values(text));
} 

/**
 * @function addComment
 */
async function addComment(commentRead) {
    sql = "CALL p_add_comment(?,?,?)";
    const db = await mysql.createConnection(config);
    res = await db.query(sql,Object.values(commentRead));
} 

/**
 * @function setANewPw
 */
async function setANewPw(user) {
    console.log("setNewPw");
    sql = "CALL p_set_new_pw(?,?)";
    const hashedPw = await encrypt(user.password)
    const db = await mysql.createConnection(config);
    await db.query(sql, [user.id, hashedPw]);
} 

/**
 * @function assignTeamMemberToProj
 */
async function assignTeamMemberToProj(projectId, projectTeamId) {
    sql = "CALL p_assign_tm_to_proj(?,?)";

    for (const member of projectTeamId) { 
        const db = await mysql.createConnection(config);
        await db.query(sql, [projectId, member]);
    }
} 

async function comparePassWord(pw, hashedPw) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pw, hashedPw, function(err, result) {
            if (err) {
                reject(err);
                console.log("Error in comparePassWord", err);
            }
            resolve(result);
        });
    });
}

/**
 * @function encrypt
 * @param {string} pw the Password we want to hash
 * @returns the hashed Password
 */
function encrypt(pw) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pw, saltRounds, function(err, hash) {
            if (err) {
                reject(err);
                console.log("Error in encrypt", err);
            }
            resolve(hash);
        });
    });
}

/**
 * 
 * @param {int} id
 * @description Sets the 'reminded' column in db 'reports' to NOW()
*/
async function setReminded(id) {
    sql = "CALL p_mark_as_reminded(?)";
    const db = await mysql.createConnection(config);
    console.log("Before query");
    await db.query(sql, [id]);  
    console.log("After query");

}

function sendMail(mail, aSubject, aText, aHtml) {
    const transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
        auth: {
                user: 'pulseproject23bth@gmail.com',
                pass: `${process.env.GMAIL_PW}`,
            },
        });
        const mailOptions = { 
            from: 'pulseproject23bth@gmail.com',  // sender address
            to: mail,   // list of receivers
            subject: aSubject,
            text: aText,
            html:  aHtml
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                console.log(err)
                else
                console.log(info);
    });
}
module.exports = {
    getAllEmployees: getAllEmployees,
    loginAuth: loginAuth,
    getAllReports: getAllReports,
    getReport: getReport,
    getAllProjects: getAllProjects,
    getTeamMembers: getTeamMembers,
    addTeamMembers: addTeamMembers,
    encrypt: encrypt,
    createNewProject: createNewProject,
    addComment: addComment,
    generateReports: generateReports,
    getAllTmReports: getAllTmReports,
    submitReport: submitReport,
    setANewPw: setANewPw,
    getTmProjects: getTmProjects,
    sendMail: sendMail,
    setReminded: setReminded
} 
    