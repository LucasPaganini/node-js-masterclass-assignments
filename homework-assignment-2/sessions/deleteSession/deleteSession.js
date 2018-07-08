"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SESSIONS_DB_PATH_1 = require("../SESSIONS_DB_PATH");
const fs_1 = require("fs");
exports.deleteSession = async (token) => {
    const fullPath = `${SESSIONS_DB_PATH_1.SESSIONS_DB_PATH}/${token}.json`;
    return new Promise((resolve, reject) => {
        fs_1.unlink(fullPath, err => {
            if (err)
                reject(err);
            resolve();
        });
    });
};
