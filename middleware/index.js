/**
 * General middleware.
 */
"use strict";
const jwt = require('jsonwebtoken');
// const utils = require("../frontend/utils")
/**
 * Log incoming requests to console to see who accesses the server
 * on what route.
 *
 * @param {Request}  req  The incoming request.
 * @param {Response} res  The outgoing response.
 * @param {Function} next Next to call in chain of middleware.
 *
 * @returns {void}
 */

function logIncomingToConsole(req, res, next) {
    console.info(`Got request on ${req.path} (${req.method}).`);
    next();
}

const apiKeyMiddleware = (req, res, next) => {
    const apiKey = "e766e9fc-ddd2-496a-b8c6-6f81ba62ff1c";
    const providedApiKey = req.headers.authorization;
    console.log("MIDDLEWARE", providedApiKey);
    if (!providedApiKey || providedApiKey !== apiKey) {
    return res.status(401).json({ error: 'Unauthorized'});
    }
    next();
};

function authToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { return res.sendStatus(403) }
        req.user = user
        console.log("🚀 ~ file: server.js:49 ~ jwt.verify ~ user:", user)
    })
    next();
}
module.exports = {
    logIncomingToConsole: logIncomingToConsole,
    apiKeyMiddleware:  apiKeyMiddleware,
    authToken: authToken,
}