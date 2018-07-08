"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listUsersIDs_1 = require("../listUsersIDs");
const utils_1 = require("../../utils");
exports.generateUserID = async () => {
    // Generate an ID
    const ID_LEN = 10;
    let id = utils_1.generateID(ID_LEN);
    // Check if this ID is already being used
    // Repeat the process until the generated ID is unique
    const usedIDs = new Set(await listUsersIDs_1.listUsersIDs());
    while (usedIDs.has(id))
        id = utils_1.generateID(ID_LEN);
    return id;
};
