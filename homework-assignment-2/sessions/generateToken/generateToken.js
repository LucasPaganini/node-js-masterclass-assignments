"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const listSessionsTokens_1 = require("../listSessionsTokens");
exports.generateToken = async () => {
    const TOKEN_LEN = 10;
    let token = utils_1.generateID(TOKEN_LEN);
    // Check if this token is already being used
    // Repeat the process until the generated token is unique
    const tokens = new Set(await listSessionsTokens_1.listSessionsTokens());
    while (tokens.has(token))
        token = utils_1.generateID(TOKEN_LEN);
    return token;
};
