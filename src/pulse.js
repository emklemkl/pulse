require("dotenv").config();
const nodemailer = require('nodemailer');
/**
 * @module pulse
 * @author Emil Karlsson
 */
"use strict";

const config = require("../config/db/pulse.json");
const mysql = require("promise-mysql");
const jwt = require('jsonwebtoken');
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
 * @function getAllEmployees
 * @returns Employees found in db
 */
async function getAllReports() {
    sql = "CALL p_get_all_reports()";
    const db = await mysql.createConnection(config);
    res = await db.query(sql);
    console.log(res[0]);
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
    sql = "CALL p_add_new_team_members(?,?,?,?,?,?)";
    const [ , ...users] = user_info

    users.forEach(async user =>  {
        console.log("asdsadsad",user);
        const db = await mysql.createConnection(config);
        res = await db.query(sql, user);

        console.log("p_add_team_members RES:",res[0]);
        sendMail();
        return res;
    });    
}

/**
 * @function getAllEmployees
 * @returns Employees found in db
 */
async function loginAuth(id, pw) {
    console.log("🚀 ~ file: pulse.js:56 ~ loginAuth ~ id:", id,pw)
    sql = "CALL p_find_matching_user(?)";
    const db = await mysql.createConnection(config);
    res = await db.query(sql,[id]);
    // const user = {role: res[0][0].role, name: res[0][0].name}
    console.log(res[0]);
    if (res[0][0].password === pw){
        return {role: res[0][0].role, name: res[0][0].name, status: "ok"};
    } 
    return {status: "fail"};
}

async function compareApiKey(key) {
    const VALIDKEY = "e766e9fc-ddd2-496a-b8c6-6f81ba62ff1c";
    if (VALIDKEY === key) {
        console.log("API-KEY TRUE");
        return true
    }
    console.log("API-KEY FALSE");
    return false
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
            subject: 'Sending Email using Node.js process.env',
            text: 'That was easy!',
            html: '<b>Hey there! "This is our first message sent with Nodemailer<br/>"</b>'
                    
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
    getAllProjects: getAllProjects,
    compareApiKey: compareApiKey,
    getTeamMembers: getTeamMembers,
    addTeamMembers: addTeamMembers
} 
    