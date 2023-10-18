"use strict";
import { apiKey, baseURL } from "../utils.js";
import auth from "./auth.js";


const proj = {
    selectReport: 0,
    selectProject: 0,
    reports: async function reports() {
        const response = await fetch(`${baseURL}/reports`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                "content-type": "application/json"
            },
        });
        const result = await response.json();

        return result[0];
    },

    getTmReports: async function getTmReports() {
        console.log("🚀 ~ file: proj.js:24 ~ getTmReports ~ auth.userId:", auth.userId)
        console.log("🚀 ~ file: proj.js:24 ~ getTmReports ~ auth.userId:", auth.userId)
        console.log("🚀 ~ file: proj.js:24 ~ getTmReports ~ auth.userId:", auth.userId)
        console.log("🚀 ~ file: proj.js:24 ~ getTmReports ~ auth.userId:", auth.userId)
        const response = await fetch(`${baseURL}/reports_tm/${auth.userId}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                "content-type": "application/json"
            },
        });
        const result = await response.json();

        return result[0];
    },

    report: async function report(id) {
        const response = await fetch(`${baseURL}/report/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                "content-type": "application/json"
            },
        });
        const result = await response.json();

        return result[0];
    },

        projects: async function projects() {
            const response = await fetch(`${baseURL}/projects`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    "content-type": "application/json"
                },
            });
            const result = await response.json();
            
            return result[0];
        },
    

        myProjects: async function myProjects() {
            console.log(auth.userId);
            const response = await fetch(`${baseURL}/my_projects/${auth.userId}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    "content-type": "application/json"
                },
            });
            const result = await response.json();
            console.log(result);
            return result[0];
        },
    

        createProject: async function createProject(projectSetup) {
            const response = await fetch(`${baseURL}/create/project`, {
                body: JSON.stringify(projectSetup),
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    "content-type": "application/json"
                },
            });
            await response.json();
        },

        addComment: async function addComment(commentAndRead) {
            console.log("🚀 ~ file: proj.js:63 ~ addComment ~ commentAndRead:", commentAndRead)
            console.log("🚀 ~ file: proj.js:63 ~ addComment ~ commentAndRead:", commentAndRead)
            console.log("🚀 ~ file: proj.js:63 ~ addComment ~ commentAndRead:", commentAndRead)
            console.log("🚀 ~ file: proj.js:63 ~ addComment ~ commentAndRead:", commentAndRead)
            console.log("🚀 ~ file: proj.js:63 ~ addComment ~ commentAndRead:", commentAndRead)
            const response = await fetch(`${baseURL}/add_comment/report`, {
                body: JSON.stringify(commentAndRead),
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    "content-type": "application/json"
                },
            });
            // await response.json();
        },

        writeReport: async function writeReport(text, reportId) {
            text.id = reportId 
            const response = await fetch(`${baseURL}/submit/report`, {
                body: JSON.stringify(text),
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    "content-type": "application/json"
                },
            });
            // await response.json();
        },
}
export default proj;
