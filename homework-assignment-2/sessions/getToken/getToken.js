"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = (req) => {
    // TODO: Look for the token if the body and in other headers
    if (typeof req.headers.authorization === 'string')
        return req.headers.authorization;
};
