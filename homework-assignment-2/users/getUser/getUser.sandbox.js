"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUser_1 = require("./getUser");
(async () => {
    try {
        console.log(await getUser_1.getUser('9469681205'));
    }
    catch (err) {
        console.log(err);
    }
})();
