"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateID = (length) => {
    if (!Number.isInteger(length))
        throw new Error('Length must be an integer');
    if (length < 1)
        throw new Error(`Length can't be less than one`);
    return ('' + Math.floor(Math.random() * 10 ** length)).padStart(length, '0');
};
