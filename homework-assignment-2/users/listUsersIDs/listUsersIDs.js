"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const USERS_DB_PATH_1 = require("../USERS_DB_PATH");
exports.listUsersIDs = () => {
    return new Promise((resolve, reject) => {
        fs_1.readdir(USERS_DB_PATH_1.USERS_DB_PATH, (err, files) => {
            if (err)
                reject(err);
            const ids = files.map(file => file.split('.')[0]);
            resolve(ids);
        });
    });
};
