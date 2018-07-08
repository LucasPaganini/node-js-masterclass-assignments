"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSession = (maybeSession = {}) => {
    if (typeof maybeSession.token !== 'string' ||
        maybeSession.token.trim() === '')
        throw new Error(`Invalid session data, token "${maybeSession.token}" is invalid`);
    const token = maybeSession.token.trim();
    if (typeof maybeSession.expiration !== 'number' ||
        !Number.isInteger(maybeSession.expiration))
        throw new Error(`Invalid user data, expiration "${maybeSession.expiration}" is invalid`);
    const expiration = maybeSession.expiration;
    if (typeof maybeSession.userID !== 'string' ||
        maybeSession.userID.trim() === '')
        throw new Error(`Invalid session data, userID "${maybeSession.userID}" is invalid`);
    const userID = maybeSession.userID;
    return { token, expiration, userID };
};
