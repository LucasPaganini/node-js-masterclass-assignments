"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SESSION_DURATION_1 = require("../SESSION_DURATION");
const SESSIONS_DB_PATH_1 = require("../SESSIONS_DB_PATH");
const generateToken_1 = require("../generateToken");
const fs_1 = require("fs");
exports.createSession = async (userID) => {
    const session = {
        userID,
        expiration: Date.now() + SESSION_DURATION_1.SESSION_DURATION,
        token: await generateToken_1.generateToken(),
    };
    const fullPath = `${SESSIONS_DB_PATH_1.SESSIONS_DB_PATH}/${session.token}.json`;
    const fileData = JSON.stringify(session);
    return new Promise((resolve, reject) => {
        fs_1.writeFile(fullPath, fileData, err => {
            if (err)
                reject(err);
            resolve(session);
        });
    });
};
