"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const USERS_DB_PATH_1 = require("../USERS_DB_PATH");
const getUser_1 = require("../getUser");
const fs_1 = require("fs");
exports.updateUser = async (userID, updatedData) => {
    const user = await getUser_1.getUser(userID);
    const updatedUser = Object.assign({}, user, updatedData);
    const fileData = JSON.stringify(updatedUser);
    const fullPath = `${USERS_DB_PATH_1.USERS_DB_PATH}/${userID}.json`;
    return new Promise((resolve, reject) => {
        fs_1.writeFile(fullPath, fileData, err => {
            if (err)
                reject(err);
            resolve(updatedUser);
        });
    });
};
