"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const USERS_DB_PATH_1 = require("../USERS_DB_PATH");
const listUsersIDs_1 = require("../listUsersIDs");
exports.deleteUser = async (userID) => {
    const usersIDs = new Set(await listUsersIDs_1.listUsersIDs());
    if (!usersIDs.has(userID))
        throw new Error(`No user found with the id "${userID}"`);
    const fullPath = `${USERS_DB_PATH_1.USERS_DB_PATH}/${userID}.json`;
    return new Promise((resolve, reject) => {
        fs_1.unlink(fullPath, err => {
            if (err)
                reject(err);
            resolve();
        });
    });
};
