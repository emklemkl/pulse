"use strict"
/**
 * @module dummy-refresh
 * @description This route is only used for refreshing pages by redirecting back to them.
 */
import auth from "../models/auth.js";

export default class UserInfo extends HTMLElement {
    constructor() {
        super();
    }

    // connect component
    async connectedCallback() {
        if (!auth.refreshThisPage) {
            location.hash = ""
        }
        location.hash = auth.refreshThisPage;
    }
}