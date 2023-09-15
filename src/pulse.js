/**
 * @module pulse
 * @author Emil Karlsson
 */
"use strict";
const config = require("../config/db/pulse.json");
const mysql = require("promise-mysql");

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
    sql = "SELECT * FROM reports";
    const db = await mysql.createConnection(config);
    res = await db.query(sql);
    // console.log(res[0]);
    return res;
}

/**
 * @function getAllEmployees
 * @returns Employees found in db
 */
async function loginAuth(id, pw) {
    sql = "CALL p_find_matching_user(?)";
    const db = await mysql.createConnection(config);
    res = await db.query(sql,[id]);
    if (res[0][0].password === pw){
        return {role: res[0][0].role, status: "ok"};
    } 
    return {status: "fail"};
}

async function compareApiKey(key) {
    const VALIDKEY = "e766e9fc-ddd2-496a-b8c6-6f81ba62ff1c";
    if (VALIDKEY == key) {
        return {apiKey: "ok"}
    }
}

module.exports = {
    getAllEmployees: getAllEmployees,
    loginAuth: loginAuth,
    getAllReports: getAllReports,
    compareApiKey: compareApiKey,
} 
    