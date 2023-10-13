"use strict";
/**
 * @module pulse
 * @author Emil Karlsson
 */
require("dotenv").config();
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
async function getAllReports() {
    sql = "CALL p_get_all_reports()";
    const db = await mysql.createConnection(config);
    res = await db.query(sql);
    console.log(res[0]);
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
    console.log(123123123213);
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
    users.forEach(async user =>  {
        user.push(defaultPassword);
        console.log(user);
        const db = await mysql.createConnection(config);
        res = await db.query(sql, user);
        console.log("p_add_team_members RES:",res[0]);
        sendMail();
        return res;
    });    
}

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
            // await team.forEach( async (id) => {
            //     console.log("------------------------>",team, typeof(team), "yyyymmdd",yyyymmdd, "proj id:", projId );
            //     res = await db.query(sql, [projId ,id,yyyymmdd] );
            // })

            for (const id of team) { 
                // res = await db.query(sql, [projId, id, yyyymmdd] );
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
 * @function addComment
 */
async function addComment(commentRead) {
    sql = "CALL p_add_comment(?,?,?)";
    const db = await mysql.createConnection(config);
    res = await db.query(sql,Object.values(commentRead));
} 

/**
 * @function assignTeamMemberToProj
 */
async function assignTeamMemberToProj(projectId, projectTeamId) {
    sql = "CALL p_assign_tm_to_proj(?,?)";
    // await projectTeamId.forEach(async (member) => {
    //     const db = await mysql.createConnection(config);
    //     await db.query(sql,[projectId, member]);
    // })
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

function sendMail() {
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
            to: 'emkl21@student.bth.se',   // list of receivers
            subject: 'Test Mail',
            text: 'That was easy!',
            html: '<b>This mail should contain a link for updating your password<br/>"</b>'
                    
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
} 
    