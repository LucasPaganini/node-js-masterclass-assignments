"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createSession_1 = require("./createSession");
(async () => {
    try {
        console.log(await createSession_1.createSession('145'));
    }
    catch (err) {
        console.log(err);
    }
})();
