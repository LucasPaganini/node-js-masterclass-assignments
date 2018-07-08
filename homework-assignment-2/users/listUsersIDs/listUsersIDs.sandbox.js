"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listUsersIDs_1 = require("./listUsersIDs");
(async () => {
    const usersIDs = await listUsersIDs_1.listUsersIDs();
    console.log('usersIDs: ', usersIDs);
})();
