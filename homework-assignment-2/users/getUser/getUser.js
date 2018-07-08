"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listUsersIDs_1 = require("../listUsersIDs");
const USERS_DB_PATH_1 = require("../USERS_DB_PATH");
const validateUser_1 = require("../validateUser");
const fs_1 = require("fs");
exports.getUser = async (userID) => {
    const usersIDs = new Set(await listUsersIDs_1.listUsersIDs());
    if (!usersIDs.has(userID))
        throw new Error(`No user found with the id "${userID}"`);
    const fullPath = `${USERS_DB_PATH_1.USERS_DB_PATH}/${userID}.json`;
    return new Promise((resolve, reject) => {
        fs_1.readFile(fullPath, (err, data) => {
            if (err)
                reject(err);
            try {
                const maybeUser = JSON.parse('' + data);
                const user = validateUser_1.validateUser(maybeUser);
                resolve(user);
            }
            catch (err) {
                reject(err);
            }
        });
    });
};
