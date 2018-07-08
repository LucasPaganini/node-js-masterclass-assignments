"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteUser_1 = require("./deleteUser");
(async () => {
    try {
        await deleteUser_1.deleteUser('0').then(_ => console.log('user deleted'));
    }
    catch (err) {
        console.log(err);
    }
})();
