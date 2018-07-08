"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SESSIONS_DB_PATH_1 = require("../SESSIONS_DB_PATH");
const validateSession_1 = require("../validateSession");
const fs_1 = require("fs");
exports.getSession = async (token) => {
    const fullPath = `${SESSIONS_DB_PATH_1.SESSIONS_DB_PATH}/${token}.json`;
    return new Promise((resolve, reject) => {
        fs_1.readFile(fullPath, (err, data) => {
            if (err)
                reject(err);
            try {
                const maybeSession = JSON.parse('' + data);
                const session = validateSession_1.validateSession(maybeSession);
                resolve(session);
            }
            catch (err) {
                reject(err);
            }
        });
    });
};
