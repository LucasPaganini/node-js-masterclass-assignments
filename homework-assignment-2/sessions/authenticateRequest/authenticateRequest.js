"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getToken_1 = require("../getToken");
const getSession_1 = require("../getSession");
const sessionIsValid_1 = require("../sessionIsValid");
exports.authenticateRequest = async (req) => {
    const token = getToken_1.getToken(req);
    const session = await getSession_1.getSession(token);
    if (!sessionIsValid_1.sessionIsValid(session))
        throw new Error('This session has expired');
    return session;
};
