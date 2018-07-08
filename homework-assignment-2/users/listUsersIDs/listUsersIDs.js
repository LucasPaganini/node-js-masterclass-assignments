"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const USERS_DB_PATH_1 = require("../USERS_DB_PATH");
const utils_1 = require("../../utils");
exports.listUsersIDs = async () => {
    const files = await utils_1.listDirectoryFiles(USERS_DB_PATH_1.USERS_DB_PATH);
    const ids = files.map(utils_1.removeFileExtension);
    return ids;
};
