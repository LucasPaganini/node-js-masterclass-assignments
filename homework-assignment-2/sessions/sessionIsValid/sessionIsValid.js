"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionIsValid = (session) => Date.now() <= session.expiration;
