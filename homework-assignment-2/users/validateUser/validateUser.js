"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = (data = {}) => {
    if (typeof data.id !== 'string' || data.id.trim() === '')
        throw new Error(`Invalid user data, id "${data.id}" is invalid`);
    const id = data.id.trim();
    if (typeof data.name !== 'string' || data.name.trim() === '')
        throw new Error(`Invalid user data, name "${data.name}" is invalid`);
    const name = data.name.trim();
    if (typeof data.address !== 'string' || data.address.trim() === '')
        throw new Error(`Invalid user data, address "${data.address}" is invalid`);
    const address = data.address.trim();
    if (typeof data.email !== 'string' || data.email.trim() === '')
        throw new Error(`Invalid user data, email "${data.email}" is invalid`);
    const email = data.email.trim();
    return { id, name, email, address };
};
