"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const SESSIONS_DB_PATH_1 = require("../SESSIONS_DB_PATH");
exports.listSessionsTokens = async () => {
    const files = await utils_1.listDirectoryFiles(SESSIONS_DB_PATH_1.SESSIONS_DB_PATH);
    const tokens = files.map(utils_1.removeFileExtension);
    return tokens;
};
