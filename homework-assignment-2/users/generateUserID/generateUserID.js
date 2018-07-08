"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listUsersIDs_1 = require("../listUsersIDs");
const generateID = (length) => ('' + Math.floor(Math.random() * 10 ** length)).padStart(length, '0');
exports.generateUserID = async () => {
    // Generate an ID
    const ID_LEN = 10;
    let id = generateID(ID_LEN);
    // Check if this ID is already being used
    // Repeat the process until the generated ID is unique
    const usedIDs = new Set(await listUsersIDs_1.listUsersIDs());
    while (usedIDs.has(id))
        id = generateID(ID_LEN);
    return id;
};
