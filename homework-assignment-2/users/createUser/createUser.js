"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const generateUserID_1 = require("../generateUserID");
const USERS_DB_PATH_1 = require("../USERS_DB_PATH");
exports.createUser = async (data) => {
    const id = await generateUserID_1.generateUserID();
    const newUser = Object.assign({}, data, { id });
    const fileData = JSON.stringify(newUser);
    const fullPath = `${USERS_DB_PATH_1.USERS_DB_PATH}/${id}.json`;
    return new Promise((resolve, reject) => {
        fs_1.writeFile(fullPath, fileData, err => {
            if (err)
                reject(err);
            resolve(newUser);
        });
    });
};
