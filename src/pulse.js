require("dotenv").config(); 
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

module.exports = {
    getAllEmployees: getAllEmployees,
    loginAuth: loginAuth,
    getAllReports: getAllReports,
    getAllProjects: getAllProjects,
    compareApiKey: compareApiKey,
} 
    