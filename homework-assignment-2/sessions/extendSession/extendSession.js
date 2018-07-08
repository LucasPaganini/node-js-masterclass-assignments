"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SESSION_DURATION_1 = require("../SESSION_DURATION");
const SESSIONS_DB_PATH_1 = require("../SESSIONS_DB_PATH");
const fs_1 = require("fs");
exports.extendSession = async (session) => {
    const updatedExpiration = Date.now() + SESSION_DURATION_1.SESSION_DURATION;
    const extendedSession = Object.assign({}, session, { expiration: updatedExpiration });
    const fileData = JSON.stringify(extendedSession);
    const fullPath = `${SESSIONS_DB_PATH_1.SESSIONS_DB_PATH}/${session.token}.json`;
    return new Promise((resolve, reject) => {
        fs_1.writeFile(fullPath, fileData, err => {
            if (err)
                reject(err);
            resolve(extendedSession);
        });
    });
};
